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