import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the main profile heading', () => {
    render(<HomePage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Ham (Hisham Alabri)');
  });

  it('renders navigation component', () => {
    render(<HomePage />);
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    
    // Check navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders professional summary section', () => {
    render(<HomePage />);
    
    // Should render the professional summary section
    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<HomePage />);
    
    // Should have a main landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    // Should have navigation landmark
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('highlights home navigation as active', () => {
    render(<HomePage />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-blue-600', 'font-semibold');
  });
});