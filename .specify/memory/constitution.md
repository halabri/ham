<!--
Sync Impact Report - Constitution Update
Version change: 1.1.0 → 1.2.0
Modified principles: Updated Technology Standards to mandate PostgreSQL database and Prisma ORM
Added sections: Database and ORM requirements in Core Stack Requirements
Removed sections: None
Templates requiring updates: ✅ plan-template.md (validated), ✅ spec-template.md (validated), ✅ tasks-template.md (validated)
Follow-up TODOs: None
-->

# Ham Portfolio Site Constitution

## Core Principles

### I. Component-First Architecture
Every feature MUST be built as reusable React components with clear interfaces. Components must be self-contained, independently testable, and documented with TypeScript interfaces. No monolithic page structures - break down complex UIs into composable building blocks.

**Rationale**: Ensures maintainability, enables component reuse across the portfolio, and supports incremental development with clear boundaries.

### II. Performance-First Development
All components and pages MUST meet Web Core Vitals standards: LCP < 2.5s, FID < 100ms, CLS < 0.1. Image optimization via Next.js Image component is mandatory. Bundle size monitoring required for all builds.

**Rationale**: Portfolio sites are judged heavily on performance. Poor performance directly impacts user experience and professional credibility.

### III. Responsive Design (NON-NEGOTIABLE)
Mobile-first design approach is mandatory. All components must work seamlessly from 320px to 4K displays. TailwindCSS breakpoints must be consistently applied: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).

**Rationale**: Modern web usage is mobile-dominant. A portfolio that doesn't work on mobile devices fails its primary purpose.

### IV. Type Safety & Code Quality
TypeScript strict mode enforced throughout. All components must have proper TypeScript interfaces. ESLint and Prettier configurations mandatory. No `any` types except for well-documented third-party library integrations.

**Rationale**: Type safety prevents runtime errors and improves development experience. Consistent code quality reflects professional standards.

### V. SEO & Accessibility Excellence
All pages must have proper meta tags, structured data, and semantic HTML. WCAG 2.1 AA compliance mandatory. Alt text required for all images. Proper heading hierarchy enforced. Focus management for interactive elements.

**Rationale**: Portfolio visibility depends on SEO. Accessibility is both ethically important and legally required in many contexts.

## Technology Standards

### Core Stack Requirements
- **Framework**: Next.js 15+ with App Router and React 19 compiler enabled (React 19+ features encouraged)
- **React Compiler**: React 19 compiler MUST be enabled in Next.js configuration for automatic optimization
- **Database**: PostgreSQL (latest stable version) for all persistent data storage
- **ORM**: Prisma MUST be used for all database interactions with type-safe query generation
- **Styling**: TailwindCSS with custom design system configuration
- **TypeScript**: Strict mode enabled, latest stable version
- **Package Manager**: npm or yarn, lockfile committed
- **Deployment**: Self-hosted in a kubernetes cluster

### Development Tooling
- **Linting**: ESLint with Next.js and accessibility rules
- **Formatting**: Prettier with consistent configuration
- **Testing**: Jest + React Testing Library for component tests
- **Version Control**: Git with conventional commit messages
- **Asset Optimization**: Next.js Image, automatic WebP conversion

## Quality Gates

### Pre-Development Checklist
- [ ] Component interface designed with TypeScript
- [ ] Responsive behavior planned for all breakpoints
- [ ] Performance impact assessed (bundle size, loading time)
- [ ] Accessibility requirements identified
- [ ] SEO considerations documented

### Pre-Deployment Validation
- [ ] All tests passing (unit, integration, accessibility)
- [ ] Lighthouse scores: Performance 90+, Accessibility 100, Best Practices 90+, SEO 90+
- [ ] Cross-browser testing completed (Chromium, Firefox, Safari)
- [ ] Mobile device testing on actual devices
- [ ] Content review for portfolio presentation quality

## Governance

This constitution supersedes all other development practices. All feature development must demonstrate compliance with these principles before merge approval. Performance regressions require explicit justification and mitigation plans.

Amendment procedure: Proposals require documentation of impact on existing code, migration timeline, and approval rationale. Breaking changes to core principles require major version increment.

Use project README.md and component documentation for runtime development guidance and specific implementation patterns.

**Version**: 1.2.0 | **Ratified**: 2025-09-23 | **Last Amended**: 2025-09-23