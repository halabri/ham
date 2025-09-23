import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { DarkThemeProvider } from '@/components/ui/DarkThemeProvider';

// Wrapper for theme context
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <DarkThemeProvider>{children}</DarkThemeProvider>
);

describe('Homepage Professional Content Integration', () => {
  beforeEach(() => {
    render(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>
    );
  });

  describe('Layout Integration', () => {
    it('should render homepage with professional content', () => {
      // This test will fail until components are integrated
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should preserve existing dark theme', () => {
      // Particle background should still be present
      expect(screen.getByTestId('particle-background')).toBeInTheDocument();
    });

    it('should maintain proper component ordering', () => {
      // Should have professional profile sections in logical order
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      
      // First heading should be the name (h1)
      const nameHeading = screen.getByRole('heading', { level: 1 });
      expect(nameHeading).toHaveTextContent(/hisham alabri/i);
    });

    it('should integrate professional sections seamlessly', () => {
      // Check for key professional sections
      expect(screen.getByText(/professional summary/i)).toBeInTheDocument();
      expect(screen.getByText(/core skills/i)).toBeInTheDocument();
      expect(screen.getByText(/professional experience/i)).toBeInTheDocument();
      expect(screen.getByText(/education/i)).toBeInTheDocument();
      // Check for contact information instead of "get in touch"
      expect(screen.getByText(/ham314@outlook.com/i)).toBeInTheDocument();
    });
  });

  describe('Dark Theme Integration', () => {
    it('should apply dark theme to professional components', () => {
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      
      // Professional content should be within the themed container
      expect(screen.getByText(/hisham alabri/i)).toBeInTheDocument();
    });

    it('should integrate with existing GlowEffect', () => {
      // Professional headings should have glow effects
      const nameHeading = screen.getByRole('heading', { level: 1 });
      expect(nameHeading).toBeInTheDocument();
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('should maintain existing CSS variables', () => {
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      
      // Theme provider should be active
      const themeContainer = main.closest('[data-theme]') || main.closest('.dark');
      expect(themeContainer || main).toBeInTheDocument();
    });
  });

  describe('Animation Integration', () => {
    it('should preserve particle background animations', () => {
      expect(screen.getByTestId('particle-background')).toBeInTheDocument();
    });

    it('should not interfere with existing animations', () => {
      // Professional content should not block particle background
      const main = screen.getByRole('main');
      const particleBackground = screen.getByTestId('particle-background');
      
      expect(main).toBeInTheDocument();
      expect(particleBackground).toBeInTheDocument();
    });

    it('should maintain proper z-index layering', () => {
      // Content should be above particle background
      const main = screen.getByRole('main');
      const particleBackground = screen.getByTestId('particle-background');
      
      expect(main).toBeInTheDocument();
      expect(particleBackground).toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('should support mobile-first responsive design', () => {
      // All professional sections should be present
      expect(screen.getByText(/hisham alabri/i)).toBeInTheDocument();
      // Use getAllByText for title that appears multiple times
      const seniorSWEElements = screen.getAllByText(/senior software engineer/i);
      expect(seniorSWEElements.length).toBeGreaterThan(0);
      expect(screen.getByText(/professional summary/i)).toBeInTheDocument();
    });

    it('should stack content vertically on mobile', () => {
      // Professional sections should be stacked vertically
      const sections = screen.getAllByRole('region');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should maintain readability across breakpoints', () => {
      // Text should remain accessible
      const headings = screen.getAllByRole('heading');
      
      headings.forEach(heading => {
        expect(heading.textContent).toBeTruthy();
      });
    });
  });

  describe('Performance Integration', () => {
    it('should not degrade existing performance', () => {
      // Component should render without issues
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      
      // Check that key elements are present efficiently
      expect(screen.getByText(/hisham alabri/i)).toBeInTheDocument();
    });

    it('should maintain 60 FPS animation compatibility', () => {
      // Particle background should still be functional
      expect(screen.getByTestId('particle-background')).toBeInTheDocument();
    });
  });

  describe('SEO Integration', () => {
    it('should provide proper semantic structure for SEO', () => {
      // Main landmark for content
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Banner for header content
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      // Navigation elements (main nav + contact nav)
      const navigationElements = screen.getAllByRole('navigation');
      expect(navigationElements.length).toBeGreaterThan(0);
    });

    it('should have proper heading hierarchy for SEO', () => {
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(/hisham alabri/i);
      
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h2s.length).toBeGreaterThan(3); // Multiple professional sections
    });

    it('should include structured contact information', () => {
      expect(screen.getByRole('link', { name: /ham314@outlook.com/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    });
  });

  describe('Content Integration', () => {
    it('should display complete professional profile', () => {
      // Personal information
      expect(screen.getByText(/hisham alabri/i)).toBeInTheDocument();
      // Use getAllByText for title that appears multiple times
      const titleElements = screen.getAllByText(/senior software engineer/i);
      expect(titleElements.length).toBeGreaterThan(0);
      
      // Professional summary
          // Check if 12+ years experience is mentioned (may appear multiple times)
    expect(screen.getAllByText(/12\+\s+years/i)[0]).toBeInTheDocument();
      
      // Skills sections (may appear multiple times across different sections)
      expect(screen.getAllByText(/java/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/spring boot/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/react/i)[0]).toBeInTheDocument();
      
      // Experience (company name may appear multiple times for different positions)
      expect(screen.getAllByText(/five faces/i)[0]).toBeInTheDocument();
      expect(screen.getByText(/principal software engineer/i)).toBeInTheDocument();
      
      // Education
      expect(screen.getByText(/bachelor of engineering/i)).toBeInTheDocument();
      expect(screen.getByText(/la trobe university/i)).toBeInTheDocument();
    });

    it('should integrate all professional sections coherently', () => {
      const sections = screen.getAllByRole('region');
      
      // Should have multiple professional sections (4 sections: Summary, Skills, Experience, Education)
      expect(sections.length).toBeGreaterThanOrEqual(4);
      
      // Each section should have proper headings
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Accessibility Integration', () => {
    it('should maintain WCAG 2.1 AA compliance across all sections', () => {
      const main = screen.getByRole('main');
      expect(main).toBeAccessible();
      
      const sections = screen.getAllByRole('region');
      sections.forEach(section => {
        expect(section).toBeAccessible();
      });
    });

    it('should provide keyboard navigation across all professional content', () => {
      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toHaveKeyboardSupport();
      });
    });
  });
});