import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';

export function SkillsForm() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const skills = useResumeStore((s) => s.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      setError(`"${trimmed}" is already added.`);
      return;
    }
    addSkill(trimmed);
    setInput('');
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (error) setError('');
  };

  return (
    <section>
      <h2 className="mb-4 text-base font-semibold text-gray-900">Skills</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="e.g. JavaScript"
          maxLength={50}
          className={`flex-1 rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-300 focus:border-blue-500'}`}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Skill
        </button>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {skill.name}
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                aria-label={`Remove ${skill.name}`}
                className="ml-1 text-blue-400 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
