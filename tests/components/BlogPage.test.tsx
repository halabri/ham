import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPage from '@/app/blog/page';

describe('BlogPage', () => {
  it('renders the coming soon heading', () => {
    render(<BlogPage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Coming Soon');
  });

  it('renders navigation component', () => {
    render(<BlogPage />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('highlights blog navigation as active', () => {
    render(<BlogPage />);
    
    const blogLink = screen.getByText('Blog');
    expect(blogLink).toHaveClass('text-blue-600', 'font-semibold');
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).not.toHaveClass('text-blue-600', 'font-semibold');
  });

  it('has proper semantic structure', () => {
    render(<BlogPage />);
    
    // Should have a main landmark
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    
    // Should have navigation landmark
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('centers the coming soon message', () => {
    render(<BlogPage />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-center');
  });
});