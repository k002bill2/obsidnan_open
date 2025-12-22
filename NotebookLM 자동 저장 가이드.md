# NotebookLM to Obsidian 자동 저장 시스템

NotebookLM의 노트와 Artifact(표 포함)를 Obsidian에 자동으로 저장하는 완벽한 솔루션입니다.

---

## ✨ 주요 기능

- ✅ **HTML 표를 마크다운 테이블로 자동 변환**
- ✅ **인용(Citation) 정보 자동 추가**
- ✅ **Custom Frames와 일반 브라우저 모두 지원**
- ✅ **Frontmatter 자동 생성** (날짜, 태그, 출처)
- ✅ **중복 방지** (날짜 기반 파일명)

---

## 📂 구성 파일

### 1. **Custom Frames 전용** (Obsidian 내부에서 사용)
```
.scripts/notebooklm-customframes.js
```
- **용도**: Obsidian Custom Frames 플러그인에서 NotebookLM을 열 때 자동 실행
- **특징**: 순수 JavaScript, `fetch()` 사용
- **설정**: Custom Frames 플러그인 설정에 자동 주입됨

### 2. **Tampermonkey 전용** (일반 브라우저에서 사용)
```
.scripts/notebooklm-to-obsidian.user.js
```
- **용도**: Chrome/Edge에서 NotebookLM을 직접 열 때 사용
- **특징**: Tampermonkey API (`GM_xmlhttpRequest`) 사용
- **설치**: Tampermonkey 대시보드에서 수동 설치 필요

### 3. **테스트 스크립트**
```
.scripts/test_obsidian_api.sh
```
- **용도**: Obsidian Local REST API 연결 테스트

---

## 🚀 빠른 시작

### Obsidian에서 사용 (Custom Frames)

1. **이미 설정 완료!** ✅
   - Custom Frames 플러그인에 스크립트가 자동으로 주입되어 있습니다.

2. **사용 방법**
   - Obsidian에서 Custom Frames로 NotebookLM 열기
   - 노트 열기
   - **"📓 Obsidian에 저장"** 버튼 클릭
   - `NotebookLM` 폴더에서 확인

### 일반 브라우저에서 사용 (Chrome/Edge)

1. **Tampermonkey 설치**
   - [Chrome 웹 스토어](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)에서 설치

2. **스크립트 설치**
   - Tampermonkey 대시보드 열기
   - **새 스크립트 만들기**
   - `.scripts/notebooklm-to-obsidian.user.js` 파일 내용 복사-붙여넣기
   - 저장 (`Cmd+S`)

3. **사용 방법**
   - https://notebooklm.google.com 접속
   - 노트 열기
   - **"📓 Obsidian에 저장"** 버튼 클릭

---

## ⚙️ 설정

### API 키 및 포트 설정

두 파일 모두에서 동일한 설정을 사용합니다:

```javascript
const CONFIG = {
    obsidianApiUrl: 'http://127.0.0.1:27123',  // HTTP 포트 (SSL 문제 없음)
    obsidianApiKey: '171c9f4842fe5b6476229473af33bfe4392514641d6fd98fa55283bb04e36db2',
    targetFolder: 'NotebookLM',
    autoTags: ['notebooklm', 'imported'],
    showNotification: true
};
```

### Obsidian Local REST API 설정

1. **설정 → Community Plugins → Local REST API**
2. **API Key 확인**: `YOUR_API_KEY_HERE`
3. **HTTP 포트 활성화**: `27123` (Insecure Server)
   - ✅ Enable Insecure Server: **ON**

---

## 📊 변환 예시

### HTML Table → Markdown Table

**NotebookLM (HTML)**
```html
<table>
  <tr><td>단계</td><td>담당자</td><td>주요 과업</td></tr>
  <tr><td>준비 및 구성</td><td>대표</td><td>페이지 구성</td></tr>
</table>
```

**Obsidian (Markdown)**
```markdown
| 단계 | 담당자 | 주요 과업 |
| --- | --- | --- |
| 준비 및 구성 | 대표 | 페이지 구성 |
```

### Frontmatter 자동 생성

```yaml
---
created: 2025-12-21 01:30:00
source: NotebookLM
tags: [notebooklm, imported]
---

   # 회사소개서를 만들어보자!-이론편(2)

...
```

---

## 🔧 문제 해결

### Custom Frames에서 버튼이 안 보이는 경우

1. **Obsidian 재시작** (`Cmd+Q` → 다시 열기)
2. **콘솔 확인** (`Cmd+Option+I`)
   ```
   [NotebookLM→Obsidian CF] 스크립트 시작
   [NotebookLM→Obsidian CF] ✅ 초기화 완료
   ```
3. Custom Frames 설정에서 NotebookLM Frame 확인

### Tampermonkey에서 작동하지 않는 경우

1. **Tampermonkey 대시보드**에서 스크립트 활성화 확인
2. **스크립트 설정** → **Original includes**
   - `https://notebooklm.google.com/*` 체크 확인
3. 페이지 새로고침 (`Cmd+R`)

### "저장 실패" 에러

1. **Obsidian이 실행 중인지 확인**
2. **Local REST API 플러그인 활성화 확인**
3. **API 키 확인**
   ```bash
   # 테스트 스크립트 실행
   ./.scripts/test_obsidian_api.sh
   ```
4. **포트 확인**
   ```bash
   lsof -i :27123  # HTTP 포트가 열려있어야 함
   ```

### 데이터가 중간에 끊기는 경우

- ✅ **해결됨**: Custom Frames 스크립트로 전환하면 데이터 끊김 없이 안정적으로 작동합니다.

---

## 📁 저장 위치

```
icloud Obsidian/
└── NotebookLM/
    ├── 회사소개서를 만들어보자!-이론편(2) 2025-12-20.md
    ├── 성공적인 회사소개서 기획과 디자인 가이드라인 2025-12-20.md
    └── ...
```

---

## 🔐 보안

- ⚠️ **API 키는 절대 공개하지 마세요**
- 🔒 스크립트 파일은 로컬에만 보관
- 🌐 HTTP 포트는 `127.0.0.1`(localhost)에서만 접근 가능

자세한 내용은 **[🚨 API 키 보안 조치 가이드.md](🚨 API 키 보안 조치 가이드.md)** 참고

---

## 📝 버전 정보

- **Custom Frames Edition**: v1.0.0
- **Tampermonkey Edition**: v2.4.0

---

## 💡 팁

1. **표가 복잡한 경우**: Custom Frames에서 열어서 저장하는 것이 더 안정적입니다.
2. **빠른 저장**: 키보드 단축키 설정 가능 (Obsidian Custom Frames 설정)
3. **자동 태그**: `CONFIG.autoTags` 배열에 원하는 태그 추가 가능

---

## 📞 지원

문제가 발생하면:
1. 콘솔 로그 확인 (`Cmd+Option+I`)
2. `.scripts/test_obsidian_api.sh` 실행
3. Obsidian 재시작

---

**Made with ❤️ by Claude Code**
