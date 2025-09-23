
# Implementation Plan: Portfolio Website Setup with Landing Page

**Branch**: `001-setup-the-project` | **Date**: September 23, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-setup-the-project/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Portfolio website with navigation and profile content. Visitors can navigate between a Home page (displaying skills, experience, bio, education, and projects) and a Blog section (placeholder "coming soon" page). Mobile-first responsive design using Next.js with TypeScript, ensuring full functionality without JavaScript dependency.

## Technical Context
**Language/Version**: TypeScript with Next.js 15+ (React 19+ with compiler enabled)  
**Primary Dependencies**: Next.js, React 19, TailwindCSS, TypeScript, Prisma  
**Storage**: PostgreSQL with Prisma ORM for profile data management  
**Testing**: Jest + React Testing Library for component tests  
**Target Platform**: Web (responsive 320px-4K), self-hosted Kubernetes deployment  
**Project Type**: Next.js Portfolio Site (Option 2 structure)  
**Performance Goals**: Web Core Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)  
**Constraints**: Mobile-first responsive design, full functionality without JavaScript, WCAG 2.1 AA compliance  
**Scale/Scope**: Personal portfolio site, static content with navigation, component-based architecture

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**I. Component-First Architecture**: ✅ Feature decomposed into reusable components with clear interfaces
**II. Performance-First Development**: ✅ Performance impact assessed (bundle size, Web Core Vitals considered)
**III. Responsive Design**: ✅ Mobile-first approach planned for all breakpoints (320px-4K)
**IV. Type Safety & Code Quality**: ✅ TypeScript interfaces defined, no `any` types planned
**V. SEO & Accessibility**: ✅ Semantic HTML, meta tags, and WCAG 2.1 AA compliance planned

*Violations require explicit justification in Complexity Tracking section*

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Next.js Portfolio Site (when React/Next.js detected)
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
│   ├── ui/             # Basic UI components
│   └── sections/       # Page section components
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config

public/                 # Static assets (images, icons, etc.)
tests/
├── components/         # Component unit tests
└── e2e/               # End-to-end tests

# Option 3: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 4: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: Option 2 for Next.js portfolio site with App Router, component-based architecture

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST API patterns
   - Output OpenAPI schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh copilot`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base template
- Generate implementation tasks from Phase 1 design documents:
  * API contracts → interface and data validation tasks
  * Data model → TypeScript type definition tasks
  * Component architecture → UI component creation tasks
  * Quickstart → project setup and configuration tasks
- Each component from quickstart → component implementation task [P]
- Each data interface → type definition task [P]
- Navigation functionality → routing and navigation tasks
- Testing setup → test configuration and example test tasks

**Ordering Strategy**:
- TDD approach: Type definitions and interfaces before implementations
- Foundation first: Project setup and configuration before components
- Dependencies: Base UI components before section components before pages
- Testing: Test setup early, component tests alongside component creation
- Mark [P] for parallel execution where files are independent

**Estimated Task Breakdown**:
1. Project initialization and configuration (Next.js, TypeScript, TailwindCSS)
2. TypeScript type definitions from data model
3. Base UI components (Navigation)
4. Section components (ProfileSection)
5. Page implementations (Home, Blog)
6. Data layer implementation
7. Static content population
8. Testing setup and initial tests
9. Responsive design verification
10. Performance optimization
11. Accessibility compliance verification

**Estimated Output**: 15-20 numbered, ordered tasks in tasks.md with clear dependencies and parallel execution markers

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v1.0.0 - See `/memory/constitution.md`*
