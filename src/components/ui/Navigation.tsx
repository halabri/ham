import Link from 'next/link';

// Static navigation structure - hardcoded, no API needed
const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'blog', label: 'Blog', href: '/blog' },
] as const;

interface NavigationProps {
  currentPath: string;
}

export function Navigation({ currentPath }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  currentPath === item.href ? 'text-blue-600 font-semibold bg-blue-50' : 'hover:bg-gray-50'
                }`}
                aria-current={currentPath === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}