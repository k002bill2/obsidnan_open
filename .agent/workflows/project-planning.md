---
description: 프로젝트 계획 수립 및 Dev Docs 생성 워크플로우
---

# 프로젝트 계획 워크플로우

## 단계

1. **Planning Mode 진입**
   - "planning mode로 [프로젝트명] 계획 수립해줘"
   - 또는 @strategic-planner 에이전트 호출

2. **계획 초안 작성**
   - Executive Summary
   - Goals & Scope
   - Phase별 작업 분해
   - 리스크 분석
   - Success Metrics

3. **계획 검토 및 승인**
   - 사용자 피드백 반영
   - 최종 승인

4. **Dev Docs 생성**
   ```bash
   /dev-docs
   ```
   다음 3개 파일 생성:
   - `dev/active/[task]/[task]-plan.md`
   - `dev/active/[task]/[task]-context.md`
   - `dev/active/[task]/[task]-tasks.md`

5. **구현 시작**
   - Phase별 순차 구현
   - 완료시마다 tasks.md 업데이트

## 진행 상황 업데이트

Context 부족 경고시 또는 주기적으로:

```bash
/update-dev-docs
```

## 세션 재시작시

"[프로젝트명] 계속 작업해줘" - Dev Docs 자동 로드

## 참고

- `.claude/commands/dev-docs.md`
- `.claude/commands/update-dev-docs.md`
- `.claude/agents/strategic-planner.md`
