---
description: 새로운 노트를 표준 형식으로 생성합니다
---

Create a new Obsidian note with the following structure:

1. **Create frontmatter**:
   ```yaml
   ---
   created: [오늘 날짜 YYYY-MM-DD]
   tags: [사용자가 지정한 태그 또는 적절한 태그 추론]
   ---
   ```

2. **Add standard sections**:
   - # 제목
   - ## 개요 (핵심 내용 요약)
   - ## 본문 (상세 내용)
   - ## 관련 노트 (관련 링크들)

3. **File placement**:
   - 주제에 맞는 적절한 디렉토리에 저장
   - 파일명은 한국어 사용 가능

4. **Apply Skill**: Use `.claude/skills/obsidian-note/SKILL.md` guidelines

Ask for:
- 노트 제목
- 저장할 디렉토리 (선택, 없으면 추천)
- 관련 태그 (선택)
