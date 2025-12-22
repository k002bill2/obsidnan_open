---
description: Agent 폴더에 새 AI 에이전트 추가 워크플로우
---

# 새 Agent 생성 워크플로우

## 단계

1. **Agent 유형 결정**
   | 유형 | 네이밍 | 예시 |
   |------|--------|------|
   | 언어 전문가 | `[lang]-pro.md` | `java-pro.md` |
   | 아키텍트 | `[domain]-architect.md` | `backend-architect.md` |
   | 리뷰어 | `[type]-reviewer.md` | `code-reviewer.md` |
   | 전문가 | `[domain]-expert.md` | `security-expert.md` |

2. **Agent 정의 작성**
   ```bash
   /new-agent
   ```
   
   필수 섹션:
   - Identity (역할 정의)
   - Core Principles (핵심 원칙)
   - Workflow (작업 흐름)
   - Output Format (출력 형식)
   - Language (언어 설정)

3. **파일 저장**
   - 위치: `Agent/[agent-name].md`
   - frontmatter 포함 필수

4. **테스트**
   - `@[agent-name]` 으로 호출 테스트
   - 출력 형식 확인

## 참고

- `.claude/skills/agent-creator/SKILL.md`
- `.claude/commands/new-agent.md`
- 기존 Agent 예시: `Agent/` 디렉토리 참조
