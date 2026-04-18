import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';

const ACTION_VERBS = [
  'managed', 'built', 'led', 'developed', 'designed', 'created',
  'implemented', 'improved', 'increased', 'reduced', 'delivered',
  'launched', 'collaborated', 'achieved', 'coordinated', 'established', 'generated',
];
const VERB_RE = new RegExp(`\\b(${ACTION_VERBS.join('|')})\\b`, 'i');

function calcPersonalInfo(pi, summaryText) {
  const fields = [pi.fullName, pi.jobTitle, pi.email, pi.phone, pi.location, pi.linkedin, summaryText];
  const filled = fields.filter(Boolean).length;
  return Math.min(filled * 2 + (filled === 7 ? 6 : 0), 20);
}

function calcWork(entries) {
  const n = entries.length;
  if (n === 0) return 0;
  if (n === 1) return 10;
  if (n === 2) return 18;
  return 25;
}

function calcEducation(entries) {
  return entries.some((e) => e.institution && e.type) ? 15 : 0;
}

function calcSkills(skills) {
  const n = skills.length;
  if (n === 0) return 0;
  if (n <= 3) return 5;
  if (n <= 6) return 10;
  return 15;
}

function calcVerbs(entries) {
  return Math.min(entries.filter((e) => VERB_RE.test(e.description)).length * 5, 25);
}

function scoreColor(score) {
  if (score >= 80) return { bar: 'bg-green-500', text: 'text-green-600' };
  if (score >= 50) return { bar: 'bg-amber-400', text: 'text-amber-600' };
  return { bar: 'bg-red-500', text: 'text-red-600' };
}

export function ATSScorePanel() {
  const [showTips, setShowTips] = useState(true);
  const { personalInfo, summary, workExperience, education, skills } = useResumeStore();

  const piScore    = calcPersonalInfo(personalInfo, summary.text);
  const workScore  = calcWork(workExperience);
  const eduScore   = calcEducation(education);
  const skillScore = calcSkills(skills);
  const verbScore  = calcVerbs(workExperience);
  const total      = piScore + workScore + eduScore + skillScore + verbScore;

  const { bar, text } = scoreColor(total);

  const criteria = [
    {
      label: 'Personal Info & Summary',
      earned: piScore,
      max: 20,
      tip: 'Fill in all contact fields and add a Professional Summary.',
    },
    {
      label: 'Work Experience',
      earned: workScore,
      max: 25,
      tip: 'Add at least one work experience entry.',
    },
    {
      label: 'Education',
      earned: eduScore,
      max: 15,
      tip: 'Add an education entry with institution and education type.',
    },
    {
      label: 'Skills',
      earned: skillScore,
      max: 15,
      tip: 'Add 7 or more skills for full points.',
    },
    {
      label: 'Action Verbs in Descriptions',
      earned: verbScore,
      max: 25,
      tip: `Start descriptions with verbs like "managed", "developed", or "delivered".`,
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">ATS Score</h2>
        <button
          type="button"
          onClick={() => setShowTips((v) => !v)}
          className="text-xs text-blue-600 hover:underline"
        >
          {showTips ? 'Hide tips' : 'Show tips'}
        </button>
      </div>

      {/* Score display */}
      <div className="flex items-end gap-2">
        <span className={`text-5xl font-bold leading-none ${text}`}>{total}</span>
        <span className="text-lg text-gray-400 mb-1">/ 100</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${bar}`}
          style={{ width: `${total}%` }}
        />
      </div>

      {/* Criteria breakdown */}
      <div className="flex flex-col gap-2 mt-1">
        {criteria.map(({ label, earned, max, tip }) => (
          <div key={label}>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">{label}</span>
              <span className={`font-medium tabular-nums ${earned === 0 ? 'text-red-500' : earned === max ? 'text-green-600' : 'text-amber-600'}`}>
                {earned} / {max}
              </span>
            </div>
            {showTips && earned === 0 && (
              <p className="text-xs text-gray-400 mt-0.5">{tip}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
