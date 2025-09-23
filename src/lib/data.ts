import { ProfileSection } from '@/types';

// Note: Navigation is hardcoded in Navigation component - no data function needed

export function getProfileSections(): ProfileSection[] {
  const sections: ProfileSection[] = [
    {
      id: 'bio' as const,
      title: 'About',
      content: 'Professional bio content will be added here.',
      isVisible: true,
      order: 1,
    },
    {
      id: 'skills' as const,
      title: 'Skills',
      content: [], // Will be populated with actual skills
      isVisible: false, // Hidden until content is added
      order: 2,
    },
    {
      id: 'experience' as const,
      title: 'Experience',
      content: [], // Will be populated with actual experience
      isVisible: false, // Hidden until content is added
      order: 3,
    },
    {
      id: 'education' as const,
      title: 'Education',
      content: [], // Will be populated with actual education
      isVisible: false, // Hidden until content is added
      order: 4,
    },
    {
      id: 'projects' as const,
      title: 'Projects',
      content: [], // Will be populated with actual projects
      isVisible: false, // Hidden until content is added
      order: 5,
    },
  ];
  
  return sections.filter(section => section.isVisible);
}