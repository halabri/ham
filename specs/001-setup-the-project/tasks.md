# Task Plan: Portfolio Website Setup with Landing Page

**Feature**: 001-setup-the-project  
**Branch**: 001-setup-the-project  
**Date**: September 23, 2025  
**Source Spec**: ./spec.md  
**Related Plan**: ./plan.md

## Execution Principles
- TDD: Write/ scaffold tests before implementing components
- Component-first: Isolate UI pieces (navigation, sections, pages)
- Static-first: No API for navigation; static data for profile content
- Accessibility & performance baked into each component
- Parallelize independent file creations (marked [P])

## Legend
- [P] = Can be executed in parallel with other [P] tasks (different files)
- Dependencies noted where sequencing required
- Output paths must be created exactly as listed

## Tasks

### Phase A: Environment & Tooling Setup
1. T001 - Initialize Next.js project with TypeScript, TailwindCSS, ESLint, App Router, src dir (if not already)  
   Path: project root  
   Output: `package.json`, base Next.js structure  
   Dependencies: None
2. T002 - Enable React 19 compiler in `next.config.js`  
   Path: `/next.config.js`  
   Dependencies: T001
3. T003 - Configure TypeScript strict mode in `tsconfig.json`  
   Path: `/tsconfig.json`  
   Dependencies: T001
4. T004 - Add Jest + React Testing Library + jest-dom setup  
   Path: `/jest.config.js`, `/jest.setup.js`  
   Dependencies: T001
5. T005 - Add TailwindCSS config (`tailwind.config.js`, `postcss.config.js`, global CSS import)  
   Path: `/tailwind.config.js`, `/src/styles/globals.css`  
   Dependencies: T001
6. T006 - Add ESLint accessibility and Next.js rules; ensure no unused `any`  
   Path: `.eslintrc.*`  
   Dependencies: T001

### Phase B: Type Definitions & Data Layer (Tests First)
7. T007 [P] - Create `src/types/index.ts` with `ProfileItem` + `ProfileSection` interfaces  
   Dependencies: T003
8. T008 [P] - Create `src/lib/data.ts` with `getProfileSections()` returning static filtered sections  
   Dependencies: T007
9. T009 - Write unit test for data layer (e.g., `tests/unit/data.spec.ts`) asserting hidden sections are filtered out  
   Dependencies: T008

### Phase C: Core UI Components (Scaffold Tests Then Implement)
10. T010 [P] - Create test `tests/components/Navigation.test.tsx` (expect Home/Blog links, active state)  
    Dependencies: T004
11. T011 [P] - Implement `src/components/ui/Navigation.tsx` with static `NAVIGATION_ITEMS` and active styling  
    Dependencies: T010
12. T012 [P] - Create test `tests/components/ProfileSection.test.tsx` (renders title, hides when not visible, renders list vs text)  
    Dependencies: T004
13. T013 [P] - Implement `src/components/sections/ProfileSection.tsx`  
    Dependencies: T012

### Phase D: Pages (Home & Blog)
14. T014 - Create test `tests/components/HomePage.test.tsx` (renders heading + at least one visible profile section)  
    Dependencies: T011, T013, T009
15. T015 - Implement `src/app/page.tsx` (Home page) using Navigation + ProfileSection components  
    Dependencies: T014
16. T016 - Create test `tests/components/BlogPage.test.tsx` (renders Coming Soon + navigation)  
    Dependencies: T011
17. T017 - Implement `src/app/blog/page.tsx`  
    Dependencies: T016

### Phase E: Styling, Accessibility & Performance Hardening
18. T018 [P] - Add semantic landmarks (nav, main, header) & aria attributes where appropriate  
    Path: components + pages  
    Dependencies: T011, T013, T015, T017
19. T019 [P] - Add basic responsive layout utilities (containers, spacing, typography) to global styles  
    Path: `/src/styles/globals.css`  
    Dependencies: T005
20. T020 [P] - Ensure color contrast + focus outlines (manual audit + tweaks)  
    Path: CSS + component classNames  
    Dependencies: T019
21. T021 - Run Lighthouse (manual) and document performance metrics in `research.md` appendix  
    Dependencies: T015, T017

### Phase F: Testing & Quality Gates
22. T022 - Add accessibility test (axe or jest-axe) for Navigation & ProfileSection  
    Dependencies: T011, T013, T004
23. T023 - Add integration test simulating navigation between Home and Blog (Next.js test utilities)  
    Dependencies: T015, T017, T004
24. T024 - Add type checking & lint scripts to `package.json` ("typecheck", enforce no `any`)  
    Dependencies: T001, T003
25. T025 - Add CI-friendly test & lint summary doc section in `quickstart.md`  
    Dependencies: T024

### Phase G: Documentation & Finalization
26. T026 [P] - Update `quickstart.md` with any deviations & final instructions  
    Dependencies: T021, T025
27. T027 [P] - Update `research.md` with performance + accessibility findings appendix  
    Dependencies: T021, T022
28. T028 - Create `README.md` (repo root) summarizing stack, scripts, and feature status  
    Dependencies: T026, T027
29. T029 - Final quality gate: run tests, lint, typecheck; mark completion in `plan.md` Progress Tracking  
    Dependencies: T028

### Phase H: Optional Future (Do NOT implement now - placeholders)
30. T030 - (Deferred) Prepare Prisma schema migration for dynamic content (future feature)  
31. T031 - (Deferred) Add API routes for dynamic profile editing (future admin)  

## Parallel Execution Guidance
- Safe parallel groups:
  * Group 1: T007, T010, T012 (independent test scaffolds after tooling)  
  * Group 2: T011, T013 (after their respective tests)  
  * Group 3: T018, T019, T020 (post initial pages)  
  * Group 4: T026, T027 (post metrics & audits)
- Avoid parallel implementation of tasks modifying the same file (e.g., page implementations sequential: T015 then T017)

## Dependency Graph (Condensed)
```
T001 → T002,T003,T004,T005,T006
T003 → T007
T007 → T008 → T009
T004 → T010,T012
T010 → T011
T012 → T013
T011,T013,T009 → T014 → T015
T011 → T016 → T017
T011,T013,T015,T017 → T018
T005 → T019 → T020
T015,T017 → T021
T011,T013 → T022
T015,T017,T004 → T023
T001,T003 → T024 → T025
T021,T025 → T026
T021,T022 → T027
T026,T027 → T028 → T029
```

## Validation Criteria Per Phase
- Components: All tests green, no unused exports
- Pages: Render correct static content, no console errors
- Accessibility: No critical axe violations
- Performance: LCP < 2.5s, CLS < 0.1 observed locally
- Documentation: Quickstart + README align with actual structure

## Completion Signal
Feature ready when T029 passes and Progress Tracking updated (Phase 3 tasks complete, quality gates satisfied).

