# Custom Frames에 Obsidian 저장 버튼 추가 완료! ✅

NotebookLM을 Obsidian Custom Frames에서 열 때 자동으로 "📓 Obsidian에 저장" 버튼이 추가됩니다.

---

## ✅ 현재 상태

### **설정 완료됨**
- ✅ Custom Frames 플러그인에 스크립트 자동 주입
- ✅ 저장 버튼 자동 생성
- ✅ HTTP API로 안정적인 통신
- ✅ HTML 표 → 마크다운 테이블 자동 변환

---

## 🎯 사용 방법

### 1. **NotebookLM 열기**
- Obsidian에서 Custom Frames로 NotebookLM 열기
- 또는 리본 아이콘 클릭

### 2. **노트 선택**
- 저장하고 싶은 노트 또는 Artifact 열기

### 3. **저장 버튼 클릭**
- 화면 오른쪽 하단 **"📓 Obsidian에 저장"** 버튼 클릭
- 알림: "✅ 저장 완료: [파일명]"

### 4. **확인**
- `NotebookLM` 폴더에서 저장된 파일 확인

---

## 🔧 설정 파일

### **스크립트 위치**
```
.scripts/notebooklm-customframes.js
```

### **자동 주입 위치**
```
.obsidian/plugins/obsidian-custom-frames/data.json
```
- NotebookLM Frame의 `customJs` 필드에 자동 주입됨

---

## ⚙️ 설정 변경

스크립트 파일 (`.scripts/notebooklm-customframes.js`)의 `CONFIG` 섹션을 수정하세요:

```javascript
const CONFIG = {
    obsidianApiUrl: 'http://127.0.0.1:27123',  // API URL
    obsidianApiKey: 'YOUR_API_KEY_HERE',  // API 키
    targetFolder: 'NotebookLM',  // 저장 폴더
    autoTags: ['notebooklm', 'imported'],  // 자동 태그
    showNotification: true  // 알림 표시
};
```

### 변경 후 적용 방법

1. `.scripts/notebooklm-customframes.js` 파일 수정
2. 다음 명령어 실행:
```bash
cd "/Users/younghwankang/Library/Mobile Documents/iCloud~md~obsidian/Documents/icloud Obsidian"

python3 << 'EOF'
import json

# 설정 파일 읽기
config_path = ".obsidian/plugins/obsidian-custom-frames/data.json"
script_path = ".scripts/notebooklm-customframes.js"

with open(config_path, 'r', encoding='utf-8') as f:
    config = json.load(f)

with open(script_path, 'r', encoding='utf-8') as f:
    script_content = f.read()

# NotebookLM Frame에 스크립트 재주입
for frame in config.get('frames', []):
    if 'notebooklm' in frame.get('url', '').lower():
        frame['customJs'] = script_content
        print(f"✅ '{frame.get('displayName')}' 업데이트 완료")
        break

# 저장
with open(config_path, 'w', encoding='utf-8') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print("✅ 설정 파일 업데이트 완료")
EOF
```

3. **Obsidian 재시작** (`Cmd+Q` → 다시 열기)

---

## 🐛 문제 해결

### 버튼이 안 보이는 경우

#### **1. Obsidian 재시작**
```bash
Cmd+Q
# Obsidian 다시 열기
```

#### **2. 콘솔 확인** (`Cmd+Option+I`)
```
[NotebookLM→Obsidian CF] 스크립트 시작 (Custom Frames v1.0.0)
[NotebookLM→Obsidian CF] iframe 환경: true
[NotebookLM→Obsidian CF] ✅ 초기화 완료
```

에러가 보이면 복사해서 검색하거나 분석 요청

#### **3. 스크립트 재주입**
위의 "변경 후 적용 방법" 명령어 실행

### 저장 실패 에러

#### **1. Local REST API 확인**
```bash
# Obsidian 설정 → Community Plugins → Local REST API
# - API Key: YOUR_API_KEY_HERE
# - Enable Insecure Server: ON
# - Insecure Port: 27123
```

#### **2. API 연결 테스트**
```bash
./.scripts/test_obsidian_api.sh
```

출력 예시:
```json
{
  "status": "OK",
  "authenticated": true
}
```

#### **3. 포트 확인**
```bash
lsof -i :27123
# Obsidian이 포트를 열고 있어야 함
```

---

## 💡 고급 기능

### **1. 자동 태그 커스터마이징**
```javascript
autoTags: ['notebooklm', 'imported', 'ai-summary']  // 태그 추가
```

### **2. 저장 폴더 변경**
```javascript
targetFolder: 'AI-Notes/NotebookLM'  // 하위 폴더 지원
```

### **3. 알림 비활성화**
```javascript
showNotification: false  // 알림 끄기
```

---

## 📊 기능 상세

### **HTML Table 자동 변환**
- NotebookLM의 표를 **마크다운 테이블**로 자동 변환
- 헤더와 데이터 행 자동 인식
- 빈 셀 처리

### **인용 정보 추가**
- Citation 버튼 개수 자동 카운트
- 푸터에 인용 정보 섹션 추가

### **Frontmatter 생성**
```yaml
---
created: 2025-12-21 01:30:00
source: NotebookLM
tags: [notebooklm, imported]
---
```

### **중복 방지**
- 파일명에 날짜 자동 추가
- 예: `회사소개서 2025-12-20.md`

---

## 🔐 보안

- ✅ 스크립트는 Obsidian 볼트 내부에만 저장됨
- ✅ API 통신은 `127.0.0.1` (localhost)로만 제한
- ⚠️ API 키를 공개하지 마세요

---

## 📖 관련 문서

- **[NotebookLM 자동 저장 가이드.md](NotebookLM 자동 저장 가이드.md)**: 전체 시스템 개요
- **[🚨 API 키 보안 조치 가이드.md](🚨 API 키 보안 조치 가이드.md)**: 보안 가이드

---

**✅ 완료! Custom Frames에서 바로 사용 가능합니다.**
