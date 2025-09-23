import { render, screen } from '@testing-library/react';
import { ProfessionalSummary } from '@/components/sections/ProfessionalSummary';
import { professionalSummary } from '@/lib/professional-data';
import { DarkThemeProvider } from '@/components/ui/DarkThemeProvider';

// Wrapper for theme context
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <DarkThemeProvider>{children}</DarkThemeProvider>
);

describe('ProfessionalSummary Component', () => {
  const defaultProps = {
    summary: professionalSummary,
  };

  beforeEach(() => {
    render(
      <ThemeWrapper>
        <ProfessionalSummary {...defaultProps} />
      </ThemeWrapper>
    );
  });

  it('should render the component', () => {
    // This test will fail until component is implemented
    expect(screen.getByText(/professional summary/i)).toBeInTheDocument();
  });

  it('should display section heading', () => {
    expect(screen.getByRole('heading', { level: 2, name: /professional summary/i })).toBeInTheDocument();
  });

  it('should display years of experience prominently', () => {
    // Use getAllByText to handle multiple instances
    const yearElements = screen.getAllByText(/12\+?\s*years?/i);
    expect(yearElements.length).toBeGreaterThan(0);
    expect(yearElements[0]).toBeInTheDocument();
  });

  it('should show main overview text', () => {
    expect(screen.getByText(/experienced software engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/enterprise applications/i)).toBeInTheDocument();
  });



  it('should use semantic HTML structure', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    
    // The component doesn't have a list, just text and headings
    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <ThemeWrapper>
        <ProfessionalSummary {...defaultProps} className="custom-summary" />
      </ThemeWrapper>
    );
    
    expect(container.firstChild).toHaveClass('custom-summary');
  });

  it('should have proper text content structure', () => {
    // Overview paragraph should exist
    const overviewText = screen.getByText(/experienced software engineer/i);
    expect(overviewText.tagName).toBe('P');
    
    // Experience section should have heading and content
    const experienceHeading = screen.getByText('Experience');
    expect(experienceHeading).toBeInTheDocument();
  });

  it('should meet WCAG 2.1 AA accessibility standards', () => {
    const section = screen.getByRole('region');
    expect(section).toBeAccessible();
  });

  it('should display overview and experience prominently', () => {
    // Check for overview text
    expect(screen.getByText(/experienced software engineer/i)).toBeInTheDocument();
    
    // Use getAllByText for years that appear multiple times
    const yearElements = screen.getAllByText(/12\+?\s*years/i);
    expect(yearElements.length).toBeGreaterThan(0);
  });
});