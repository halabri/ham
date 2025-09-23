# Data Model: Portfolio Homepage Content Update

## Professional Profile Entity

### Core Entity: `ProfessionalProfile`
```typescript
interface ProfessionalProfile {
  personalInfo: PersonalInformation;
  professionalSummary: ProfessionalSummary;
  skills: SkillsData;
  experience: WorkExperience[];
  education: EducationData;
  contact: ContactInformation;
}
```

### Personal Information
```typescript
interface PersonalInformation {
  fullName: string;            // "Hisham Alabri"
  title: string;               // "Senior Software Engineer"
  tagline: string;             // "Java - Spring Boot - React"
  location?: string;           // Optional location information
}
```

**Validation Rules**:
- `fullName`: Required, 2-50 characters
- `title`: Required, professional title format
- `tagline`: Required, technology stack summary

### Professional Summary
```typescript
interface ProfessionalSummary {
  overview: string;            // Main career description
  yearsExperience: number;     // 12+ years
}
```

**Validation Rules**:
- `overview`: Required, 100-500 characters
- `yearsExperience`: Positive integer

### Skills Data
```typescript
interface SkillsData {
  categories: SkillCategory[];
}

interface SkillCategory {
  name: string;                // "Languages & Frameworks"
  skills: string[];            // ["Java", "Spring Boot", "React"]
  priority: number;            // Display order (1-5)
}
```

**Validation Rules**:
- `categories`: Minimum 3 categories required
- `skills`: Each category minimum 2 skills
- `priority`: 1-5 range for ordering

**Predefined Categories**:
1. Languages & Frameworks
2. Cloud & DevOps  
3. Databases
4. Security
5. Other Expertise

### Work Experience
```typescript
interface WorkExperience {
  id: string;                  // Unique identifier
  company: string;             // "Five Faces"
  position: string;            // "Principal Software Engineer"
  startDate: Date;             // Jan 2020
  endDate: Date | null;        // Aug 2025 or null for current
  achievements: string[];      // Key accomplishments
  projects: ProjectDetail[];   // Associated projects
  technologies: string[];      // Tech stack used
}

interface ProjectDetail {
  name: string;                // "Digital Front Door"
  description: string;         // Brief project description
  impact?: string;             // Deployment/usage information
}
```

**Validation Rules**:
- `company`: Required, 2-100 characters
- `position`: Required, professional title
- `startDate`: Valid date, not future
- `endDate`: Must be after startDate if provided
- `achievements`: 1-5 achievements per role
- `projects`: 0-10 projects per role

**State Transitions**:
- Current Position: `endDate = null`
- Past Position: `endDate` set to departure date
- Display Order: Most recent first (descending by startDate)

### Education Data
```typescript
interface EducationData {
  degrees: EducationDegree[];
}

interface EducationDegree {
  degree: string;              // "Bachelor of Engineering (Honours)"
  field: string;               // "Computer Systems"
  institution: string;        // "La Trobe University"
  startDate: Date;             // Mar 2008
  endDate: Date;               // Nov 2012
  honors?: string;             // Optional honors designation
}
```

**Validation Rules**:
- `degree`: Required, standard degree format
- `field`: Required, field of study
- `institution`: Required, educational institution
- Date range: `endDate` must be after `startDate`


### Contact Information
```typescript
interface ContactInformation {
  email: string;              // "ham314@outlook.com"
  github: string;             // "https://github.com/halabri"
  website?: string;           // Optional personal website
}
```

**Validation Rules**:
- `email`: Required, valid email format
- `phone`: Required, international format
- `github`: Required, valid GitHub URL
- `website`: Optional, valid URL if provided

## Data Relationships

### Entity Relationships
```
ProfessionalProfile (1) ─── (1) PersonalInformation
                     │
                     ├─── (1) ProfessionalSummary
                     │
                     ├─── (1) SkillsData ─── (*) SkillCategory
                     │
                     ├─── (*) WorkExperience ─── (*) ProjectDetail
                     │
                     ├─── (1) EducationData ─── (*) EducationDegree
                     │
                     └─── (1) ContactInformation
```

### Cross-References
- `WorkExperience.technologies` ∩ `SkillCategory.skills`

## Data Lifecycle

### Data Sources
- **Static Definition**: Professional data defined in TypeScript constants
- **Update Frequency**: Manual updates as career progresses
- **Validation**: TypeScript type checking at build time

### Data Persistence
- **Storage**: TypeScript constants in `src/lib/professional-data.ts`
- **Backup**: Version controlled in Git repository
- **Migration**: Direct code updates with type safety

### Data Access Patterns
- **Read Operations**: Import constants in React components
- **Update Operations**: Developer updates TypeScript file
- **Caching**: Static build-time optimization via Next.js
- **Performance**: O(1) access time, pre-compiled data

## Component Data Interfaces

### Component Props
```typescript
// For ProfileHeader component
interface ProfileHeaderProps {
  personalInfo: PersonalInformation;
  contact: ContactInformation;
  className?: string;
}

// For ExperienceSection component  
interface ExperienceSectionProps {
  experiences: WorkExperience[];
  className?: string;
}

// For SkillsSection component
interface SkillsSectionProps {
  skills: SkillsData;
  className?: string;
}
```

### Display Data Transformations
```typescript
// For experience timeline display
interface ExperienceDisplayItem {
  company: string;
  position: string;
  duration: string;           // "Jan 2020 - Aug 2025"
  projects: string[];         // Project names only
  isCurrentRole: boolean;
}

// For skills grid display
interface SkillsDisplayData {
  [categoryName: string]: {
    skills: string[];
    priority: number;
  };
}
```

## Constraints and Assumptions

### Business Rules
- Professional data must be current and accurate
- Contact information must be publicly appropriate
- Experience must be in reverse chronological order
 - Featured projects limited to 3-5 for homepage display (See spec FR-013)

### Technical Constraints
- Data size must not impact page load performance
- All data must be SSG-compatible (static generation)
- TypeScript interfaces must be exportable for testing
- Data structure must support responsive component layouts

### Accessibility Requirements
- All data must be presentable via semantic HTML
- Contact information must be screen reader accessible
- Experience timeline must support keyboard navigation
- Skills categories must have proper heading hierarchy