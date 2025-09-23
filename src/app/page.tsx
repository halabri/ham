import { Navigation } from '@/components/ui/Navigation';
import { ProfileSection } from '@/components/sections/ProfileSection';
import { ParticleBackground, GlowEffect } from '@/components/ui';
import { getProfileSections } from '@/lib/data';
import './globals.css';

export default function HomePage() {
  const profileSections = getProfileSections();

  return (
    <>
      <div className="relative min-h-screen">
        {/* Particle background layer */}
        <ParticleBackground 
          density="medium" 
          animationSpeed="medium" 
          className="fixed inset-0"
          data-testid="particle-background"
        />
        
        {/* Content layer */}
        <div className="relative z-10">
          <Navigation currentPath="/" />
          <main className="pt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <header className="mb-12">
                <GlowEffect element="text" intensity="medium">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Welcome to My Portfolio
                  </h1>
                </GlowEffect>
              </header>
              
              {profileSections
                .sort((a, b) => a.order - b.order)
                .map((section) => (
                  <ProfileSection key={section.id} section={section} />
                ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}