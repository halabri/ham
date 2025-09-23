import { Navigation } from '@/components/ui/Navigation';
import { ParticleBackground } from '@/components/ui';
import { 
  ProfileHeader,
  ProfessionalSummary,
  SkillsSection,
  ExperienceSection,
  EducationSection
} from '@/components/sections';
import { professionalProfile } from '@/lib/professional-data';
import './globals.css';

export default function HomePage() {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Particle background layer */}
        <ParticleBackground 
          density="medium" 
          animationSpeed="medium" 
          className="background-layer"
          data-testid="particle-background"
        />
        
        {/* Content layer */}
        <div className="content-layer">
          <Navigation currentPath="/" />
          <main className="pt-16">
            {/* Professional Header Section */}
            <div className="professional-content py-6">
              <ProfileHeader 
                personalInfo={professionalProfile.personalInfo}
                contact={professionalProfile.contact}
              />
            </div>

            {/* Professional Content Sections */}
            <div className="space-y-0">
              <ProfessionalSummary summary={professionalProfile.professionalSummary} />
              <SkillsSection skills={professionalProfile.skills} />
              <ExperienceSection experiences={professionalProfile.experience} />
              <EducationSection education={professionalProfile.education} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}