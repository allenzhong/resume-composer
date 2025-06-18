import { useResume } from '../hooks/useResume';
import { CheckCircle } from 'lucide-react';

const templates = [
  {
    key: 'classic',
    name: 'Classic Vertical',
    description: 'Personal info at top, experiences in the middle, education/skills/certificates at the bottom.',
    skeleton: (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
        <rect x="10" y="8" width="100" height="14" rx="3" fill="#e5e7eb" />
        <rect x="10" y="28" width="100" height="18" rx="3" fill="#c7d2fe" />
        <rect x="10" y="52" width="100" height="8" rx="3" fill="#a7f3d0" />
        <rect x="10" y="64" width="100" height="8" rx="3" fill="#fcd34d" />
      </svg>
    ),
  },
  {
    key: 'sidebar-left',
    name: 'Sidebar Left',
    description: 'Personal info at top, sidebar (left) for education/skills/certificates, main area for experiences.',
    skeleton: (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
        <rect x="10" y="8" width="100" height="10" rx="3" fill="#e5e7eb" />
        <rect x="10" y="22" width="24" height="48" rx="3" fill="#a7f3d0" />
        <rect x="38" y="22" width="72" height="48" rx="3" fill="#c7d2fe" />
      </svg>
    ),
  },
  {
    key: 'sidebar-right',
    name: 'Sidebar Right',
    description: 'Personal info at top, sidebar (right) for education/skills/certificates, main area for experiences.',
    skeleton: (
      <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
        <rect x="10" y="8" width="100" height="10" rx="3" fill="#e5e7eb" />
        <rect x="86" y="22" width="24" height="48" rx="3" fill="#a7f3d0" />
        <rect x="10" y="22" width="72" height="48" rx="3" fill="#c7d2fe" />
      </svg>
    ),
  },
];

export default function Templates() {
  const { template, setTemplate } = useResume();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Choose a Resume Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map(tpl => (
          <label
            key={tpl.key}
            className={`card cursor-pointer transition-all border-2 ${template === tpl.key ? 'border-primary ring-2 ring-primary' : 'border-base-200'} bg-base-100 shadow-md hover:shadow-xl`}
          >
            <div className="card-body items-center">
              <div className="mb-4">{tpl.skeleton}</div>
              <h2 className="card-title mb-2">{tpl.name}</h2>
              <p className="text-sm text-gray-500 mb-4 text-center">{tpl.description}</p>
              <input
                type="radio"
                name="template"
                className="radio radio-primary"
                checked={template === tpl.key}
                onChange={() => setTemplate(tpl.key)}
              />
              {template === tpl.key && (
                <CheckCircle className="w-6 h-6 text-primary mt-2" />
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
} 