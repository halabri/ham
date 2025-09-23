# API Contracts: Portfolio Website

**Feature**: 001-setup-the-project  
**Date**: September 23, 2025  
**Status**: Complete

## Static Content Interfaces

For the initial static portfolio implementation, the following contracts define the data interfaces that components expect. Navigation is statically hardcoded with no API layer, while profile content uses interfaces that serve as the foundation for future API endpoints if dynamic content management is added.

### Navigation Structure (Static)

**Interface**: Hardcoded navigation items in component
```typescript
// Static navigation structure - no API needed
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
  },
];

interface NavigationItem {
  id: string;           // 'home' | 'blog' - fixed values
  label: string;        // Display text - fixed values
  href: string;         // Route path - fixed values
  isActive?: boolean;   // Current page indicator - computed at runtime
}
```

**Implementation Note**: Navigation items are statically defined in the Navigation component. No API endpoints, no database storage, no dynamic updates possible. The `isActive` property is computed based on the current route.

### Profile Content Contract

**Interface**: `getProfileContent()`
```typescript
// Returns profile data for home page
interface ProfileResponse {
  sections: ProfileSection[];
}

interface ProfileSection {
  id: 'bio' | 'skills' | 'experience' | 'education' | 'projects';
  title: string;
  content: string | ProfileItem[];
  isVisible: boolean;
  order: number;
}

interface ProfileItem {
  id: string;
  title: string;
  description?: string;
  organization?: string;
  dateRange?: string;
  tags?: string[];
  url?: string;
}
```

**Example Response**:
```json
{
  "sections": [
    {
      "id": "bio",
      "title": "About",
      "content": "Portfolio owner's professional bio text...",
      "isVisible": true,
      "order": 1
    },
    {
      "id": "skills",
      "title": "Skills",
      "content": [
        {
          "id": "skill-1",
          "title": "TypeScript",
          "description": "Full-stack development",
          "tags": ["frontend", "backend"]
        }
      ],
      "isVisible": true,
      "order": 2
    }
  ]
}
```

### Page Content Contract

**Interface**: `getPageContent(pageId: string)`
```typescript
// Returns page-specific content and metadata
interface PageContentResponse {
  id: string;
  title: string;        // For <title> tag
  metaDescription: string;
  heading: string;      // Main h1
  content: string;
}
```

**Example Response (Blog page)**:
```json
{
  "id": "blog",
  "title": "Blog - Portfolio",
  "metaDescription": "Blog section of the portfolio website",
  "heading": "Blog",
  "content": "Coming soon"
}
```

## Error Handling Contracts

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}
```

### Common Error Codes
- `PAGE_NOT_FOUND`: Requested page content doesn't exist
- `SECTION_NOT_VISIBLE`: Profile section is hidden (empty content)
- `INVALID_PAGE_ID`: Page identifier not recognized

## Future API Endpoints

*These endpoints are prepared for when dynamic content management is needed:*

### GET /api/profile
Returns profile sections with content

### GET /api/pages/{pageId}
Returns page content by ID

### POST /api/profile/sections/{sectionId}
Updates profile section (future admin feature)

**Note**: Navigation endpoints are intentionally excluded. Navigation structure is static and hardcoded - no API layer needed or desired.

## Contract Tests

Each contract will have corresponding test files:
- `navigation.test.ts` - Validates static navigation data structure and component behavior
- `profile.test.ts` - Validates profile content structure  
- `page-content.test.ts` - Validates page content structure

Tests verify:
- Navigation: Static items render correctly, active state computed properly
- Profile/Page Content: Required fields are present, data types match interface definitions
- Validation rules are enforced
- Error responses follow standard format (for future API endpoints)

## Performance Contracts

- Navigation: Zero network overhead (static, hardcoded)
- Profile content: < 10KB total for all sections
- Page content: < 2KB per page
- Response time: < 100ms for static content (profile/page APIs)