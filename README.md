# 📓 NotebookLM to Obsidian Auto-Saver

NotebookLM의 노트와 Artifact(표 포함)를 Obsidian에 자동으로 저장하는 시스템입니다.

---

## ✨ 주요 기능

- ✅ **HTML 표를 마크다운 테이블로 자동 변환**
- ✅ **인용(Citation) 정보 자동 추가**
- ✅ **Custom Frames와 일반 브라우저 모두 지원**
- ✅ **Frontmatter 자동 생성** (날짜, 태그, 출처)
- ✅ **중복 방지** (날짜 기반 파일명)

---

## 🚀 빠른 시작

### 방법 1: Obsidian Custom Frames (권장)

Obsidian 앱 내에서 NotebookLM을 열어 바로 저장합니다.

1. **Custom Frames** 플러그인 설치
2. NotebookLM Frame 추가 (`https://notebooklm.google.com`)
3. 우측 하단 **"📓 Obsidian에 저장"** 버튼 클릭

> 📖 상세 가이드: [Custom Frames에 Obsidian 저장 버튼 추가 가이드](Custom%20Frames에%20Obsidian%20저장%20버튼%20추가%20가이드.md)

### 방법 2: Tampermonkey (브라우저)

일반 브라우저(Chrome/Edge/Safari)에서 NotebookLM을 열어 저장합니다.

1. **Tampermonkey** 확장 프로그램 설치
2. 스크립트 설치 (`.scripts/notebooklm-to-obsidian.user.js`)
3. NotebookLM 페이지에서 **"📓 Obsidian에 저장"** 버튼 클릭

> 📖 상세 가이드: [🐵 Tampermonkey 설치 가이드](🐵%20Tampermonkey%20설치%20가이드.md)

---

## 📂 프로젝트 구조

```
obsidian_lite/
├── .scripts/                     # 자동화 스크립트
│   ├── notebooklm-customframes.js    # Custom Frames 전용
│   ├── notebooklm-to-obsidian.user.js # Tampermonkey 전용
│   └── test_obsidian_api.sh          # API 테스트
├── NotebookLM/                   # 저장된 노트 폴더
├── secret/                       # API 키 (Git 제외)
└── 📖 가이드 문서들
```

---

## ⚙️ 필수 설정

### 1. Obsidian Local REST API 플러그인

| 설정 항목 | 값 |
|----------|---|
| Enable Insecure Server | ✅ ON |
| Insecure Port | 27123 |
| API Key | (자동 생성된 키 사용) |

### 2. 스크립트 설정

`.scripts/notebooklm-customframes.js` 또는 `.scripts/notebooklm-to-obsidian.user.js`:

```javascript
const CONFIG = {
    obsidianApiUrl: 'http://127.0.0.1:27123',
    obsidianApiKey: 'YOUR_API_KEY_HERE',  // ← 실제 API 키로 변경
    targetFolder: 'NotebookLM',
    autoTags: ['notebooklm', 'imported']
};
```

---

## 📖 가이드 문서

| 문서 | 설명 |
|-----|------|
| [NotebookLM 자동 저장 가이드](NotebookLM%20자동%20저장%20가이드.md) | 전체 시스템 개요 |
| [Custom Frames 저장 버튼 추가 가이드](Custom%20Frames에%20Obsidian%20저장%20버튼%20추가%20가이드.md) | Obsidian 내부 사용 |
| [🐵 Tampermonkey 설치 가이드](🐵%20Tampermonkey%20설치%20가이드.md) | 브라우저 사용 |
| [🔧 저장 오류 해결 가이드](🔧%20저장%20오류%20해결%20가이드.md) | 문제 해결 |
| [🚨 API 키 보안 조치 가이드](🚨%20API%20키%20보안%20조치%20가이드.md) | 보안 설정 |

---

## 🐛 문제 해결

### "Failed to fetch" 오류

1. Obsidian 재시작 (`Cmd + Q` → 다시 열기)
2. Local REST API 플러그인 활성화 확인
3. 상세: [🔧 저장 오류 해결 가이드](🔧%20저장%20오류%20해결%20가이드.md)

### API 연결 테스트

```bash
curl http://127.0.0.1:27123/ -H "Authorization: Bearer YOUR_API_KEY"
```

정상 응답: `{"status":"OK","authenticated":true}`

---

## 🔐 보안

- ⚠️ **API 키는 절대 공개하지 마세요**
- 🔒 `secret/` 폴더는 `.gitignore`에 추가됨
- 🌐 API는 `127.0.0.1`(localhost)에서만 접근 가능

---

## 📝 버전 정보

- **Custom Frames Edition**: v3.1.0
- **Tampermonkey Edition**: v3.1.0

---

## 📜 라이선스

MIT License

---

**Made with ❤️ by Claude Code**