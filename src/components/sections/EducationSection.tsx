import React from 'react';
import { EducationSectionProps } from '@/types/professional';
import { GlowEffect } from '@/components/ui/GlowEffect';

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  className = '',
}) => {
  const formatDateRange = (startDate: Date, endDate: Date): string => {
    const start = startDate.getFullYear();
    const end = endDate.getFullYear();
    return `${start} - ${end}`;
  };

  return (
    <section className={`education-section ${className} py-6`} role="region">
      <div className="max-w-4xl mx-auto px-6">
        <GlowEffect>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Education
          </h2>
        </GlowEffect>

        <div className="space-y-6">
          {education.degrees.map((degree, index) => (
            <div key={index} className="education-item bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {degree.degree} - {degree.field}
              </h3>
              <p className="text-gray-300 mb-2">
                {degree.institution}
              </p>
              <p className="text-gray-400 text-sm">
                {formatDateRange(degree.startDate, degree.endDate)}
                {degree.honors && (
                  <span className="ml-2 inline-block bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">
                    {degree.honors}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};