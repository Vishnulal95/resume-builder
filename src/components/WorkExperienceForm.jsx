import { useResumeStore } from '../store/resumeStore';

const CURRENT_MONTH = new Date().toISOString().slice(0, 7);

export function WorkExperienceForm() {
  const workExperience = useResumeStore((state) => state.workExperience);
  const addWorkExperience = useResumeStore((state) => state.addWorkExperience);
  const updateWorkExperience = useResumeStore((state) => state.updateWorkExperience);
  const removeWorkExperience = useResumeStore((state) => state.removeWorkExperience);

  const handleCurrentJob = (id, checked) => {
    updateWorkExperience(id, 'endDate', checked ? 'Present' : '');
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>

      {workExperience.map((entry) => {
        const isCurrent = entry.endDate === 'Present';
        return (
        <div key={entry.id} className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="flex flex-col gap-1">
            <label htmlFor={`company-${entry.id}`} className="text-sm font-medium text-gray-700">Company</label>
            <input
              id={`company-${entry.id}`}
              type="text"
              value={entry.company}
              maxLength={100}
              onChange={(e) => updateWorkExperience(entry.id, 'company', e.target.value)}
              placeholder="Company name"
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={`role-${entry.id}`} className="text-sm font-medium text-gray-700">Role</label>
            <input
              id={`role-${entry.id}`}
              type="text"
              value={entry.role}
              maxLength={100}
              onChange={(e) => updateWorkExperience(entry.id, 'role', e.target.value)}
              placeholder="Job title"
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor={`startDate-${entry.id}`} className="text-sm font-medium text-gray-700">Start Date</label>
              <input
                id={`startDate-${entry.id}`}
                type="month"
                value={entry.startDate}
                max={CURRENT_MONTH}
                onChange={(e) => updateWorkExperience(entry.id, 'startDate', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor={`endDate-${entry.id}`} className="text-sm font-medium text-gray-700">End Date</label>
              <input
                id={`endDate-${entry.id}`}
                type="month"
                value={isCurrent ? '' : entry.endDate}
                min={entry.startDate || undefined}
                max={CURRENT_MONTH}
                disabled={isCurrent}
                onChange={(e) => updateWorkExperience(entry.id, 'endDate', e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              />
              <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => handleCurrentJob(entry.id, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-gray-600">Currently working here</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor={`desc-${entry.id}`} className="text-sm font-medium text-gray-700">
              Description
              <span className={`ml-2 text-xs font-normal ${entry.description.length > 600 ? 'text-amber-600' : 'text-gray-400'}`}>
                {entry.description.length} / 700
              </span>
            </label>
            <textarea
              id={`desc-${entry.id}`}
              value={entry.description}
              onChange={(e) => updateWorkExperience(entry.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements"
              rows={4}
              maxLength={700}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-y"
            />
          </div>

          <button
            type="button"
            onClick={() => removeWorkExperience(entry.id)}
            className="self-end text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Remove
          </button>
        </div>
        );
      })}

      <button
        type="button"
        onClick={addWorkExperience}
        className="self-start px-4 py-2 text-sm font-medium text-blue-700 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
      >
        Add Experience
      </button>
    </div>
  );
}
