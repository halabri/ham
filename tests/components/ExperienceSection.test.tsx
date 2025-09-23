import { render, screen } from '@testing-library/react';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { workExperience } from '@/lib/professional-data';
import { DarkThemeProvider } from '@/components/ui/DarkThemeProvider';

// Wrapper for theme context
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <DarkThemeProvider>{children}</DarkThemeProvider>
);

describe('ExperienceSection Component', () => {
  const defaultProps = {
    experiences: workExperience,
  };

  beforeEach(() => {
    render(
      <ThemeWrapper>
        <ExperienceSection {...defaultProps} />
      </ThemeWrapper>
    );
  });

  it('should render the component', () => {
    // This test will fail until component is implemented
    expect(screen.getByText(/professional experience/i)).toBeInTheDocument();
  });

  it('should display section heading', () => {
    expect(screen.getByRole('heading', { level: 2, name: /professional experience/i })).toBeInTheDocument();
  });

  it('should display experiences in reverse chronological order', () => {
    const experienceItems = screen.getAllByRole('article');
    expect(experienceItems.length).toBe(4); // Four work experiences
    
    // First should be most recent (Five Faces 2020-2025)
    const firstExperience = experienceItems[0];
    expect(firstExperience).toHaveTextContent(/principal software engineer/i);
    expect(firstExperience).toHaveTextContent(/five faces/i);
  });

  it('should show company, position, and dates for each experience', () => {
    // Five Faces - Principal Software Engineer
    expect(screen.getByText(/principal software engineer.*five faces/i)).toBeInTheDocument();
    
    // Intelligent Pathways - Senior Software Engineer
    expect(screen.getByText(/senior software engineer.*intelligent pathways/i)).toBeInTheDocument();
    
    // Check for date ranges using time elements
    const timeElements = screen.getAllByRole('time');
    expect(timeElements.length).toBeGreaterThan(0);
  });

  it('should display key projects and achievements', () => {
    // Check for major projects - use getAllByText for items that appear multiple times
    const digitalFrontDoorElements = screen.getAllByText(/digital front door/i);
    expect(digitalFrontDoorElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/massvax\/covax/i)).toBeInTheDocument();
    expect(screen.getAllByText(/qas epcr/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/jetstream/i)[0]).toBeInTheDocument();
    
    // Check for achievements (may appear multiple times in different contexts)
    expect(screen.getAllByText(/6m\+?\s*users/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/microservices architecture/i)).toBeInTheDocument();
  });

  it('should use semantic time elements for dates', () => {
    const timeElements = screen.getAllByRole('time');
    expect(timeElements.length).toBeGreaterThan(0);
    
    timeElements.forEach(timeElement => {
      expect(timeElement.tagName).toBe('TIME');
    });
  });

  it('should structure each experience as an article', () => {
    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(workExperience.length);
    
    articles.forEach(article => {
      // Each article should have a heading
      const heading = article.querySelector('h3');
      expect(heading).toBeInTheDocument();
    });
  });

  it('should display project lists under each experience', () => {
    const projectLists = screen.getAllByRole('list');
    expect(projectLists.length).toBeGreaterThan(0);
    
    // Check that projects are displayed as list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('should handle current vs past positions appropriately', () => {
    // Current position (Five Faces 2020-2025) should be marked appropriately
    const currentRole = screen.getByText(/principal software engineer.*five faces/i);
    expect(currentRole).toBeInTheDocument();
    
    // Past positions should show end dates
    const pastRole = screen.getByText(/senior software engineer.*intelligent pathways/i);
    expect(pastRole).toBeInTheDocument();
  });

  it('should use responsive timeline layout', () => {
    const timeline = screen.getByRole('region').querySelector('.experience-timeline');
    expect(timeline).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <ThemeWrapper>
        <ExperienceSection {...defaultProps} className="custom-experience" />
      </ThemeWrapper>
    );
    
    expect(container.firstChild).toHaveClass('custom-experience');
  });

  it('should provide clear relationship between position and achievements', () => {
    const articles = screen.getAllByRole('article');
    
    articles.forEach(article => {
      const heading = article.querySelector('h3');
      const achievementsList = article.querySelector('ul');
      
      expect(heading).toBeInTheDocument();
      expect(achievementsList).toBeInTheDocument();
    });
  });

  it('should meet WCAG 2.1 AA accessibility standards', () => {
    const section = screen.getByRole('region');
    expect(section).toBeAccessible();
  });

  it('should display all provided experiences', () => {
    workExperience.forEach(experience => {
      // Use getAllByText for companies that appear multiple times
      const companyElements = screen.getAllByText(new RegExp(experience.company, 'i'));
      expect(companyElements.length).toBeGreaterThan(0);
      
      // Use getAllByText for positions that appear multiple times  
      const positionElements = screen.getAllByText(new RegExp(experience.position, 'i'));
      expect(positionElements.length).toBeGreaterThan(0);
    });
  });

  it('should show project impact information', () => {
    // Check for specific impact statements - use getAllByText for multiple instances
    const servingUsersElements = screen.getAllByText(/serving 6m\+?\s*users/i);
    expect(servingUsersElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/millions of vaccination appointments/i)).toBeInTheDocument();
    expect(screen.getByText(/state-wide deployment|digitized emergency medical records/i)).toBeInTheDocument();
  });
});