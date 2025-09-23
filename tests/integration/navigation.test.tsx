import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';
import BlogPage from '@/app/blog/page';

describe('Navigation Integration Tests', () => {
  describe('HomePage Navigation', () => {
    it('renders HomePage with navigation and allows navigation to Blog', () => {
      render(<HomePage />);
      
      // Verify HomePage content is present
      expect(screen.getByText('Welcome to My Portfolio')).toBeInTheDocument();
      
      // Verify navigation is present
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      
      // Verify both navigation links are present
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const blogLink = screen.getByRole('link', { name: 'Blog' });
      
      expect(homeLink).toBeInTheDocument();
      expect(blogLink).toBeInTheDocument();
      
      // Verify correct href attributes
      expect(homeLink).toHaveAttribute('href', '/');
      expect(blogLink).toHaveAttribute('href', '/blog');
      
      // Verify Home is marked as active
      expect(homeLink).toHaveAttribute('aria-current', 'page');
      expect(blogLink).not.toHaveAttribute('aria-current');
    });
    
    it('displays profile sections on HomePage', () => {
      render(<HomePage />);
      
      // Look for profile section content - checking the actual title from data
      const bioSection = screen.getByText('About');
      expect(bioSection).toBeInTheDocument();
      
      // Should have at least one visible profile section
      const sections = screen.getAllByRole('region');
      expect(sections.length).toBeGreaterThanOrEqual(1);
      
      // Check that main content area exists
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  describe('BlogPage Navigation', () => {
    it('renders BlogPage with navigation and Coming Soon content', () => {
      render(<BlogPage />);
      
      // Verify BlogPage content is present
      expect(screen.getByText('Coming Soon')).toBeInTheDocument();
      
      // Verify navigation is present
      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      
      // Verify both navigation links are present
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const blogLink = screen.getByRole('link', { name: 'Blog' });
      
      expect(homeLink).toBeInTheDocument();
      expect(blogLink).toBeInTheDocument();
      
      // Verify correct href attributes
      expect(homeLink).toHaveAttribute('href', '/');
      expect(blogLink).toHaveAttribute('href', '/blog');
      
      // Since BlogPage sets currentPath="/blog", Blog should be active
      expect(blogLink).toHaveAttribute('aria-current', 'page');
      expect(homeLink).not.toHaveAttribute('aria-current');
    });
    
    it('displays coming soon message with additional content', () => {
      render(<BlogPage />);
      
      // Main heading
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Coming Soon');
      
      // Additional explanatory text
      expect(screen.getByText(/I'm working on exciting blog content/)).toBeInTheDocument();
      expect(screen.getByText('Stay tuned for updates!')).toBeInTheDocument();
    });
  });

  describe('Cross-Page Consistency', () => {
    it('maintains consistent navigation structure between pages', () => {
      // Test HomePage navigation
      const { unmount } = render(<HomePage />);
      const homeNavigation = screen.getByRole('navigation');
      const homeLinks = screen.getAllByRole('link');
      
      expect(homeLinks).toHaveLength(2);
      expect(homeLinks[0]).toHaveTextContent('Home');
      expect(homeLinks[1]).toHaveTextContent('Blog');
      
      unmount();
      
      // Test BlogPage navigation
      render(<BlogPage />);
      const blogNavigation = screen.getByRole('navigation');
      const blogLinks = screen.getAllByRole('link');
      
      expect(blogLinks).toHaveLength(2);
      expect(blogLinks[0]).toHaveTextContent('Home');
      expect(blogLinks[1]).toHaveTextContent('Blog');
      
      // Navigation structure should be identical
      expect(blogNavigation).toHaveClass('fixed', 'top-0', 'w-full');
    });
    
    it('correctly highlights active page in navigation', () => {
      // HomePage should highlight Home
      const { unmount } = render(<HomePage />);
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const blogLink = screen.getByRole('link', { name: 'Blog' });
      
      expect(homeLink).toHaveClass('text-blue-600', 'font-semibold');
      expect(blogLink).not.toHaveClass('text-blue-600', 'font-semibold');
      
      unmount();
      
      // BlogPage should highlight Blog
      render(<BlogPage />);
      const newHomeLink = screen.getByRole('link', { name: 'Home' });
      const newBlogLink = screen.getByRole('link', { name: 'Blog' });
      
      expect(newBlogLink).toHaveClass('text-blue-600', 'font-semibold');
      expect(newHomeLink).not.toHaveClass('text-blue-600', 'font-semibold');
    });
  });
});