/**
 * NotebookLM to Obsidian - Custom Frames Edition
 *
 * Obsidian Custom Frames 플러그인에서 사용하는 순수 JavaScript 스크립트
 * Tampermonkey API 없이 fetch()로 Obsidian Local REST API 통신
 *
 * @version 3.1.0 - NotebookLM 실제 DOM 구조 기반 파싱
 * @author Claude Code
 */

(function() {
    'use strict';

    // ========================================
    // 설정
    // ========================================
    const CONFIG = {
        obsidianApiUrl: 'http://127.0.0.1:27123',
        obsidianApiKey: 'YOUR_API_KEY_HERE',
        targetFolder: 'NotebookLM',
        autoTags: ['notebooklm', 'imported'],
        showNotification: true
    };

    console.log('[NotebookLM→Obsidian CF] 스크립트 시작 (Custom Frames v3.1.0 - DEBUG)');
    console.log('[NotebookLM→Obsidian CF] iframe 환경:', window !== window.top);

    // ========================================
    // 유틸리티 함수
    // ========================================

    /**
     * 알림 표시
     */
    function showNotification(message, type = 'info') {
        if (!CONFIG.showNotification) return;

        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: 'Google Sans', Arial, sans-serif;
            font-size: 14px;
            max-width: 350px;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * NotebookLM 테이블을 마크다운으로 변환 (Angular 컴포넌트 구조 대응)
     */
    function convertTableToMarkdown(table) {
        const rows = Array.from(table.querySelectorAll('tr'));

        if (rows.length === 0) {
            return '';
        }

        const tableData = rows.map(tr => {
            const cells = Array.from(tr.querySelectorAll('th, td'));
            return cells.map(cell => {
                // NotebookLM 테이블: div.paragraph 내부의 텍스트 추출
                const paragraphs = cell.querySelectorAll('div.paragraph');
                if (paragraphs.length > 0) {
                    // 각 paragraph의 텍스트를 공백으로 연결
                    const cellText = Array.from(paragraphs)
                        .map(p => p.innerText.trim())
                        .join(' ')
                        .replace(/\n/g, ' ')  // 줄바꿈을 공백으로
                        .replace(/\|/g, '\\|');  // 파이프 이스케이프
                    return cellText;
                }
                // 일반 HTML 테이블 fallback
                return cell.innerText.trim().replace(/\n/g, ' ').replace(/\|/g, '\\|');
            });
        });

        const filteredData = tableData.filter(row => row.some(cell => cell));

        if (filteredData.length === 0) {
            return '';
        }

        const maxColumns = Math.max(...filteredData.map(row => row.length));

        const normalizedData = filteredData.map(row => {
            while (row.length < maxColumns) {
                row.push('');
            }
            return row;
        });

        const header = normalizedData[0];
        const dataRows = normalizedData.slice(1);

        const headerLine = '| ' + header.join(' | ') + ' |';
        const separatorLine = '| ' + header.map(() => '---').join(' | ') + ' |';
        const dataLines = dataRows.map(row => '| ' + row.join(' | ') + ' |');

        return [headerLine, separatorLine, ...dataLines].join('\n');
    }

    // DOM 구조 디버깅 함수
    function debugDOMStructure(element, prefix = '', maxDepth = 3, currentDepth = 0) {
        if (currentDepth > maxDepth) return;

        const tagName = element.tagName?.toLowerCase() || 'text';
        const className = element.className ? `.${element.className.split(' ').join('.')}` : '';
        const id = element.id ? `#${element.id}` : '';
        const text = element.nodeType === Node.TEXT_NODE
            ? element.textContent.trim().substring(0, 50)
            : '';

        if (element.nodeType === Node.TEXT_NODE && text) {
            console.log(`${prefix}[TEXT] "${text}"`);
        } else if (element.nodeType === Node.ELEMENT_NODE) {
            console.log(`${prefix}<${tagName}${id}${className}>`);

            for (const child of element.childNodes) {
                debugDOMStructure(child, prefix + '  ', maxDepth, currentDepth + 1);
            }
        }
    }

    /**
     * NotebookLM 전용 마크다운 변환 (실제 DOM 구조 기반)
     */
    function convertNotebookLMToMarkdown(noteEditor) {
        let markdown = '';

        // 1. 테이블 먼저 처리
        const tables = noteEditor.querySelectorAll('table');
        const processedTables = new Set();

        for (const table of tables) {
            const mdTable = convertTableToMarkdown(table);
            if (mdTable) {
                markdown += '\n\n' + mdTable + '\n\n';
                processedTables.add(table);
                console.log('[NotebookLM→Obsidian CF] 테이블 변환 완료');
            }
        }

        // 2. 문단 처리 (테이블 내부 요소는 제외)
        const paragraphs = noteEditor.querySelectorAll('div.paragraph');

        for (const para of paragraphs) {
            // 테이블 내부의 paragraph는 건너뛰기
            let isInsideTable = false;
            for (const table of processedTables) {
                if (table.contains(para)) {
                    isInsideTable = true;
                    break;
                }
            }
            if (isInsideTable) continue;

            const classList = Array.from(para.classList);

            // 헤딩 처리
            if (classList.includes('heading3')) {
                const text = para.innerText.trim();
                markdown += '\n\n## ' + text + '\n\n';
                continue;
            }

            // 일반 문단 처리
            if (classList.includes('normal')) {
                let lineText = '';

                for (const child of para.childNodes) {
                    if (child.nodeType === Node.TEXT_NODE) {
                        lineText += child.textContent;
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                        const tag = child.tagName.toLowerCase();

                        if (tag === 'b' || tag === 'strong') {
                            lineText += '**' + child.innerText.trim() + '**';
                        } else if (tag === 'code') {
                            lineText += '`' + child.innerText.trim() + '`';
                        } else if (tag === 'span') {
                            // 인용 버튼이 포함된 span은 건너뛰기
                            if (child.querySelector('button.citation-marker')) {
                                continue;
                            }
                            lineText += child.textContent;
                        } else if (tag === 'button' && child.classList.contains('citation-marker')) {
                            // 인용 번호 건너뛰기 (이미 원문에 포함됨)
                            continue;
                        } else {
                            lineText += child.innerText || child.textContent || '';
                        }
                    }
                }

                lineText = lineText.trim();

                // 불릿 포인트 감지 및 처리
                if (lineText.startsWith('• ') || lineText.startsWith('· ')) {
                    markdown += lineText + '\n';
                } else if (/^\d+\.\s/.test(lineText)) {
                    // 번호 목록
                    markdown += lineText + '\n';
                } else if (lineText) {
                    markdown += '\n' + lineText + '\n';
                }
            }
        }

        return markdown.trim();
    }

    /**
     * 마크다운 정리 (NotebookLM 원본 형식 유지)
     */
    function cleanupMarkdown(markdown) {
        return markdown
            // 1. 중점 불릿 사이의 불필요한 빈 줄 제거
            .replace(/(·[^\n]+)\n\n+(·)/g, '$1\n$2')

            // 2. 들여쓰기된 중점 불릿 사이의 빈 줄 제거
            .replace(/(\s+·[^\n]+)\n\n+(\s+·)/g, '$1\n$2')

            // 3. 3줄 이상 빈 줄 -> 2줄로
            .replace(/\n{3,}/g, '\n\n')

            // 4. 앞뒤 공백 제거
            .replace(/^\s+/, '')
            .replace(/\s+$/, '');
    }

    /**
     * NotebookLM 노트 내용 추출 (원본 형식 재현)
     */
    function extractNotebookContent() {
        console.log('[NotebookLM→Obsidian CF] 🔍 콘텐츠 추출 시작 (v3.1.0 DEBUG)');

        // NOTE-EDITOR 찾기
        let noteEditor = document.querySelector('.note-editor');
        if (!noteEditor) {
            noteEditor = document.querySelector('.artifact-content');
        }
        if (!noteEditor) {
            noteEditor = document.querySelector('labs-tailwind-doc-viewer');
        }
        if (!noteEditor) {
            noteEditor = document.querySelector('note-editor');
        }

        if (!noteEditor) {
            console.error('[NotebookLM→Obsidian CF] NOTE-EDITOR를 찾을 수 없습니다.');
            return { title: '무제 노트', content: '' };
        }

        // 🔍 DOM 구조 디버깅 (첫 번째 리스트 항목)
        console.log('\n===== DOM 구조 디버깅 시작 =====');
        const firstList = noteEditor.querySelector('ul, ol');
        if (firstList) {
            const firstLi = firstList.querySelector('li');
            if (firstLi) {
                console.log('첫 번째 리스트 항목 구조:');
                debugDOMStructure(firstLi, '', 5);
            }
        }
        console.log('===== DOM 구조 디버깅 종료 =====\n');

        // 제목 추출
        let title = '무제 노트';
        let titleInput = document.querySelector('input.note-header__editable-title') ||
                         noteEditor.querySelector('input.note-header__editable-title');
        if (!titleInput) {
            titleInput = document.querySelector('input.artifact-title');
        }

        if (titleInput && titleInput.value) {
            title = titleInput.value.trim();
        } else {
            const pageTitle = document.title.replace(' - NotebookLM', '').trim();
            if (pageTitle && pageTitle !== 'NotebookLM') {
                title = pageTitle;
            }
        }

        console.log('[NotebookLM→Obsidian CF] 제목:', title);

        // NotebookLM 전용 마크다운 변환 사용
        let content = convertNotebookLMToMarkdown(noteEditor);
        content = cleanupMarkdown(content);

        // 인용 정보 추가
        const citationButtons = noteEditor.querySelectorAll('button.citation-marker');
        const citationCount = citationButtons.length;

        if (citationCount > 0) {
            content += '\n\n---\n\n## 📚 인용 정보\n\n';
            content += `> 이 문서에는 **${citationCount}개**의 인용이 포함되어 있습니다.\n`;
            content += `> NotebookLM에서 각 번호를 클릭하면 상세 출처를 확인할 수 있습니다.\n`;
        }

        // 제목 중복 제거
        if (title !== '무제 노트') {
            const lines = content.split('\n');
            // 첫 줄이 제목과 동일하거나 # 제목 형식인 경우 제거
            if (lines[0].trim() === title.trim() || lines[0].trim() === '# ' + title.trim()) {
                lines.shift();
                content = lines.join('\n').trim();
            }
        }

        console.log('[NotebookLM→Obsidian CF] 내용 길이:', content.length);
        console.log('[NotebookLM→Obsidian CF] 샘플:', content.substring(0, 500));

        return { title, content };
    }

    /**
     * Markdown 파일 생성
     */
    function createMarkdown(title, content) {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toTimeString().split(' ')[0];

        const frontmatter = `---
created: ${dateStr} ${timeStr}
source: NotebookLM
tags: [${CONFIG.autoTags.join(', ')}]
---

`;

        return frontmatter + `# ${title}\n\n${content}`;
    }

    /**
     * Obsidian에 저장 (fetch 사용)
     */
    async function saveToObsidian(title, markdown) {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').split('T')[0];
        const filename = `${title.replace(/[/\\:*?"<>|]/g, '_')} ${timestamp}.md`;
        const filepath = `${CONFIG.targetFolder}/${filename}`;

        const url = `${CONFIG.obsidianApiUrl}/vault/${encodeURIComponent(filepath)}`;

        console.log('[NotebookLM→Obsidian CF] 저장 URL:', url);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${CONFIG.obsidianApiKey}`,
                    'Content-Type': 'text/markdown'
                },
                body: markdown
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            console.log('[NotebookLM→Obsidian CF] ✅ 저장 성공:', filename);
            return filename;

        } catch (error) {
            console.error('[NotebookLM→Obsidian CF] ❌ 저장 실패:', error);
            throw error;
        }
    }

    /**
     * 메인 저장 함수
     */
    async function handleSaveToObsidian() {
        try {
            showNotification('📝 NotebookLM 내용 추출 중...', 'info');

            const { title, content } = extractNotebookContent();

            if (!content || content.length < 10) {
                showNotification('❌ 추출할 내용이 없습니다.', 'error');
                return;
            }

            const markdown = createMarkdown(title, content);

            showNotification('💾 Obsidian에 저장 중...', 'info');
            const filename = await saveToObsidian(title, markdown);

            showNotification(`✅ 저장 완료: ${filename}`, 'success');

        } catch (error) {
            console.error('[NotebookLM→Obsidian CF] 오류:', error);
            showNotification(`❌ 저장 실패: ${error.message}`, 'error');
        }
    }

    // ========================================
    // 버튼 추가
    // ========================================

    /**
     * Obsidian 저장 버튼 추가
     */
    function addObsidianButton() {
        if (document.querySelector('#obsidian-save-btn-cf')) {
            return;
        }

        const button = document.createElement('button');
        button.id = 'obsidian-save-btn-cf';
        button.textContent = '📓 Obsidian에 저장';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            z-index: 9999;
            font-family: 'Google Sans', Arial, sans-serif;
            transition: transform 0.2s, box-shadow 0.2s;
        `;

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        });

        button.addEventListener('click', handleSaveToObsidian);

        document.body.appendChild(button);
        console.log('[NotebookLM→Obsidian CF] 저장 버튼 추가됨');
    }

    // ========================================
    // 초기화
    // ========================================

    // CSS 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 페이지 로드 후 버튼 추가
    function init() {
        console.log('[NotebookLM→Obsidian CF] 초기화 시작');
        
        // 버튼 추가
        addObsidianButton();

        // MutationObserver로 동적 변경 감지
        const observer = new MutationObserver(() => {
            addObsidianButton();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('[NotebookLM→Obsidian CF] ✅ 초기화 완료');
    }

    // 페이지 로드 완료 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // 이미 로드된 경우 약간 지연 후 실행
        setTimeout(init, 1000);
    }

})();
