# Data Model: Portfolio Website

**Feature**: 001-setup-the-project  
**Date**: September 23, 2025  
**Status**: Complete

## Core Entities

### NavigationItem
**Purpose**: Represents static navigation structure for the portfolio site
```typescript
interface NavigationItem {
  id: string;           // Unique identifier ('home', 'blog') - static values
  label: string;        // Display text ('Home', 'Blog') - static values
  href: string;         // URL path ('/', '/blog') - static values
  isActive?: boolean;   // Current page indicator - computed at runtime
}

// Static navigation definition
const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
];
```

**Validation Rules**:
- `id`, `label`, and `href` are hardcoded constants - no validation needed
- `isActive` computed based on current route match

**State Transitions**: Immutable - navigation structure never changes

### ProfileSection
**Purpose**: Represents different sections of the portfolio profile
```typescript
interface ProfileSection {
  id: string;           // Section identifier ('bio', 'skills', 'experience', 'education', 'projects')
  title: string;        // Section heading
  content: string | ProfileItem[]; // Section content
  isVisible: boolean;   // Whether section has content and should be displayed
  order: number;        // Display order on page
}
```

**Validation Rules**:
- `id` must match predefined section types
- `title` must be non-empty string
- `isVisible` false when content is empty (hiding empty sections per requirements)
- `order` must be positive integer

### ProfileItem
**Purpose**: Individual items within profile sections (skills, experiences, etc.)
```typescript
interface ProfileItem {
  id: string;           // Unique identifier
  title: string;        // Item title (job title, skill name, project name)
  description?: string; // Item description or details
  organization?: string; // Company, school, or organization name
  dateRange?: string;   // Time period (e.g., "2020-2023", "2019")
  tags?: string[];      // Associated technologies, skills, or categories
  url?: string;         // Related link (project demo, company site)
}
```

**Validation Rules**:
- `id` must be unique within parent section
- `title` must be non-empty string
- `dateRange` should follow consistent format when provided
- `url` must be valid URL when provided

### PageContent
**Purpose**: Represents content for each page in the site
```typescript
interface PageContent {
  id: string;           // Page identifier ('home', 'blog')
  title: string;        // Page title for <title> tag
  metaDescription: string; // SEO meta description
  heading: string;      // Main page heading (h1)
  content: string | ProfileSection[]; // Page content
  lastUpdated: Date;    // Content modification timestamp
}
```

**Validation Rules**:
- `id` must match route path
- `title` and `metaDescription` required for SEO
- `heading` must be non-empty for accessibility
- `lastUpdated` automatically set on content changes

## Relationships

```
NavigationItem → PageContent (via href/id matching)
PageContent → ProfileSection[] (for home page)
ProfileSection → ProfileItem[] (for structured sections)
```

## Data Sources

### Static Data (MVP)
- Navigation items: Hardcoded constants in Navigation component (no API, no database)
- Profile content: TypeScript constants in data files
- Page metadata: Static configuration

### Future Database Schema (prepared for Prisma)
*Note: Navigation intentionally excluded - remains static forever*

```prisma
model ProfileSection {
  id        String        @id
  title     String
  content   String?
  isVisible Boolean       @default(true)
  order     Int
  items     ProfileItem[]
}

model ProfileItem {
  id          String         @id @default(cuid())
  title       String
  description String?
  organization String?
  dateRange   String?
  tags        String[]
  url         String?
  sectionId   String
  section     ProfileSection @relation(fields: [sectionId], references: [id])
  order       Int
}

model PageContent {
  id              String   @id
  title           String
  metaDescription String
  heading         String
  content         String?
  lastUpdated     DateTime @updatedAt
}
```

## Access Patterns

### Read Operations
- Access static navigation items (hardcoded constants - no data layer)
- Retrieve profile sections for home page (filter by isVisible)
- Get page content by route ID
- Load profile items ordered by section and item order

### Write Operations (Future)
- Update profile section visibility
- Modify profile item details
- Reorder sections and items
- Update page metadata
- **Note**: Navigation structure is immutable - no write operations

## Performance Considerations

- Static data eliminates database queries for MVP
- Profile sections loaded once per page view
- Images optimized through Next.js Image component
- Component-level data fetching prevents over-fetching

## Validation Strategy

- TypeScript interfaces provide compile-time validation
- Runtime validation using Zod schemas (future enhancement)
- Required field validation at component level
- URL validation for external links