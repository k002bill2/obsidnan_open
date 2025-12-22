---
description: 승인된 계획에 대한 Dev Docs를 생성합니다
---

Based on the approved plan, create three development documents:

1. **Create `dev/active/[task-name]/[task-name]-plan.md`**:
   - Copy the full approved plan
   - Add timeline and phases if applicable
   - Include success metrics
   - Add clear scope definition

2. **Create `dev/active/[task-name]/[task-name]-context.md`**:
   ```markdown
   # [Task Name] - Context
   
   ## Last Updated: [현재 날짜시간]
   
   ## Key Files
   - List all relevant files
   
   ## Important Decisions
   - [날짜]: 결정 사항
   
   ## Current Issues
   - [ ] 알려진 이슈들
   
   ## Dependencies
   - 필요한 의존성들
   
   ## Next Steps
   1. 다음 단계 1
   2. 다음 단계 2
   ```

3. **Create `dev/active/[task-name]/[task-name]-tasks.md`**:
   ```markdown
   # [Task Name] - Tasks
   
   ## Phase 1 (0/N complete)
   - [ ] Task 1
   - [ ] Task 2
   
   ## Phase 2 (0/N complete)
   - [ ] Task 1
   - [ ] Task 2
   ```

Remember:
- Timestamp everything
- Use checkbox format for all tasks
- Keep files focused and scannable
- Update completion counts regularly
