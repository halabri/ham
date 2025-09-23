import { ProfileSection as ProfileSectionType, ProfileItem } from '@/types';

interface ProfileSectionProps {
  section: ProfileSectionType;
}

export function ProfileSection({ section }: ProfileSectionProps) {
  if (!section.isVisible) return null;

  const headingId = `section-${section.id}`;

  return (
    <section className="mb-12" aria-labelledby={headingId}>
      <h2 id={headingId} className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
      {typeof section.content === 'string' ? (
        <p className="text-gray-700 leading-relaxed">{section.content}</p>
      ) : (
        <div className="grid gap-6">
          {section.content.map((item: ProfileItem) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              {item.organization && (
                <p className="text-blue-700 font-medium mb-1">{item.organization}</p>
              )}
              {item.dateRange && (
                <p className="text-gray-600 text-sm mb-3">{item.dateRange}</p>
              )}
              {item.description && (
                <p className="text-gray-800 mt-2 leading-relaxed">{item.description}</p>
              )}
              {item.tags && (
                <div className="flex flex-wrap gap-2 mt-3" role="list" aria-label={`Skills for ${item.title}`}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-900 text-sm rounded-full font-medium"
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}