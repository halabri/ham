// Professional Portfolio Data Types

export interface PersonalInformation {
  fullName: string;            // "Hisham Alabri"
  title: string;               // "Senior Software Engineer"
  tagline: string;             // "Java - Spring Boot - React"
  location?: string;           // Optional location information
}

export interface ProfessionalSummary {
  overview: string;            // Main career description
  yearsExperience: number;     // 12+ years
}

export interface SkillCategory {
  name: string;                // "Languages & Frameworks"
  skills: string[];            // ["Java", "Spring Boot", "React"]
  priority: number;            // Display order (1-5)
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface ProjectDetail {
  name: string;                // "Digital Front Door"
  description: string;         // Brief project description
  impact?: string;             // Deployment/usage information
}

export interface WorkExperience {
  id: string;                  // Unique identifier
  company: string;             // "Five Faces"
  position: string;            // "Principal Software Engineer"
  startDate: Date;             // Jan 2020
  endDate: Date | null;        // Aug 2025 or null for current
  achievements: string[];      // Key accomplishments
  projects: ProjectDetail[];   // Associated projects
  technologies: string[];      // Tech stack used
}

export interface EducationDegree {
  degree: string;              // "Bachelor of Engineering (Honours)"
  field: string;               // "Computer Systems"
  institution: string;        // "La Trobe University"
  startDate: Date;             // Mar 2008
  endDate: Date;               // Nov 2012
  honors?: string;             // Optional honors designation
}

export interface EducationData {
  degrees: EducationDegree[];
}

export interface ContactInformation {
  email: string;              // "ham314@outlook.com"
  github: string;             // "https://github.com/halabri"
  website?: string;           // Optional personal website
}

export interface ProfessionalProfile {
  personalInfo: PersonalInformation;
  professionalSummary: ProfessionalSummary;
  skills: SkillsData;
  experience: WorkExperience[];
  education: EducationData;
  contact: ContactInformation;
}

// Component Props Interfaces

export interface ProfileHeaderProps {
  personalInfo: PersonalInformation;
  contact: ContactInformation;
  className?: string;
}

export interface ProfessionalSummaryProps {
  summary: ProfessionalSummary;
  className?: string;
}

export interface SkillsSectionProps {
  skills: SkillsData;
  className?: string;
}

export interface ExperienceSectionProps {
  experiences: WorkExperience[];
  className?: string;
}

export interface EducationSectionProps {
  education: EducationData;
  className?: string;
}

// Display Data Transformations

export interface ExperienceDisplayItem {
  company: string;
  position: string;
  duration: string;           // "Jan 2020 - Aug 2025"
  projects: string[];         // Project names only
  isCurrentRole: boolean;
}

export interface SkillsDisplayData {
  [categoryName: string]: {
    skills: string[];
    priority: number;
  };
}