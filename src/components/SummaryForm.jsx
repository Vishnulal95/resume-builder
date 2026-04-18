import { useResumeStore } from '../store/resumeStore';

const MAX_CHARS = 500;
const WARN_THRESHOLD = 400;

export function SummaryForm() {
  const text = useResumeStore((state) => state.summary.text);
  const updateSummary = useResumeStore((state) => state.updateSummary);

  const count = text.length;
  const isOverWarn = count > WARN_THRESHOLD;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800">Professional Summary</h2>

      <div className="flex flex-col gap-1">
        <textarea
          value={text}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write a brief summary of your professional background and goals"
          rows={4}
          maxLength={MAX_CHARS}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-y"
        />
        <span className={`text-xs self-end ${isOverWarn ? 'text-amber-600 font-medium' : 'text-gray-500'}`}>
          {count} / {MAX_CHARS}
        </span>
      </div>
    </div>
  );
}
