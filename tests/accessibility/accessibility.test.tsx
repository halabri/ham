import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Navigation } from '@/components/ui/Navigation';
import { ProfileSection } from '@/components/sections/ProfileSection';
import type { ProfileSection as ProfileSectionType } from '@/types';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  describe('Navigation Component', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(<Navigation currentPath="/" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have violations with blog page active', async () => {
      const { container } = render(<Navigation currentPath="/blog" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ProfileSection Component', () => {
    const mockStringSection: ProfileSectionType = {
      id: 'bio',
      title: 'About Me',
      content: 'I am a passionate developer focused on creating accessible web experiences.',
      isVisible: true,
      order: 1
    };

    const mockItemSection: ProfileSectionType = {
      id: 'experience',
      title: 'Work Experience',
      content: [
        {
          id: 'exp1',
          title: 'Senior Developer',
          organization: 'Tech Company',
          dateRange: '2022 - Present',
          description: 'Led development of modern web applications.',
          tags: ['React', 'TypeScript', 'Node.js']
        }
      ],
      isVisible: true,
      order: 2
    };

    it('should not have accessibility violations for string content', async () => {
      const { container } = render(<ProfileSection section={mockStringSection} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have accessibility violations for item list content', async () => {
      const { container } = render(<ProfileSection section={mockItemSection} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not render when not visible (no accessibility concerns)', () => {
      const hiddenSection: ProfileSectionType = { ...mockStringSection, isVisible: false };
      const { container } = render(<ProfileSection section={hiddenSection} />);
      expect(container.firstChild).toBeNull();
    });
  });
});