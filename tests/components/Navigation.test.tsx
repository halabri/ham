import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/ui/Navigation';

describe('Navigation', () => {
  it('renders static navigation items', () => {
    render(<Navigation currentPath="/" />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('highlights active page for home', () => {
    render(<Navigation currentPath="/" />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-blue-600', 'font-semibold');
    
    const blogLink = screen.getByText('Blog');
    expect(blogLink).not.toHaveClass('text-blue-600', 'font-semibold');
  });

  it('highlights active page for blog', () => {
    render(<Navigation currentPath="/blog" />);
    
    const blogLink = screen.getByText('Blog');
    expect(blogLink).toHaveClass('text-blue-600', 'font-semibold');
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).not.toHaveClass('text-blue-600', 'font-semibold');
  });

  it('renders as a navigation landmark', () => {
    render(<Navigation currentPath="/" />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('contains proper links with correct hrefs', () => {
    render(<Navigation currentPath="/" />);
    
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const blogLink = screen.getByRole('link', { name: 'Blog' });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(blogLink).toHaveAttribute('href', '/blog');
  });
});