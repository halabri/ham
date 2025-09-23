import React from 'react';
import { ExperienceSectionProps } from '@/types/professional';
import { GlowEffect } from '@/components/ui/GlowEffect';

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  className = '',
}) => {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: Date, endDate: Date | null): string => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  return (
    <section className={`experience-section ${className} py-6`} role="region">
      <div className="max-w-4xl mx-auto px-6">
        <GlowEffect>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Professional Experience
          </h2>
        </GlowEffect>

        <div className="experience-timeline space-y-8">
          {experiences.map((experience) => (
            <article key={experience.id} className="experience-item bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {experience.position} at {experience.company}
                  </h3>
                  <time className="text-gray-400 text-sm">
                    {formatDateRange(experience.startDate, experience.endDate)}
                  </time>
                </div>
                {!experience.endDate && (
                  <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mt-2 md:mt-0">
                    Current
                  </span>
                )}
              </div>

              {experience.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Key Achievements</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="text-gray-300 flex items-start">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.projects.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Key Projects</h4>
                  <ul className="space-y-3">
                    {experience.projects.map((project, projectIndex) => (
                      <li key={projectIndex} className="text-gray-300">
                        <div className="font-medium text-white">{project.name}</div>
                        <div className="text-sm text-gray-400 mt-1">{project.description}</div>
                        {project.impact && <div className="text-sm text-blue-400 mt-1">{project.impact}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {experience.technologies.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};