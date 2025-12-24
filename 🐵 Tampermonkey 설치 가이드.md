# 🐵 Tampermonkey 설치 및 NotebookLM 저장 스크립트 설정 가이드

일반 브라우저(Chrome, Edge, Safari)에서 NotebookLM 내용을 Obsidian으로 자동 저장하는 방법입니다.

---

## 📋 사전 요구사항

- ✅ Chrome, Edge, 또는 Safari 브라우저
- ✅ Obsidian 설치됨
- ✅ **Local REST API** 플러그인 활성화
- ✅ API 키 확인됨

---

## 1️⃣ Tampermonkey 설치

### Chrome / Edge

1. **Chrome 웹 스토어** 접속:
   - [Tampermonkey - Chrome 웹 스토어](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

2. **"Chrome에 추가"** 클릭

3. **확장 프로그램 추가** 팝업에서 **"확장 프로그램 추가"** 클릭

4. 설치 완료 후 **브라우저 우측 상단**에 Tampermonkey 아이콘 확인 🐵

### Safari

1. **Mac App Store**에서 Tampermonkey 검색
2. 설치 후 **Safari → 설정 → 확장 프로그램**에서 활성화

### Firefox

1. [Tampermonkey - Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/)
2. **"Firefox에 추가"** 클릭

---

## 2️⃣ 스크립트 설치

### 방법 A: 파일에서 직접 복사 (권장)

1. **Tampermonkey 대시보드 열기**
   - 브라우저 우측 상단 🐵 아이콘 클릭
   - **"대시보드"** 선택

2. **새 스크립트 만들기**
   - 상단 **"+"** 탭 또는 **"새 스크립트 만들기"** 클릭

3. **스크립트 내용 복사**
   - 다음 파일의 전체 내용을 복사:
   ```
   .scripts/notebooklm-to-obsidian.user.js
   ```

4. **에디터에 붙여넣기**
   - 기존 템플릿 내용을 **모두 삭제**
   - 복사한 스크립트 **붙여넣기**

5. **저장** (`Cmd + S` 또는 `Ctrl + S`)

### 방법 B: 대시보드에서 URL로 설치

대시보드 → 유틸리티 → URL에서 설치:
```
file:///[볼트경로]/.scripts/notebooklm-to-obsidian.user.js
```

---

## 3️⃣ API 키 설정 (중요! ⚠️)

스크립트 상단의 `CONFIG` 섹션에서 **API 키**를 수정해야 합니다:

```javascript
const CONFIG = {
    obsidianApiUrl: 'http://127.0.0.1:27123',
    obsidianApiKey: 'YOUR_API_KEY_HERE',  // ← 여기에 실제 API 키 입력
    targetFolder: 'NotebookLM',
    autoTags: ['notebooklm', 'imported'],
    showNotification: true
};
```

### API 키 찾는 방법

1. **Obsidian** 열기
2. **설정** (`Cmd + ,`) → **Community Plugins**
3. **Local REST API** 클릭
4. **API Key** 복사
5. 스크립트의 `YOUR_API_KEY_HERE` 부분에 붙여넣기

> [!IMPORTANT]
> API 키는 **64자리의 긴 문자열**입니다. 정확히 복사해야 합니다!

---

## 4️⃣ 스크립트 활성화 확인

1. **Tampermonkey 아이콘** 클릭 🐵
2. **"NotebookLM to Obsidian Auto-Saver"** 스크립트가 보이는지 확인
3. **토글이 ON** 상태인지 확인 ✅

---

## 5️⃣ 사용 방법

1. **NotebookLM** 접속: https://notebooklm.google.com

2. **노트북 열기** → 저장하고 싶은 노트 선택

3. 화면 **우측 하단**에 **"📓 Obsidian에 저장"** 버튼 확인

4. **버튼 클릭** → 저장 완료 알림 확인

5. **Obsidian**에서 `NotebookLM` 폴더 확인

---

## ✅ 설치 확인 체크리스트

- [ ] Tampermonkey 확장 프로그램 설치됨
- [ ] 스크립트 추가됨 (대시보드에서 확인)
- [ ] API 키가 `YOUR_API_KEY_HERE`에서 **실제 키로 변경**됨
- [ ] 스크립트 토글 **ON**
- [ ] Obsidian Local REST API 활성화됨
- [ ] NotebookLM 페이지에서 버튼이 보임

---

## 🐛 문제 해결

### 버튼이 안 보여요

1. **페이지 새로고침** (`Cmd + R`)
2. **Tampermonkey 아이콘** 클릭 → 스크립트 활성화 확인
3. **콘솔 확인** (`Cmd + Option + I` → Console 탭)
   - `[NotebookLM→Obsidian] 초기화 완료` 메시지 확인

### "네트워크 오류" 또는 저장 실패

1. **Obsidian이 실행 중**인지 확인
2. **Local REST API**가 활성화되었는지 확인
3. **API 키가 정확**한지 확인
4. 터미널에서 테스트:
   ```bash
   curl http://127.0.0.1:27123/ -H "Authorization: Bearer [YOUR_API_KEY]"
   ```

### 스크립트가 작동하지 않음

Tampermonkey **대시보드** → 해당 스크립트 → **설정 탭**:
- **Original includes**에 `https://notebooklm.google.com/*` 체크 확인

---

## 📊 Custom Frames vs Tampermonkey 비교

| 항목 | Custom Frames (Obsidian 내) | Tampermonkey (브라우저) |
|------|---------------------------|----------------------|
| **사용 위치** | Obsidian 앱 내부 | Chrome/Edge/Safari |
| **설치 난이도** | ⭐ 쉬움 (자동) | ⭐⭐ 보통 |
| **CORS 문제** | 발생 가능 | ✅ 없음 |
| **추천 사용자** | Obsidian 중심 작업 | 브라우저 중심 작업 |

---

## 📁 관련 파일

| 파일 | 용도 |
|------|------|
| `.scripts/notebooklm-to-obsidian.user.js` | Tampermonkey 스크립트 |
| `.scripts/notebooklm-customframes.js` | Custom Frames 전용 |
| `.scripts/test_obsidian_api.sh` | API 연결 테스트 |

---

## 📖 관련 문서

- [NotebookLM 자동 저장 가이드](NotebookLM%20자동%20저장%20가이드.md) - 전체 시스템 개요
- [Custom Frames에 Obsidian 저장 버튼 추가 가이드](Custom%20Frames에%20Obsidian%20저장%20버튼%20추가%20가이드.md) - Obsidian 내부 사용
- [🔧 저장 오류 해결 가이드](🔧%20저장%20오류%20해결%20가이드.md) - 오류 해결

---

**최종 수정**: 2025-12-24
