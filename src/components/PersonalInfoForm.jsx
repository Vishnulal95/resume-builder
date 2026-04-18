import { useResumeStore } from '../store/resumeStore';

const fields = [
  { label: 'Full Name',    key: 'fullName',  type: 'text',  autoComplete: 'name',               maxLength: 80 },
  { label: 'Job Title',    key: 'jobTitle',  type: 'text',  autoComplete: 'organization-title', maxLength: 100 },
  { label: 'Email',        key: 'email',     type: 'email', autoComplete: 'email',              maxLength: 120 },
  { label: 'Phone',        key: 'phone',     type: 'tel',   autoComplete: 'tel',                maxLength: 15 },
  { label: 'Location',     key: 'location',  type: 'text',  autoComplete: 'address-level2',     maxLength: 100 },
  { label: 'LinkedIn URL', key: 'linkedin',  type: 'url',   autoComplete: 'url',                maxLength: 200 },
];

function sanitizePhone(value) {
  return value.replace(/[^\d+\-\s()]/g, '');
}

export function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.personalInfo);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);

  const handleChange = (key, value) => {
    updatePersonalInfo(key, key === 'phone' ? sanitizePhone(value) : value);
  };

  return (
    <section>
      <h2 className="mb-4 text-base font-semibold text-gray-900">Personal Information</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map(({ label, key, type, autoComplete, maxLength }) => (
          <div key={key} className={key === 'linkedin' ? 'sm:col-span-2' : ''}>
            <label htmlFor={key} className="mb-1 block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              id={key}
              type={type}
              autoComplete={autoComplete}
              maxLength={maxLength}
              inputMode={key === 'phone' ? 'tel' : undefined}
              value={personalInfo[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
