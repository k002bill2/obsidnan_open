---
description: 새로운 AI Agent 정의 파일을 생성합니다
---

Create a new AI agent definition following the standard format:

1. **Determine agent type and name**:
   - Language Specialist: `[lang]-pro.md`
   - Architect: `[domain]-architect.md`
   - Reviewer: `[type]-reviewer.md`
   - Expert: `[domain]-expert.md`

2. **Create agent file in `Agent/` directory**:
   ```markdown
   ---
   name: [agent-name]
   description: [역할 한 줄 설명]
   tools: [edit, create, browser, analyze 중 선택]
   model: sonnet-4.5
   ---
   
   You are a [역할] specializing in:
   - [전문 영역 1]
   - [전문 영역 2]
   - [전문 영역 3]
   
   ## Core Principles
   1. **[원칙1]**: 설명
   2. **[원칙2]**: 설명
   
   ## Workflow
   1. 분석 단계
   2. 실행 단계
   3. 검증 단계
   
   ## Output Format
   - Code: 적절한 형식 지정
   - Documentation: Markdown 형식
   
   ## Language
   - 기본: 한국어
   - 코드 주석: 한국어 또는 영어
   ```

3. **Apply Skill**: Use `.claude/skills/agent-creator/SKILL.md`

Ask for:
- Agent의 역할 및 전문 분야
- 사용할 도구들
- 특별한 제약 조건
