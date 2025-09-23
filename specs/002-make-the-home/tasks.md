# Tasks: Fancy Glowing Dark Background Home Page

**Input**: Design documents from `/specs/002-make-the-home/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Tech stack: TypeScript, Next.js 15+, React 19, TailwindCSS, CSS animations
   → Structure: Next.js Portfolio Site structure (src/components/, src/app/)
2. Load design documents:
   → data-model.md: ParticleBackground, GlowEffect, DarkThemeProvider components
   → contracts/: Component behavior contracts and test specifications
   → research.md: CSS animations, GPU acceleration, accessibility decisions
3. Generate tasks by category:
   → Setup: dependencies, TypeScript config, CSS framework
   → Tests: component tests, accessibility tests, performance tests
   → Core: UI components, CSS animations, theme system
   → Integration: homepage integration, responsive design
   → Polish: optimization, cross-browser testing, documentation
4. Apply task rules:
   → Component files = mark [P] for parallel development
   → Shared CSS/theme files = sequential
   → Tests before implementation (TDD)
5. Tasks numbered T001-T020
6. Focus on component-driven development with accessibility
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Components**: `src/components/ui/` for reusable UI components
- **Tests**: `tests/components/` for component tests
- **Styles**: `src/app/globals.css` for global CSS and animations
- **Pages**: `src/app/page.tsx` for homepage integration

## Phase 3.1: Setup
- [x] T001 Install CSS animation dependencies and configure TailwindCSS with custom animation utilities
- [x] T002 Setup TypeScript interfaces for component props in src/types/components.ts
- [x] T003 [P] Configure Jest and React Testing Library for component testing with accessibility matchers

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [x] T004 [P] Component test for ParticleBackground in tests/components/ParticleBackground.test.tsx
- [x] T005 [P] Component test for GlowEffect in tests/components/GlowEffect.test.tsx  
- [x] T006 [P] Component test for DarkThemeProvider in tests/components/DarkThemeProvider.test.tsx
- [x] T007 [P] Accessibility test for reduced motion preferences in tests/accessibility/reduced-motion.test.tsx
- [x] T008 [P] Performance test for 60 FPS animations in tests/performance/animation-performance.test.tsx
- [x] T009 [P] Integration test for homepage dark theme in tests/integration/homepage-theme.test.tsx

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T010 [P] ParticleBackground component in src/components/ui/ParticleBackground.tsx
- [x] T011 [P] GlowEffect component in src/components/ui/GlowEffect.tsx
- [x] T012 [P] DarkThemeProvider component in src/components/ui/DarkThemeProvider.tsx
- [x] T013 Dark theme CSS variables and particle animations in src/app/globals.css
- [x] T014 Glow effect CSS utilities and responsive breakpoints in src/app/globals.css
- [x] T015 Export all UI components from src/components/ui/index.ts

## Phase 3.4: Integration
- [x] T016 Integrate ParticleBackground and GlowEffect into homepage in src/app/page.tsx
- [x] T017 Apply DarkThemeProvider wrapper in src/app/layout.tsx
- [x] T018 Implement responsive particle density using CSS media queries
- [x] T019 Add prefers-reduced-motion support across all animations

## Phase 3.5: Polish
- [x] T020 [P] Cross-browser testing and CSS fallbacks for older browsers
- [x] T021 [P] Bundle size optimization and lazy loading for animation components
- [x] T022 [P] Performance monitoring and Core Web Vitals validation
- [x] T023 Update component documentation in quickstart.md

## Dependencies
- Setup (T001-T003) before all other phases
- Tests (T004-T009) before implementation (T010-T019)
- T013-T014 (CSS) before T010-T012 (components using CSS)
- T015 (exports) after T010-T012 (component creation)
- T016-T017 (integration) after T015 (component exports)
- Implementation (T010-T019) before polish (T020-T023)

## Parallel Example
```
# Launch component tests together (T004-T006):
Task: "Component test for ParticleBackground in tests/components/ParticleBackground.test.tsx"
Task: "Component test for GlowEffect in tests/components/GlowEffect.test.tsx"  
Task: "Component test for DarkThemeProvider in tests/components/DarkThemeProvider.test.tsx"

# Launch component implementations together (T010-T012):
Task: "ParticleBackground component in src/components/ui/ParticleBackground.tsx"
Task: "GlowEffect component in src/components/ui/GlowEffect.tsx"
Task: "DarkThemeProvider component in src/components/ui/DarkThemeProvider.tsx"
```

## Notes
- [P] tasks = different component files, can be developed independently
- CSS tasks (T013-T014) are sequential as they modify the same file
- Verify all tests fail before implementing components
- Use CSS transforms and GPU acceleration for performance
- Maintain WCAG 2.1 AA contrast ratios throughout
- Test on mobile devices for battery impact

## Task Generation Rules
- Each component contract → component test task [P]
- Each component → implementation task [P] 
- Shared CSS file → sequential tasks
- Integration tasks depend on component completion
- Accessibility and performance tests run in parallel
- Polish phase includes optimization and documentation