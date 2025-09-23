# Quickstart: Portfolio Website Setup

**Feature**: 001-setup-the-project  
**Date**: September 23, 2025  
**Status**: Ready for Implementation

## Prerequisites

- Node.js 18+ installed
- Git repository initialized
- TypeScript and Next.js knowledge
- Basic understanding of TailwindCSS

## Project Setup

### 1. Initialize Next.js Project
```bash
# Navigate to repository root
cd /Users/ham/projects/halabri/ham

# Initialize Next.js with TypeScript and TailwindCSS
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install additional dependencies
npm install prisma @prisma/client
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### 2. Configure React 19 Compiler
Edit `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
};

module.exports = nextConfig;
```

### 3. Set Up Project Structure
```bash
# Create component directories
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/lib
mkdir -p src/types
mkdir -p tests/components

# Create basic directories for future features
mkdir -p public/images
```

## Core Implementation Steps

### Step 1: Type Definitions
Create `src/types/index.ts`:
```typescript
// Note: NavigationItem types are defined inline in Navigation component (static)

export interface ProfileItem {
  id: string;
  title: string;
  description?: string;
  organization?: string;
  dateRange?: string;
  tags?: string[];
  url?: string;
}

export interface ProfileSection {
  id: 'bio' | 'skills' | 'experience' | 'education' | 'projects';
  title: string;
  content: string | ProfileItem[];
  isVisible: boolean;
  order: number;
}
```

### Step 2: Navigation Component
Create `src/components/ui/Navigation.tsx`:
```typescript
import Link from 'next/link';

// Static navigation structure - hardcoded, no API needed
const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
] as const;

interface NavigationProps {
  currentPath: string;
}

export function Navigation({ currentPath }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium ${
                  currentPath === item.href ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
```

### Step 3: Profile Section Component
Create `src/components/sections/ProfileSection.tsx`:
```typescript
import { ProfileSection as ProfileSectionType, ProfileItem } from '@/types';

interface ProfileSectionProps {
  section: ProfileSectionType;
}

export function ProfileSection({ section }: ProfileSectionProps) {
  if (!section.isVisible) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
      {typeof section.content === 'string' ? (
        <p className="text-gray-700 leading-relaxed">{section.content}</p>
      ) : (
        <div className="grid gap-6">
          {section.content.map((item: ProfileItem) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              {item.organization && (
                <p className="text-blue-600 font-medium">{item.organization}</p>
              )}
              {item.dateRange && (
                <p className="text-gray-500 text-sm">{item.dateRange}</p>
              )}
              {item.description && (
                <p className="text-gray-700 mt-2">{item.description}</p>
              )}
              {item.tags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
```

### Step 4: Home Page Implementation
Create `src/app/page.tsx`:
```typescript
import { Navigation } from '@/components/ui/Navigation';
import { ProfileSection } from '@/components/sections/ProfileSection';
import { getProfileSections } from '@/lib/data';

export default function HomePage() {
  const profileSections = getProfileSections();

  return (
    <>
      <Navigation currentPath="/" />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to My Portfolio
            </h1>
          </header>
          
          {profileSections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <ProfileSection key={section.id} section={section} />
            ))}
        </div>
      </main>
    </>
  );
}
```

### Step 5: Blog Page Implementation
Create `src/app/blog/page.tsx`:
```typescript
import { Navigation } from '@/components/ui/Navigation';

export default function BlogPage() {
  return (
    <>
      <Navigation currentPath="/blog" />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Coming Soon
          </h1>
        </div>
      </main>
    </>
  );
}
```

### Step 6: Data Layer
Create `src/lib/data.ts`:
```typescript
import { ProfileSection } from '@/types';

// Note: Navigation is hardcoded in Navigation component - no data function needed

export function getProfileSections(): ProfileSection[] {
  return [
    {
      id: 'bio',
      title: 'About',
      content: 'Professional bio content will be added here.',
      isVisible: true,
      order: 1,
    },
    {
      id: 'skills',
      title: 'Skills',
      content: [], // Will be populated with actual skills
      isVisible: false, // Hidden until content is added
      order: 2,
    },
    // Additional sections follow same pattern
  ].filter(section => section.isVisible);
}
```

## Testing Setup

### 1. Jest Configuration
Create `jest.config.js`:
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

### 2. Test Example
Create `tests/components/Navigation.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/ui/Navigation';

describe('Navigation', () => {
  it('renders static navigation items', () => {
    render(<Navigation currentPath="/" />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('highlights active page', () => {
    render(<Navigation currentPath="/blog" />);
    
    const blogLink = screen.getByText('Blog');
    expect(blogLink).toHaveClass('text-blue-600', 'font-semibold');
  });
});
```

## Validation Checklist

- [ ] Next.js 15+ with App Router configured
- [ ] React 19 compiler enabled
- [ ] TypeScript strict mode working
- [ ] TailwindCSS styling applied
- [ ] Navigation component functional
- [ ] Home page displays profile sections
- [ ] Blog page shows "Coming soon"
- [ ] Responsive design across breakpoints (320px-4K)
- [ ] No JavaScript required for basic navigation
- [ ] Performance meets Web Core Vitals targets
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Component tests passing

## Development Commands

```bash
# Development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Success Criteria

✅ **Functional Requirements Met**:
- Fixed horizontal navigation on all pages
- Home page with profile sections
- Blog page with "Coming soon" message
- Full functionality without JavaScript
- Responsive design across all screen sizes

✅ **Constitutional Compliance**:
- Component-first architecture
- TypeScript strict mode
- Mobile-first responsive design
- Performance optimization ready
- SEO and accessibility foundation

✅ **Ready for Enhancement**:
- Database integration prepared (Prisma schema ready)
- Component testing framework established
- Performance monitoring capability
- Extensible design for future features