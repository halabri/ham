import { render, screen } from '@testing-library/react';
import { EducationSection } from '@/components/sections/EducationSection';
import { educationData } from '@/lib/professional-data';
import { DarkThemeProvider } from '@/components/ui/DarkThemeProvider';

// Wrapper for theme context
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <DarkThemeProvider>{children}</DarkThemeProvider>
);

describe('EducationSection Component', () => {
  const defaultProps = {
    education: educationData,
  };

  beforeEach(() => {
    render(
      <ThemeWrapper>
        <EducationSection {...defaultProps} />
      </ThemeWrapper>
    );
  });

  it('should render the component', () => {
    // This test will fail until component is implemented
    expect(screen.getByText(/education/i)).toBeInTheDocument();
  });

  it('should display section heading', () => {
    expect(screen.getByRole('heading', { level: 2, name: /education/i })).toBeInTheDocument();
  });

  it('should show degree and field of study', () => {
    expect(screen.getByText(/bachelor of engineering.*honours/i)).toBeInTheDocument();
    expect(screen.getByText(/computer systems/i)).toBeInTheDocument();
  });

  it('should display institution name', () => {
    expect(screen.getByText(/la trobe university/i)).toBeInTheDocument();
  });

  it('should show education dates', () => {
    // Should show the date range
    expect(screen.getByText(/2008/)).toBeInTheDocument();
    expect(screen.getByText(/2012/)).toBeInTheDocument();
  });

  it('should handle honors designation when present', () => {
    // Use getAllByText to handle multiple instances of "honours"
    const honoursElements = screen.getAllByText(/honours/i);
    expect(honoursElements.length).toBeGreaterThan(0);
    expect(honoursElements[0]).toBeInTheDocument();
  });

  it('should use proper semantic structure', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('should structure education item properly', () => {
    const educationItem = screen.getByRole('region').querySelector('.education-item');
    expect(educationItem).toBeInTheDocument();
    
    const degreeHeading = screen.getByRole('heading', { level: 3 });
    expect(degreeHeading).toBeInTheDocument();
  });

  it('should display degree information concisely', () => {
    const degreeHeading = screen.getByRole('heading', { level: 3 });
    expect(degreeHeading).toHaveTextContent(/bachelor of engineering.*computer systems/i);
  });

  it('should show institution and date information', () => {
    // Institution and dates should be in a paragraph
    const institutionText = screen.getByText(/la trobe university/i);
    expect(institutionText.tagName).toBe('P');
    
    // Check that dates are displayed
    expect(screen.getByText(/2008.*2012/)).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <ThemeWrapper>
        <EducationSection {...defaultProps} className="custom-education" />
      </ThemeWrapper>
    );
    
    expect(container.firstChild).toHaveClass('custom-education');
  });

  it('should be concise but informative', () => {
    const section = screen.getByRole('region');
    const text = section.textContent;
    
    // Should contain key information
    expect(text).toMatch(/bachelor/i);
    expect(text).toMatch(/engineering/i);
    expect(text).toMatch(/computer systems/i);
    expect(text).toMatch(/la trobe/i);
    expect(text).toMatch(/honours/i);
    
    // But not be overly verbose
    expect(text?.length || 0).toBeLessThan(500);
  });

  it('should meet WCAG 2.1 AA accessibility standards', () => {
    const section = screen.getByRole('region');
    expect(section).toBeAccessible();
  });

  it('should handle multiple degrees if provided', () => {
    const multiDegreeEducation = {
      degrees: [
        ...educationData.degrees,
        {
          degree: "Master of Computer Science",
          field: "Software Engineering",
          institution: "Example University",
          startDate: new Date(2013, 1, 1),
          endDate: new Date(2015, 11, 31),
        }
      ]
    };

    render(
      <ThemeWrapper>
        <EducationSection education={multiDegreeEducation} />
      </ThemeWrapper>
    );

    // Use getAllByText for multiple degree instances
    const bachelorElements = screen.getAllByText(/bachelor of engineering/i);
    expect(bachelorElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/master of computer science/i)).toBeInTheDocument();
  });

  it('should display all provided education degrees', () => {
    educationData.degrees.forEach((degree, index) => {
      // Use getAllByText for text that appears in multiple elements and take the first
      const degreeElements = screen.getAllByText((content, element) => {
        return element?.textContent?.toLowerCase().includes(degree.degree.toLowerCase()) || false;
      });
      expect(degreeElements.length).toBeGreaterThan(0);
      
      const fieldElements = screen.getAllByText((content, element) => {
        return element?.textContent?.toLowerCase().includes(degree.field.toLowerCase()) || false;
      });
      expect(fieldElements.length).toBeGreaterThan(0);
      
      expect(screen.getByText(new RegExp(degree.institution, 'i'))).toBeInTheDocument();
    });
  });
});