---
name: knowledge-organizer
description: 지식 문서 정리 및 구조화. Knowledge 관련 문서 작성시 사용.
---

# 지식 문서 작성 가이드

## 문서 구조

```markdown
---
created: YYYY-MM-DD
tags: [카테고리, 기술, 난이도]
source: 출처 URL
---

# 제목

## TL;DR
3줄 요약

## 개요
해당 기술/개념이 무엇인지

## 핵심 개념
주요 개념 설명

## 실제 사용법
코드 예시 및 실습

## Best Practices
권장 사례

## 트러블슈팅
일반적인 문제와 해결법

## 참고 자료
- [[관련 노트]]
- 외부 링크
```

## 카테고리별 태그

| 카테고리 | 태그 예시 |
|---------|----------|
| AI 도구 | `ai`, `claude-code`, `chatgpt` |
| 프로그래밍 | `java`, `python`, `javascript` |
| DevOps | `docker`, `kubernetes`, `ci-cd` |
| 데이터베이스 | `postgresql`, `mongodb`, `redis` |
| 보안 | `security`, `authentication`, `encryption` |

## 코드 예시 규칙

```markdown
# 항상 언어 지정
\`\`\`python
# 주석으로 설명 추가
def example():
    """Docstring 포함"""
    pass
\`\`\`

# 실행 결과 포함시
\`\`\`bash
$ python script.py
Output: Success
\`\`\`
```

## 다이어그램 활용

```mermaid
flowchart LR
    A[입력] --> B[처리]
    B --> C[출력]
```

## 품질 체크리스트

- [ ] TL;DR 요약 포함
- [ ] 실행 가능한 코드 예시
- [ ] 관련 노트 링크
- [ ] 태그 적절히 부여
- [ ] 문맥 없이도 이해 가능
