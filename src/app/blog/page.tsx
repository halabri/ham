import { Navigation } from '@/components/ui/Navigation';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPath="/blog" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Coming Soon
          </h1>
          
          <div className="text-center text-gray-600">
            <p className="text-lg mb-4">
              I&apos;m working on exciting blog content about web development, 
              technology insights, and project experiences.
            </p>
            <p>
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}