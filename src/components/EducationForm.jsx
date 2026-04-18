import { useResumeStore } from '../store/resumeStore';

const EDUCATION_TYPES = [
  'High School',
  'Higher Secondary (12th)',
  'Diploma',
  'Graduation',
  'Post Graduation',
  'Other / Certification',
];

const FIELDS_BY_TYPE = {
  'High School': [
    { label: 'Institution / School', key: 'institution', inputMode: 'text',    maxLength: 120 },
    { label: 'Board',                key: 'board',       inputMode: 'text',    maxLength: 80  },
    { label: 'Passing Year',         key: 'passingYear', inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
    { label: 'Grade / Percentage',   key: 'grade',       inputMode: 'decimal', maxLength: 10  },
  ],
  'Higher Secondary (12th)': [
    { label: 'Institution / School', key: 'institution', inputMode: 'text',    maxLength: 120 },
    { label: 'Board',                key: 'board',       inputMode: 'text',    maxLength: 80  },
    { label: 'Stream',               key: 'stream',      inputMode: 'text',    maxLength: 60  },
    { label: 'Passing Year',         key: 'passingYear', inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
    { label: 'Grade / Percentage',   key: 'grade',       inputMode: 'decimal', maxLength: 10  },
  ],
  'Diploma': [
    { label: 'Institution',              key: 'institution',   inputMode: 'text',    maxLength: 120 },
    { label: 'Specialization',           key: 'specialization',inputMode: 'text',    maxLength: 100 },
    { label: 'Duration (e.g. 3 years)',  key: 'duration',      inputMode: 'text',    maxLength: 20  },
    { label: 'Passing Year',             key: 'passingYear',   inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
  ],
  'Graduation': [
    { label: 'Institution / College', key: 'institution', inputMode: 'text',    maxLength: 120 },
    { label: 'University',            key: 'university',  inputMode: 'text',    maxLength: 120 },
    { label: 'Degree & Major',        key: 'degree',      inputMode: 'text',    maxLength: 100 },
    { label: 'Start Year',            key: 'startYear',   inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
    { label: 'End Year',              key: 'endYear',     inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
  ],
  'Post Graduation': [
    { label: 'Institution / College',    key: 'institution',   inputMode: 'text',    maxLength: 120 },
    { label: 'University',               key: 'university',    inputMode: 'text',    maxLength: 120 },
    { label: 'Degree & Specialization',  key: 'degree',        inputMode: 'text',    maxLength: 100 },
    { label: 'Start Year',               key: 'startYear',     inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
    { label: 'End Year',                 key: 'endYear',       inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
  ],
  'Other / Certification': [
    { label: 'Institution / Provider', key: 'institution', inputMode: 'text',    maxLength: 120 },
    { label: 'Title / Program',        key: 'title',       inputMode: 'text',    maxLength: 100 },
    { label: 'Year',                   key: 'passingYear', inputMode: 'numeric', type: 'number', min: 1970, max: 2030 },
  ],
};

function EducationEntry({ entry, onUpdate, onRemove }) {
  const fields = FIELDS_BY_TYPE[entry.type] ?? [];

  return (
    <div className="rounded-md border border-gray-200 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <select
          value={entry.type}
          onChange={(e) => onUpdate(entry.id, 'type', e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="">Select education type…</option>
          {EDUCATION_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => onRemove(entry.id)}
          className="text-sm text-red-500 hover:text-red-700 shrink-0"
        >
          Remove
        </button>
      </div>

      {entry.type && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fields.map(({ label, key, inputMode, type = 'text', min, max, maxLength }) => (
            <div key={key}>
              <label htmlFor={`${key}-${entry.id}`} className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={`${key}-${entry.id}`}
                type={type}
                inputMode={inputMode}
                min={min}
                max={max}
                maxLength={maxLength}
                value={entry[key] ?? ''}
                onChange={(e) => onUpdate(entry.id, key, e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EducationForm() {
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold text-gray-900">Education</h2>

      {education.map((entry) => (
        <EducationEntry
          key={entry.id}
          entry={entry}
          onUpdate={updateEducation}
          onRemove={removeEducation}
        />
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="self-start rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        + Add Education
      </button>
    </section>
  );
}
