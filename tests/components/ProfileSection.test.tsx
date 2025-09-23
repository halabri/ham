import { render, screen } from '@testing-library/react';
import { ProfileSection } from '@/components/sections/ProfileSection';
import { ProfileSection as ProfileSectionType, ProfileItem } from '@/types';

describe('ProfileSection', () => {
  const mockStringSection: ProfileSectionType = {
    id: 'bio',
    title: 'About Me',
    content: 'This is my professional bio.',
    isVisible: true,
    order: 1,
  };

  const mockItemsSection: ProfileSectionType = {
    id: 'skills',
    title: 'Skills',
    content: [
      {
        id: 'skill-1',
        title: 'TypeScript',
        description: 'Full-stack development with TypeScript',
        tags: ['frontend', 'backend'],
      },
      {
        id: 'skill-2',
        title: 'React',
        organization: 'Frontend',
        dateRange: '2020-present',
        url: 'https://react.dev',
      },
    ] as ProfileItem[],
    isVisible: true,
    order: 2,
  };

  const mockInvisibleSection: ProfileSectionType = {
    id: 'education',
    title: 'Education',
    content: '',
    isVisible: false,
    order: 3,
  };

  it('renders section with string content', () => {
    render(<ProfileSection section={mockStringSection} />);
    
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('This is my professional bio.')).toBeInTheDocument();
  });

  it('renders section with item list content', () => {
    render(<ProfileSection section={mockItemsSection} />);
    
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Full-stack development with TypeScript')).toBeInTheDocument();
  });

  it('displays item metadata correctly', () => {
    render(<ProfileSection section={mockItemsSection} />);
    
    // Check organization
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    
    // Check date range
    expect(screen.getByText('2020-present')).toBeInTheDocument();
    
    // Check tags
    expect(screen.getByText('frontend')).toBeInTheDocument();
    expect(screen.getByText('backend')).toBeInTheDocument();
  });

  it('does not render when section is not visible', () => {
    const { container } = render(<ProfileSection section={mockInvisibleSection} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('renders as a semantic section element', () => {
    render(<ProfileSection section={mockStringSection} />);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('renders section title as h2 heading', () => {
    render(<ProfileSection section={mockStringSection} />);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('About Me');
  });

  it('renders item titles as h3 headings', () => {
    render(<ProfileSection section={mockItemsSection} />);
    
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent('TypeScript');
    expect(headings[1]).toHaveTextContent('React');
  });
});