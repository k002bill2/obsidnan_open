# 🚨 API 키 보안 조치 가이드

모든 API 키와 민감한 정보는 **`secret/` 폴더**에 안전하게 보관하세요!

---

## ✅ 보안 조치 완료 상태

### 1. ✅ secret 폴더 생성 완료
- **위치**: `secret/`
- **상태**: Obsidian에서 볼 수 있음
- **Git 보호**: `.gitignore`에 추가됨
- **동기화**: iCloud로만 동기화 (암호화됨)

### 2. ✅ .gitignore 설정 완료
```gitignore
# API keys and secrets
Secret/
secret/
.obsidian/plugins/*/data.json
**/*secret*.json
**/*key*.json

# 개인 민감 정보
개인자료/업무관련/
개인자료/

# Obsidian API 테스트 파일 (API 키 포함 가능)
.scripts/test_obsidian_api.sh
.scripts/**/test*.sh
```

---

## 📁 secret 폴더 구조

```
secret/
├── README.md                    ← 폴더 사용 안내
├── api-keys.md                 ← ⭐ API 키 중앙 관리
└── config-backup/              ← 플러그인 설정 백업
    ├── README.md
    ├── smart-composer-YYYYMMDD.json
    └── local-rest-api-YYYYMMDD.json
```

---

## 🔑 API 키 관리 방법

### 1단계: API 키 저장

**`secret/api-keys.md`** 파일을 열고 API 키를 입력하세요:

```markdown
## OpenAI API
- API Key: sk-proj-xxxxx
- Organization: org-xxxxx
- 생성일: 2025-12-21
- 상태: ✅ 활성

## Anthropic API
- API Key: sk-ant-api03-xxxxx
- 생성일: 2025-12-21
- 상태: ✅ 활성

## Obsidian Local REST API
- API Key: 171c9f4842fe5b6476229473af33bfe4392514641d6fd98fa55283bb04e36db2
- HTTP Port: 27123
- 상태: ✅ 활성
```

### 2단계: 플러그인 설정 백업

중요한 플러그인 설정을 `secret/config-backup/`에 백업:

```bash
# Smart Composer 설정 백업
cp ".obsidian/plugins/smart-composer/data.json" \
   "secret/config-backup/smart-composer-$(date +%Y%m%d).json"

# Local REST API 설정 백업
cp ".obsidian/plugins/obsidian-local-rest-api/data.json" \
   "secret/config-backup/local-rest-api-$(date +%Y%m%d).json"
```

---

## 🔐 보안 체크리스트

### ✅ 기본 보안
- [x] `secret/` 폴더 생성 완료
- [x] `.gitignore`에 `secret/` 추가 완료
- [x] `api-keys.md` 템플릿 생성 완료
- [x] 플러그인 `data.json` Git 제외 완료
- [x] `개인자료/` 폴더 Git 제외 완료
- [x] 업무 관련 접속 정보 보호 완료
- [x] API 테스트 스크립트 Git 제외 완료

### 📝 매번 확인할 것
- [ ] API 키를 `secret/api-keys.md`에 저장했는지 확인
- [ ] Git 커밋 전 `git status` 실행
- [ ] `secret/` 폴더가 **Untracked files**에 나타나지 않는지 확인
- [ ] 스크린샷 공유 시 `secret/` 폴더 내용 노출 여부 확인

---

## 🚨 API 키 노출 시 조치

만약 API 키가 Git에 올라갔다면 **즉시** 다음 단계를 수행하세요:

### 1단계: API 키 재발급

#### OpenAI API 키
1. https://platform.openai.com/api-keys 접속
2. 노출된 키 찾기 → **"Revoke"** 클릭
3. **"Create new secret key"**로 새 키 발급
4. `secret/api-keys.md`에 새 키 저장

#### Anthropic API 키
1. https://console.anthropic.com/settings/keys 접속
2. 노출된 키 삭제
3. **"Create Key"**로 새 키 발급
4. `secret/api-keys.md`에 새 키 저장

#### Google Gemini API 키
1. https://aistudio.google.com/app/apikey 접속
2. 노출된 키 삭제
3. 새 API 키 생성
4. `secret/api-keys.md`에 새 키 저장

### 2단계: Git 히스토리 정리

```bash
# BFG Repo-Cleaner 사용 (권장)
brew install bfg

# API 키 제거
bfg --replace-text passwords.txt
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (주의!)
git push origin --force --all
```

⚠️ **경고**: Git 히스토리 재작성은 협업 중인 경우 문제가 될 수 있습니다!

### 3단계: 플러그인 설정 업데이트

```bash
# Obsidian → Settings → Smart Composer
# 새로 발급받은 API 키 입력
```

---

## 🔄 API 키 로테이션 (정기 재발급)

### 권장 주기
- **OpenAI/Anthropic/Google**: 3-6개월마다
- **Obsidian Local REST API**: 6-12개월마다

### 로테이션 절차
1. 새 API 키 발급
2. `secret/api-keys.md`에 새 키 추가 (이전 키는 삭제하지 말고 "❌ 폐기됨" 표시)
3. 플러그인 설정 업데이트
4. 이전 키 삭제 (서비스 제공자 측)
5. 로그 확인 (의심스러운 활동 체크)

---

## 📖 관련 문서

- **[secret/README.md](secret/README.md)**: secret 폴더 사용 안내
- **[secret/api-keys.md](secret/api-keys.md)**: API 키 중앙 관리 (⚠️ 민감 정보)
- **[NotebookLM 자동 저장 가이드.md](NotebookLM 자동 저장 가이드.md)**: NotebookLM API 설정

---

## 💡 추가 보안 팁

### 1. 비밀 관리 도구 사용
- **1Password**, **Bitwarden**, **LastPass** 등 사용 권장
- API 키를 복사-붙여넣기 방식으로 사용
- 자동 입력 기능 활용

### 2. 환경 변수 사용 (고급)
```bash
# .env 파일 생성 (Git 제외됨)
OPENAI_API_KEY=sk-proj-xxxxx
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
OBSIDIAN_API_KEY=171c9f48...
```

### 3. 정기 감사
```bash
# Git 로그에서 API 키 패턴 검색
git log -p | grep -i "sk-proj\|sk-ant\|AIzaSy"

# 결과가 없으면 안전
```

---

## 🎯 현재 관리 중인 API 키

| 서비스 | 파일 위치 | 상태 | 마지막 확인 |
|--------|----------|------|------------|
| OpenAI | `secret/api-keys.md` | - | - |
| Anthropic | `secret/api-keys.md` | - | - |
| Google Gemini | `secret/api-keys.md` | - | - |
| **Obsidian Local REST API** | `secret/api-keys.md` | ✅ 활성 | 2025-12-21 |

---

## 📞 추가 도움이 필요한 경우

- **OpenAI 지원**: https://help.openai.com/
- **Anthropic 지원**: https://support.anthropic.com/
- **Google Cloud 지원**: https://cloud.google.com/support

---

## ⏰ 마지막 업데이트
- **작성일**: 2025-12-21
- **작성자**: Claude Code
- **버전**: 2.1
- **변경 사항**:
  - ✅ `secret/` 폴더 생성 및 안내 추가
  - ✅ API 키 중앙 관리 시스템 구축
  - ✅ 플러그인 설정 백업 가이드 추가
  - ✅ `개인자료/` 폴더 전체 Git 보호 추가
  - ✅ 업무 관련 접속 정보 보호 설정
  - ✅ API 테스트 스크립트 보호 설정

---

**다음 단계**: `secret/api-keys.md` 파일을 열어서 API 키를 안전하게 저장하세요! 🔐
