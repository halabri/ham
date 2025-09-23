import React from 'react';
import { ProfileHeaderProps } from '@/types/professional';
import { GlowEffect } from '@/components/ui/GlowEffect';

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  personalInfo,
  contact,
  className = '',
}) => {
  return (
    <section className={`profile-header professional-header ${className}`} role="banner">
      <div className="professional-content content-layer text-center space-y-6">
        <div className="space-y-2">
          <GlowEffect>
            <h1 className="professional-heading-xl">
              {personalInfo.fullName}
            </h1>
          </GlowEffect>
          <h2 className="professional-heading-md text-gray-300">
            {personalInfo.title}
          </h2>
          <p className="professional-text-lg text-gray-400 font-mono">
            {personalInfo.tagline}
          </p>
        </div>

        <nav role="navigation" aria-label="Contact information" className="contact-methods mt-8">
          <a
            href={`mailto:${contact.email}`}
            className="contact-link bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
            aria-label={`Email ${contact.email}`}
          >
            {contact.email}
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
        </nav>
      </div>
    </section>
  );
};