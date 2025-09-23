import React from 'react';
import { SkillsSectionProps } from '@/types/professional';
import { GlowEffect } from '@/components/ui/GlowEffect';

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  className = '',
}) => {
  const sortedCategories = skills.categories.sort((a, b) => a.priority - b.priority);

  return (
    <section className={`skills-section ${className} py-6`} role="region">
      <div className="max-w-6xl mx-auto px-6">
        <GlowEffect>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Core Skills
          </h2>
        </GlowEffect>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCategories.map((category, index) => (
            <div key={index} className="skill-category bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};