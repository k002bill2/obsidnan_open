# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal Obsidian vault (knowledge management system) stored in iCloud, primarily containing Korean-language documentation for software development projects, AI tools configuration, and personal reference materials.

**Primary Language**: Korean (한국어) - All responses should be in Korean unless English is specifically requested.

**Key Projects Documented**:
- KiiPS (Korea Investment Information Processing System) - Java/Spring Boot microservices architecture
- NotebookLM integration automation
- Claude Code and AI development workflows
- Custom agent definitions for various development tasks

## Repository Structure

### Core Directories

- **`Rules/`** - Project development rules, templates, and AI assistant configurations
  - Contains Cursor AI rules, project templates, and development standards
  - Key files: `User Rules2.md`, `KiiPS-UI 프로젝트 상세 분석 및 개발운영 규칙.md`

- **`Agent/`** - 80+ custom agent definition files for specialized development tasks
  - Each `.md` file defines a specialized agent (e.g., `backend-architect.md`, `code-reviewer.md`)
  - Used with Claude Code and other AI tools for specific development workflows

- **`Claude/`** - Claude Code documentation and usage guides
  - Contains usage patterns, best practices, and command references

- **`NotebookLM/`** - Auto-synced notes from Google's NotebookLM
  - Target folder for automated synchronization script

- **`.scripts/notebooklm_sync/`** - Python automation for NotebookLM → Obsidian sync
  - Real-time file watcher that monitors Downloads folder
  - Auto-adds Obsidian frontmatter to imported files

- **`Knowledge/`** - AI tools, programs, and technical reference materials

- **`UIUX/`** - UI/UX design resources and AI-assisted development workflows

- **`Prompt/`** - Prompt engineering templates and patterns

- **`개인자료/`** - Personal reference materials (Mac setup, work-related docs)

### Key Configuration Files

- **`.gitignore`** - Protects API keys and sensitive plugin data from version control
- **`.obsidian/`** - Obsidian workspace settings and plugins (30+ plugins installed)
- **`.claude/settings.local.json`** - Local Claude Code configuration

## Common Commands

### NotebookLM Sync Automation

The vault includes a Python-based automation system for syncing NotebookLM exports:

```bash
# Navigate to sync script directory
cd ".scripts/notebooklm_sync"

# Install dependencies
pip3 install -r requirements.txt

# Run sync (monitors Downloads folder for .md files)
python3 sync.py

# Run in background
nohup python3 sync.py &

# Stop background process
pkill -f sync.py

# View logs
tail -f .scripts/notebooklm_sync/sync.log
```

**Configuration**: Edit `.scripts/notebooklm_sync/config.yaml` to customize:
- Watch folder (default: `~/Downloads`)
- Target folder (default: `NotebookLM`)
- Auto-tags, duplicate handling, frontmatter options

### Git Operations

This is a Git repository with many untracked files (primarily Obsidian content):

```bash
# Check status
git status

# View recent commits
git log --oneline -10

# Add and commit specific files
git add <file>
git commit -m "message"
```

**Note**: The `.gitignore` is configured to exclude workspace files, plugin data with API keys, and temporary files.

## Architecture & Development Patterns

### KiiPS Project Context

The vault contains extensive documentation for KiiPS, a microservices-based financial investment system:

**Technology Stack**:
- Java 8, Spring Boot 2.4.2
- 18 independent service modules (MSA architecture)
- JSP + jQuery + Bootstrap frontend
- Maven build system

**Key Modules** (documented in `모듈분석_*.md` files):
- Core Business Services: AC (Accounting), IL (Investment Limit), FD (Fund), PG (Payment Gateway)
- Infrastructure Services: SY (System), EL (Event Log), RT (Real-time), COMMON
- External Integration: KSD (Korea Depository), EBAAS (E-Government)
- Frontend: KiiPS-UI (Port 8100), Login (JWT Auth, Port 8801)

**Reference Files**:
- `KiiPS_프로젝트_상세분석.md` - Overall system architecture
- `KiiPS_Application_Architecture_Diagram.md` - Architecture diagrams
- `Rules/KiiPS-UI 프로젝트 상세 분석 및 개발운영 규칙.md` - Development rules

### AI Assistant Configuration

The vault includes comprehensive rules for AI assistants:

**Memory Bank Structure** (from `Project Rules.md`):
- Core files: `projectbrief.md`, `productContext.md`, `activeContext.md`, `systemPatterns.md`, `techContext.md`, `progress.md`
- Extended: `changelog.md`, `priority.md`, `risks.md`, `faq.md`, `performance.md`

**Workflow Modes**:
1. **Plan Mode** - Read all memory bank files → Ask clarifying questions → Draft plan → Execute
2. **Act Mode** - Check memory bank → Update documents → Execute → Document changes

**User Preferences** (from `Rules/User Rules2.md`):
- Always respond in Korean (한국어)
- Focus on readability over performance
- Expert-level code with clear explanations
- Complete implementation (no TODOs or placeholders)
- Concise responses, minimize prose

### Agent System

The `Agent/` directory contains 80+ specialized agent definitions:

