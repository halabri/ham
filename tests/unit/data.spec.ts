import { getProfileSections } from '@/lib/data';

describe('getProfileSections', () => {
  it('should return only visible sections', () => {
    const sections = getProfileSections();
    
    // Should only return visible sections
    expect(sections.length).toBeGreaterThan(0);
    
    // All returned sections should be visible
    sections.forEach(section => {
      expect(section.isVisible).toBe(true);
    });
  });

  it('should filter out sections with empty content and isVisible false', () => {
    const sections = getProfileSections();
    
    // Should not include sections that are marked as not visible
    const invisibleSections = sections.filter(section => !section.isVisible);
    expect(invisibleSections).toHaveLength(0);
  });

  it('should include bio section by default', () => {
    const sections = getProfileSections();
    
    const bioSection = sections.find(section => section.id === 'bio');
    expect(bioSection).toBeDefined();
    expect(bioSection?.title).toBe('About');
    expect(bioSection?.isVisible).toBe(true);
  });

  it('should order sections correctly', () => {
    const sections = getProfileSections();
    
    for (let i = 1; i < sections.length; i++) {
      expect(sections[i].order).toBeGreaterThan(sections[i - 1].order);
    }
  });
});