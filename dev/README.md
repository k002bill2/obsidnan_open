# Dev Docs 디렉토리

이 폴더는 진행 중인 프로젝트의 개발 문서를 관리합니다.

## 구조

```
dev/
├── active/           # 진행 중인 프로젝트
│   └── [project]/
│       ├── [project]-plan.md     # 승인된 계획
│       ├── [project]-context.md  # 핵심 결정사항, 컨텍스트
│       └── [project]-tasks.md    # 체크리스트
└── completed/        # 완료된 프로젝트 아카이브
    └── YYYY-MM/
        └── [project]/
```

## 사용 방법

### 새 프로젝트 시작

1. 계획 수립: `planning mode로 [프로젝트] 계획 수립해줘`
2. Dev Docs 생성: `/dev-docs`

### 진행 상황 업데이트

```bash
/update-dev-docs
```

### 세션 재시작

"[프로젝트] 계속 작업해줘" - 자동으로 Dev Docs 로드

### 프로젝트 완료

```bash
mv dev/active/[project] dev/completed/$(date +%Y-%m)/
```

## 참고 문서

- [[skills guide/Dev Docs 시스템]]
- [[CLAUDE]]
