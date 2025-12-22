# NotebookLM to Obsidian Scripts

이 폴더에는 NotebookLM 노트를 Obsidian에 자동 저장하는 스크립트가 포함되어 있습니다.

---

## 📁 파일 목록

### 1. `notebooklm-customframes.js`
**Custom Frames 전용 스크립트**

- **용도**: Obsidian Custom Frames 플러그인에서 NotebookLM을 열 때 사용
- **실행 환경**: Obsidian 내부 (iframe)
- **통신 방식**: `fetch()` API 사용
- **자동 로드**: Custom Frames 설정에 자동 주입됨

**특징:**
- ✅ 순수 JavaScript (No dependencies)
- ✅ Tampermonkey 불필요
- ✅ HTTP로 Obsidian Local REST API 통신
- ✅ 안정적이고 빠름

**이미 설정 완료!** Custom Frames를 열면 자동으로 작동합니다.

---

### 2. `notebooklm-to-obsidian.user.js`
**Tampermonkey 전용 스크립트**

- **용도**: Chrome/Edge 브라우저에서 NotebookLM을 직접 열 때 사용
- **실행 환경**: 일반 웹 브라우저
- **통신 방식**: `GM_xmlhttpRequest` API 사용
- **설치 필요**: Tampermonkey 확장 프로그램 설치 필요

**특징:**
- ✅ 브라우저 확장으로 동작
- ✅ iframe 환경 외부에서도 작동
- ✅ Tampermonkey가 CORS 우회 처리

**설치 방법:**
1. [Tampermonkey 설치](https://www.tampermonkey.net/)
2. Tampermonkey 대시보드 → 새 스크립트
3. 이 파일 내용 복사-붙여넣기
4. 저장 (`Cmd+S`)

---

### 3. `test_obsidian_api.sh`
**API 연결 테스트 스크립트**

- **용도**: Obsidian Local REST API 연결 확인
- **실행 방법**: `./test_obsidian_api.sh`

**테스트 항목:**
- ✅ HTTP 포트 (27123) 연결
- ✅ HTTPS 포트 (27124) 연결
- ✅ API 인증 확인
- ✅ 볼트 정보 확인

**사용 예:**
```bash
cd .scripts
chmod +x test_obsidian_api.sh
./test_obsidian_api.sh
```

---

## 📖 사용 가이드

### Custom Frames에서 사용
1. Obsidian에서 Custom Frames로 NotebookLM 열기
2. 노트 선택
3. **"📓 Obsidian에 저장"** 버튼 클릭

### 일반 브라우저에서 사용
1. Chrome/Edge에서 Tampermonkey 설치
2. `notebooklm-to-obsidian.user.js` 스크립트 추가
3. https://notebooklm.google.com 접속
4. **"📓 Obsidian에 저장"** 버튼 클릭

---

## ⚙️ 설정 변경

두 스크립트 모두 파일 상단의 `CONFIG` 객체를 수정하면 됩니다:

```javascript
const CONFIG = {
    obsidianApiUrl: 'http://127.0.0.1:27123',  // API URL
    obsidianApiKey: 'YOUR_API_KEY_HERE',  // API 키
    targetFolder: 'NotebookLM',  // 저장 폴더
    autoTags: ['notebooklm', 'imported'],  // 자동 태그
    showNotification: true  // 알림 표시
};
```

### 변경 사항 적용

#### Custom Frames 스크립트 수정 시:
```bash
cd "/Users/younghwankang/Library/Mobile Documents/iCloud~md~obsidian/Documents/icloud Obsidian"

python3 << 'EOF'
import json

config_path = ".obsidian/plugins/obsidian-custom-frames/data.json"
script_path = ".scripts/notebooklm-customframes.js"

with open(config_path, 'r') as f:
    config = json.load(f)

with open(script_path, 'r') as f:
    script = f.read()

for frame in config.get('frames', []):
    if 'notebooklm' in frame.get('url', '').lower():
        frame['customJs'] = script
        break

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print("✅ 업데이트 완료. Obsidian을 재시작하세요.")
EOF
```

#### Tampermonkey 스크립트 수정 시:
1. Tampermonkey 대시보드 열기
2. 스크립트 편집
3. 수정 후 저장 (`Cmd+S`)

---

## 🔧 문제 해결

### 버튼이 안 보이는 경우
```bash
# 1. Obsidian 재시작
# 2. 콘솔 확인 (Cmd+Option+I)
# 3. 테스트 스크립트 실행
./test_obsidian_api.sh
```

### 저장 실패 에러
```bash
# Local REST API 플러그인 확인
# - Obsidian 설정 → Community Plugins → Local REST API
# - Enable Insecure Server: ON
# - Insecure Port: 27123

# API 키 확인
# - 플러그인 설정에서 API 키 복사
# - 스크립트의 CONFIG.obsidianApiKey와 일치하는지 확인
```

---

## 📚 관련 문서

- **[NotebookLM 자동 저장 가이드.md](../NotebookLM 자동 저장 가이드.md)**: 전체 시스템 개요
- **[Custom Frames에 Obsidian 저장 버튼 추가 가이드.md](../Custom Frames에 Obsidian 저장 버튼 추가 가이드.md)**: Custom Frames 상세 가이드

---

**Made with ❤️ by Claude Code**
