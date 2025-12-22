---
name: agent-creator
description: Agent/ 폴더에 새로운 AI 에이전트 정의 파일을 생성할 때 사용. 특화된 역할과 지침을 포함한 에이전트 문서 생성.
---

# AI Agent 생성 가이드

## Agent 파일 구조

```markdown
# .claude/agents/[agent-name].md
---
name: [agent-name]
description: [에이전트의 주요 역할 한 줄 설명]
tools: [사용할 도구들 - edit, create, browser, analyze 등]
model: sonnet-4.5 또는 opus-4.5
---

[에이전트 정의 본문]
```

## 필수 섹션

### 1. Identity (정체성)
```markdown
You are a [역할명] specializing in:
- [핵심 전문 영역 1]
- [핵심 전문 영역 2]
- [핵심 전문 영역 3]
```

### 2. Core Principles (핵심 원칙)
```markdown
## Core Principles
1. **[원칙1]**: 설명
2. **[원칙2]**: 설명
3. **[원칙3]**: 설명
```

### 3. Workflow (작업 흐름)
```markdown
## Workflow
1. 분석 단계
2. 계획 단계
3. 실행 단계
4. 검증 단계
```

### 4. Output Format (출력 형식)
```markdown
## Output Format
- 코드: [형식 지정]
- 문서: [형식 지정]
- 리뷰: [형식 지정]
```

## Agent 카테고리

| 카테고리 | 네이밍 패턴 | 예시 |
|---------|------------|------|
| 언어 전문가 | `[lang]-pro.md` | `java-pro.md`, `python-pro.md` |
| 아키텍트 | `[domain]-architect.md` | `backend-architect.md` |
| 리뷰어 | `[type]-reviewer.md` | `code-reviewer.md` |
| 자동화 | `[domain]-automator.md` | `test-automator.md` |
| 전문가 | `[domain]-expert.md` | `security-expert.md` |

## Agent 파일 위치

Vault 내 Agent 폴더에 저장:
```
Agent/
├── backend-architect.md
├── code-reviewer.md
├── java-pro.md
└── [new-agent].md
```

## 생성 체크리스트

- [ ] 명확한 역할 정의
- [ ] 적절한 도구 선택
- [ ] 출력 형식 지정
- [ ] 예외 처리 규칙
- [ ] 한국어/영어 언어 설정
