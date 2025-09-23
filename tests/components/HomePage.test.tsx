import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the main welcome heading', () => {
    render(<HomePage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to My Portfolio');
  });

  it('renders navigation component', () => {
    render(<HomePage />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders at least one profile section', () => {
    render(<HomePage />);
    
    // Should render the bio section which is visible by default
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<HomePage />);
    
    // Should have a main landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    // Should have navigation landmark
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('highlights home navigation as active', () => {
    render(<HomePage />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-blue-600', 'font-semibold');
  });
});