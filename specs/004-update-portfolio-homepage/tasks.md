# Tasks: Portfolio Homepage Content Update

**Input**: Design documents from `/specs/004-update-portfolio-homepage/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Tech stack: TypeScript 5.x, Next.js 15+, React 19, TailwindCSS, existing dark theme
   → Structure: Next.js Portfolio Site (src/components/, src/app/)
2. Load design documents:
   → data-model.md: ProfessionalProfile, PersonalInformation, WorkExperience, SkillsData, etc.
   → contracts/: ProfileHeader, ProfessionalSummary, SkillsSection, ExperienceSection, EducationSection
   → research.md: Component-based sections, TailwindCSS extension, TypeScript constants
3. Generate tasks by category:
   → Setup: TypeScript interfaces, professional data, testing infrastructure
   → Tests: component tests, accessibility tests, integration tests
   → Core: professional content components, dark theme integration
   → Integration: homepage composition, responsive layout
   → Polish: performance validation, cross-browser testing, documentation
4. Apply task rules:
   → Component files = mark [P] for parallel development
   → Shared CSS/theme files = sequential
   → Tests before implementation (TDD)
5. Tasks numbered T001-T031
6. Focus on component-first development with accessibility
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Components**: `src/components/sections/` for professional content components
- **Types**: `src/types/professional.ts` for TypeScript interfaces
- **Data**: `src/lib/professional-data.ts` for static professional content
- **Tests**: `tests/components/` for component tests
- **Styles**: Extend existing `src/app/globals.css` and TailwindCSS

## Phase 3.1: Setup
- [x] T001 Create TypeScript interfaces for professional data in src/types/professional.ts
- [x] T002 Create professional data constants in src/lib/professional-data.ts with Hisham Alabri's complete information
- [x] T003 [P] Configure Jest accessibility testing matchers for WCAG 2.1 AA compliance testing

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 [P] Component test for ProfileHeader in tests/components/ProfileHeader.test.tsx
- [x] T005 [P] Component test for ProfessionalSummary in tests/components/ProfessionalSummary.test.tsx
- [x] T006 [P] Component test for SkillsSection in tests/components/SkillsSection.test.tsx
- [x] T007 [P] Component test for ExperienceSection in tests/components/ExperienceSection.test.tsx
- [x] T008 [P] Component test for EducationSection in tests/components/EducationSection.test.tsx
- [x] T010 [P] Accessibility test for professional content WCAG 2.1 AA compliance in tests/accessibility/professional-content.test.tsx
- [x] T011 [P] Integration test for homepage with professional content in tests/integration/homepage-professional.test.tsx

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T012 [P] ProfileHeader component in src/components/sections/ProfileHeader.tsx
- [x] T013 [P] ProfessionalSummary component in src/components/sections/ProfessionalSummary.tsx
- [x] T014 [P] SkillsSection component in src/components/sections/SkillsSection.tsx
- [x] T015 [P] ExperienceSection component in src/components/sections/ExperienceSection.tsx
- [x] T016 [P] EducationSection component in src/components/sections/EducationSection.tsx
- [x] T018 Export professional components from src/components/sections/index.ts

## Phase 3.4: Integration
- [x] T019 Integrate professional content components into homepage src/app/page.tsx preserving dark theme and animations
- [x] T020 Add responsive layout styling for professional content in existing src/app/globals.css
- [x] T021 Implement mobile-first responsive behavior (stack vertically, reduced text sizes)
- [x] T022 Ensure proper z-index layering for content over particle background

## Phase 3.5: Polish
- [ ] T023 [P] Cross-browser testing validation for Chrome, Firefox, Safari
- [ ] T024 [P] Performance testing to ensure no Web Core Vitals degradation
- [ ] T025 [P] Manual accessibility testing with screen readers and keyboard navigation
- [ ] T026 [P] Update quickstart.md with professional content validation steps

## Phase 3.6: SEO
- [ ] T030 SEO validation: add/update title, meta description, JSON-LD `Person` schema + Jest integration test in tests/integration/seo.test.ts
- [ ] T031 Bundle size monitoring: capture baseline (pre-change) and compare post-build ensuring ≤10% JS bundle size increase

## Dependencies
- Setup (T001-T003) before all other phases
- Tests (T004-T011) before implementation (T012-T022)
- T001 (interfaces) before T002 (data constants)
- T002 (data) before T004-T011 (tests using data)
- T012-T017 (components) before T018 (exports)
- T018 (exports) before T019 (homepage integration)
- Implementation (T012-T022) before polish (T023-T026)
 - SEO task (T030) after homepage integration (T019)
 - Bundle size monitoring (T031) can run after initial build; final comparison after component + integration completion

## Parallel Example
```
# Launch component tests together (T004-T009):
Task: "Component test for ProfileHeader in tests/components/ProfileHeader.test.tsx"
Task: "Component test for ProfessionalSummary in tests/components/ProfessionalSummary.test.tsx"
Task: "Component test for SkillsSection in tests/components/SkillsSection.test.tsx"
Task: "Component test for ExperienceSection in tests/components/ExperienceSection.test.tsx"
Task: "Component test for EducationSection in tests/components/EducationSection.test.tsx"

# Launch component implementations together (T012-T017):
Task: "ProfileHeader component in src/components/sections/ProfileHeader.tsx"
Task: "ProfessionalSummary component in src/components/sections/ProfessionalSummary.tsx"
Task: "SkillsSection component in src/components/sections/SkillsSection.tsx"
Task: "ExperienceSection component in src/components/sections/ExperienceSection.tsx"
Task: "EducationSection component in src/components/sections/EducationSection.tsx"
```

## Notes
- [P] tasks = different component files, can be developed independently
- CSS/integration tasks (T019-T022) are sequential as they modify shared files
- Verify all component tests fail before implementing components
- Each component must integrate with existing GlowEffect and DarkThemeProvider
- Maintain existing particle background animations and performance
- All components must meet WCAG 2.1 AA accessibility standards

## Task Generation Rules
- Each component contract → component test task [P]
- Each component → implementation task [P]
- Shared integration files → sequential tasks
- TDD: Tests must fail before implementation
- Accessibility and integration tests run in parallel
- Polish phase includes performance validation and documentation

## Professional Content Requirements Summary
- **ProfileHeader**: Display "Hisham Alabri", "Senior Software Engineer | Java - Spring Boot - React", contact info
- **ProfessionalSummary**: 12+ years experience, enterprise applications, leadership background
- **SkillsSection**: 5 categories - Languages & Frameworks, Cloud & DevOps, Databases, Security, Other Expertise
- **ExperienceSection**: Complete work history with projects:
  - Five Faces: Principal Software Engineer (2020-2025) - Digital Front Door, Florence, MassVax/CoVax, Queue, VMS
  - Intelligent Pathways: Senior Software Engineer (2018-2019) - QAS ePCR
  - Five Faces: Senior Software Engineer (2017-2018) - VMS, Queue deployments  
  - Intelligent Pathways: Software Engineer (2013-2017) - Jetstream, ClipForms, SES Assistance QLD
- **EducationSection**: Bachelor of Engineering (Honours), Computer Systems, La Trobe University (2008-2012)

## Theme Integration Requirements
- Preserve existing dark theme with particle background animations
- Apply GlowEffect to professional headings
- Use existing dark theme CSS variables
- Maintain 60 FPS animation performance
- Ensure responsive design from 320px to 4K displays
- No performance degradation from current Web Core Vitals benchmarks