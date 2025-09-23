import React from 'react';
import { ProfessionalSummaryProps } from '@/types/professional';
import { GlowEffect } from '@/components/ui/GlowEffect';

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({
  summary,
  className = '',
}) => {
  return (
    <section className={`professional-summary ${className} py-6`} role="region">
      <div className="max-w-4xl mx-auto px-6">
        <GlowEffect>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Professional Summary
          </h2>
        </GlowEffect>
        
        <div className="space-y-6">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
            {summary.overview}
          </p>
          
          <div className="grid">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">Experience</h3>
              <p className="text-2xl font-bold text-blue-400">{summary.yearsExperience}+ Years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};