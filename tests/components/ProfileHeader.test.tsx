import { render, screen } from '@testing-library/react';
import { ProfileHeader } from '@/components/sections/ProfileHeader';
import { personalInfo, contactInformation } from '@/lib/professional-data';
import { DarkThemeProvider } from '@/components/ui/DarkThemeProvider';

// Wrapper for theme context
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <DarkThemeProvider>{children}</DarkThemeProvider>
);

describe('ProfileHeader Component', () => {
  const defaultProps = {
    personalInfo,
    contact: contactInformation,
  };

  beforeEach(() => {
    render(
      <ThemeWrapper>
        <ProfileHeader {...defaultProps} />
      </ThemeWrapper>
    );
  });

  it('should render the component', () => {
    // This test will fail until component is implemented
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should display full name prominently', () => {
    expect(screen.getByRole('heading', { level: 1, name: /hisham alabri/i })).toBeInTheDocument();
  });

  it('should show professional title and tagline', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/senior software engineer/i);
    expect(screen.getByText(/java - spring boot - react/i)).toBeInTheDocument();
  });

  it('should include clickable email link', () => {
    const emailLink = screen.getByRole('link', { name: /ham314@outlook.com/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:ham314@outlook.com');
  });

  it('should include clickable GitHub link', () => {
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/halabri');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have proper heading hierarchy', () => {
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });

  it('should include navigation with proper ARIA labels', () => {
    const contactNav = screen.getByRole('navigation');
    expect(contactNav).toBeInTheDocument();
    expect(contactNav).toHaveAttribute('aria-label', 'Contact information');
  });

  it('should support keyboard navigation for contact links', () => {
    const emailLink = screen.getByRole('link', { name: /ham314@outlook.com/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    
    expect(emailLink).toHaveKeyboardSupport();
    expect(githubLink).toHaveKeyboardSupport();
  });

  it('should have accessible names for all interactive elements', () => {
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAccessibleName();
    });
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <ThemeWrapper>
        <ProfileHeader {...defaultProps} className="custom-class" />
      </ThemeWrapper>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should meet WCAG 2.1 AA accessibility standards', () => {
    const banner = screen.getByRole('banner');
    expect(banner).toBeAccessible();
  });
});