**Categories**:
- **Language Specialists**: `java-pro.md`, `golang-pro.md`, `rust-pro.md`, `cpp-pro.md`, `ruby-pro.md`
- **Architecture**: `backend-architect.md`, `kubernetes-architect.md`, `hybrid-cloud-architect.md`
- **Quality**: `code-reviewer.md`, `test-automator.md`, `debugger.md`, `error-detective.md`
- **Platform**: `ios-developer.md`, `flutter-expert.md`, `terraform-specialist.md`
- **SEO & Marketing**: `seo-*.md` files for content strategy and optimization
- **Domain-Specific**: `quant-analyst.md`, `ml-engineer.md`, `mlops-engineer.md`

## Development Workflows

### Working with Obsidian Vault

This is a knowledge base, not a traditional code project. When working here:

1. **File Organization**:
   - Use appropriate directories (`Rules/`, `Knowledge/`, `Clippings/`, etc.)
   - Add proper frontmatter to new notes (created date, tags)
   - Use Korean for content unless English is requested

2. **Linking Notes**:
   - Use Obsidian wikilinks: `[[Note Name]]`
   - For sections: `[[Note Name#Section]]`

3. **Frontmatter Format**:
   ```yaml
   ---
   created: YYYY-MM-DD
   tags: [tag1, tag2, tag3]
   source: <optional>
   ---
   ```

4. **Markdown Features**:
   - Supports Mermaid diagrams
   - Code blocks with syntax highlighting
   - Tables, callouts, and Obsidian-specific features

### Security Considerations

From `🚨 API 키 보안 조치 가이드.md`:
- **Never commit**: API keys, tokens, credentials
- **Protected by .gitignore**: Plugin data files (`*/data.json`), environment files, secret configs
- **Safe to commit**: Plugin manifest files, general settings, non-sensitive content

**Secret Storage**:
- `Secret/` directory for sensitive information (excluded from git tracking)
- Use environment variables for API keys in scripts

## Important Notes

1. **File Paths**: This vault uses iCloud sync with spaces in path:
   ```
   ~/Library/Mobile Documents/iCloud~md~obsidian/Documents/icloud Obsidian/
   ```
   Always quote paths with spaces in shell commands.

2. **Python Scripts**: Use `python3` explicitly (macOS default Python 2 is deprecated)

3. **Obsidian Plugins**: 30+ plugins installed including:
   - `dataview` - Database queries in notes
   - `templater-obsidian` - Dynamic templates
   - `smart-composer` - AI writing assistant
   - `obsidian-local-rest-api` - REST API for external integrations
   - `excalidraw` - Diagrams and sketches

4. **No Build Process**: This is a documentation repository, not a software project. There are no build, lint, or test commands for the vault itself (only for documented projects like KiiPS).

5. **Language Preference**: Default to Korean for all responses and documentation unless explicitly asked for English.

## Reference Documentation

- **Claude Code Usage**: `Claude code usage.md`, `Claude Code 코드 설명.md`
- **AI Prompting**: `프롬프트 개발 템플릿.md`, `Clippings/구글의 AI 프롬프팅 정석 TCREI 요약.md`
- **NotebookLM Integration**: `NotebookLM 동기화 가이드.md`
- **Project Templates**: Files in `Rules/` starting with `Template_`
- **Skills Guide**: `skills guide/` 폴더 내 Claude Code 활용 가이드

## Claude Code 확장 시스템

### Skills (`.claude/skills/`)

자동 활성화되는 가이드라인 시스템:

| Skill | 용도 | 트리거 키워드 |
|-------|------|--------------|
| `obsidian-note` | 노트 생성/관리 | 노트, note, 문서 |
| `agent-creator` | Agent 정의 생성 | agent, 에이전트 |
| `knowledge-organizer` | 기술 문서 작성 | knowledge, 지식, 가이드 |

### Custom Commands (`.claude/commands/`)

| 커맨드 | 설명 |
|--------|------|
| `/new-note` | 표준 형식으로 새 노트 생성 |
| `/dev-docs` | 프로젝트 계획에 대한 Dev Docs 3-파일 생성 |
| `/update-dev-docs` | 진행 상황으로 Dev Docs 업데이트 |
| `/new-agent` | 새 AI Agent 정의 생성 |

### Sub-Agents (`.claude/agents/`)

| 에이전트 | 역할 |
|---------|------|
| `note-organizer` | 노트 정리 및 구조화 |
| `knowledge-curator` | 기술 지식 문서 큐레이션 |
| `strategic-planner` | 대규모 프로젝트 계획 수립 (opus) |

### Workflows (`.agent/workflows/`)

| 워크플로우 | 설명 |
|-----------|------|
| `/new-note` | 새 노트 생성 워크플로우 |
| `/project-planning` | 프로젝트 계획 및 Dev Docs 생성 |
| `/new-agent` | 새 Agent 생성 워크플로우 |

### Dev Docs 시스템 (`dev/`)

대규모 작업의 컨텍스트를 유지하기 위한 3-파일 시스템:

```
dev/
├── active/              # 진행 중인 프로젝트
│   └── [project]/
│       ├── [project]-plan.md     # 승인된 계획
│       ├── [project]-context.md  # 핵심 결정사항
│       └── [project]-tasks.md    # 체크리스트
└── completed/           # 완료된 프로젝트 아카이브
```

**워크플로우**:
1. 계획 수립: `planning mode로 [프로젝트] 계획해줘`
2. Dev Docs 생성: `/dev-docs`
3. 진행 업데이트: `/update-dev-docs`
4. 세션 재시작: `[프로젝트] 계속 작업해줘`

### Skill Rules (`.claude/skill-rules.json`)

키워드 및 패턴 기반 Skills 자동 활성화 규칙 정의
