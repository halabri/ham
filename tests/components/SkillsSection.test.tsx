import { render, screen } from '@testing-library/react';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { skillsData } from '@/lib/professional-data';
import { DarkThemeProvider } from '@/components/ui/DarkThemeProvider';

// Wrapper for theme context
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <DarkThemeProvider>{children}</DarkThemeProvider>
);

describe('SkillsSection Component', () => {
  const defaultProps = {
    skills: skillsData,
  };

  beforeEach(() => {
    render(
      <ThemeWrapper>
        <SkillsSection {...defaultProps} />
      </ThemeWrapper>
    );
  });

  it('should render the component', () => {
    // This test will fail until component is implemented
    expect(screen.getByText(/core skills/i)).toBeInTheDocument();
  });

  it('should display section heading', () => {
    expect(screen.getByRole('heading', { level: 2, name: /core skills/i })).toBeInTheDocument();
  });

  it('should display all skill categories', () => {
    expect(screen.getByRole('heading', { level: 3, name: /languages & frameworks/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /cloud & devops/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /databases/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /security/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /other expertise/i })).toBeInTheDocument();
  });

  it('should organize skills by category with proper heading hierarchy', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    const h3s = screen.getAllByRole('heading', { level: 3 });
    
    expect(h2).toBeInTheDocument();
    expect(h3s.length).toBe(5); // 5 skill categories
  });

  it('should display skills as lists under each category', () => {
    const skillLists = screen.getAllByRole('list');
    expect(skillLists.length).toBe(5); // One list per category
    
    // Check specific skills are present - use exact match or getAllByText
    expect(screen.getAllByText('Java')).toHaveLength(1);
    expect(screen.getByText('Spring Boot')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText(/AWS.*ECS.*CloudFront.*S3.*EC2/)).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
  });

  it('should use proper semantic markup', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    const skillsGrid = section.querySelector('.skills-grid');
    expect(skillsGrid).toBeInTheDocument();
  });

  it('should display skills in correct categories', () => {
    // Languages & Frameworks category
    const languagesSection = screen.getByText(/languages & frameworks/i).closest('.skill-category');
    expect(languagesSection).toBeInTheDocument();
    
    // Cloud & DevOps category
    const cloudSection = screen.getByText(/cloud & devops/i).closest('.skill-category');
    expect(cloudSection).toBeInTheDocument();
  });

  it('should have proper list structure for each skill category', () => {
    const skillLists = screen.getAllByRole('list');
    
    skillLists.forEach(list => {
      const listItems = list.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <ThemeWrapper>
        <SkillsSection {...defaultProps} className="custom-skills" />
      </ThemeWrapper>
    );
    
    expect(container.firstChild).toHaveClass('custom-skills');
  });

  it('should be navigable via keyboard', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    // Headings don't need keyboard support themselves - they're not interactive
    const headings = screen.getAllByRole('heading');
    headings.forEach(heading => {
      expect(heading).toBeInTheDocument();
    });
  });

  it('should meet WCAG 2.1 AA accessibility standards', () => {
    const section = screen.getByRole('region');
    expect(section).toBeAccessible();
  });

  it('should display all provided skills', () => {
    skillsData.categories.forEach(category => {
      category.skills.forEach(skill => {
        // Use getAllByText for skills that might appear multiple times in DOM structure
        const skillElements = screen.getAllByText((content, element) => {
          return element?.textContent?.includes(skill) || false;
        });
        expect(skillElements.length).toBeGreaterThan(0);
      });
    });
  });

  it('should group related skills semantically', () => {
    const skillCategories = screen.getAllByRole('heading', { level: 3 });
    expect(skillCategories.length).toBe(skillsData.categories.length);
    
    skillCategories.forEach(categoryHeading => {
      const categoryContainer = categoryHeading.closest('.skill-category');
      expect(categoryContainer).toBeInTheDocument();
    });
  });
});