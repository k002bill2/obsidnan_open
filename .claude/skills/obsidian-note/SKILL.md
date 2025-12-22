---
name: obsidian-note
description: Obsidian 노트 생성 및 관리를 위한 가이드라인. 새 노트 생성, 링크 연결, 메타데이터 관리시 사용.
---

# Obsidian 노트 작성 가이드

## 노트 구조

모든 노트는 다음 구조를 따릅니다:

```markdown
---
created: YYYY-MM-DD
tags: [tag1, tag2, tag3]
source: <optional - 출처 URL 또는 레퍼런스>
---

# 제목

## 개요
핵심 내용 요약

## 본문
상세 내용

## 관련 노트
- [[연관 노트 1]]
- [[연관 노트 2]]
```

## 디렉토리 가이드

| 디렉토리 | 용도 | 예시 |
|---------|------|------|
| `Rules/` | 개발 규칙, 템플릿 | 프로젝트 규칙, 코딩 가이드라인 |
| `Agent/` | AI 에이전트 정의 | backend-architect.md |
| `Knowledge/` | 기술 지식 문서 | AI 도구, 프로그램 사용법 |
| `Prompt/` | 프롬프트 템플릿 | 개발용 프롬프트 |
| `UIUX/` | UI/UX 관련 자료 | 디자인 시스템, 패턴 |
| `NotebookLM/` | NotebookLM 동기화 노트 | 자동 동기화됨 |
| `Clippings/` | 웹 클리핑 | 아티클, 튜토리얼 |

## 태그 규칙

```markdown
# 기본 태그 형식
tags: [주제, 세부분류, 상태]

# 예시
tags: [claude-code, setup, 완료]
tags: [java, spring-boot, 학습중]
tags: [obsidian, plugin, 설정]
```

## Wikilink 사용법

```markdown
# 기본 링크
[[노트 이름]]

# 섹션 링크
[[노트 이름#섹션명]]

# 별칭 사용
[[노트 이름|표시할 텍스트]]

# 블록 참조
[[노트 이름#^블록id]]
```

## 코드 블록

```markdown
# 언어 지정 필수
\`\`\`python
def example():
    pass
\`\`\`

# Mermaid 다이어그램
\`\`\`mermaid
graph LR
    A --> B --> C
\`\`\`
```

## Callout 사용

```markdown
> [!note] 참고
> 중요한 정보

> [!warning] 주의
> 경고 메시지

> [!tip] 팁
> 유용한 팁

> [!example] 예시
> 코드 예시

> [!quote] 인용
> 인용문
```

## 체크리스트

```markdown
- [ ] 할 일 1
- [x] 완료된 일
- [ ] 할 일 2
```
