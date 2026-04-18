import { useResumeStore } from '../store/resumeStore';

function formatMonth(value) {
  if (!value || value === 'Present') return value;
  const [year, month] = value.split('-');
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function getEducationMeta(entry) {
  switch (entry.type) {
    case 'High School':
      return [entry.board, entry.passingYear, entry.grade].filter(Boolean).join(' · ');
    case 'Higher Secondary (12th)':
      return [entry.board, entry.stream, entry.passingYear, entry.grade].filter(Boolean).join(' · ');
    case 'Diploma':
      return [entry.specialization, entry.duration, entry.passingYear].filter(Boolean).join(' · ');
    case 'Graduation':
    case 'Post Graduation':
      return [
        entry.degree,
        entry.university,
        [entry.startYear, entry.endYear].filter(Boolean).join('–'),
      ].filter(Boolean).join(' · ');
    case 'Other / Certification':
      return [entry.title, entry.passingYear].filter(Boolean).join(' · ');
    default:
      return '';
  }
}

const HEADING = 'font-bold text-sm uppercase tracking-wide border-b-2 border-gray-800 pb-1 mb-3';

export function ResumePreview() {
  const { personalInfo, summary, workExperience, education, skills } = useResumeStore();

  const { fullName, jobTitle, email, phone, location, linkedin } = personalInfo;

  const textItems = [email, phone, location].filter(Boolean);
  const hasContact = textItems.length > 0 || Boolean(linkedin);

  const hasWork      = workExperience.length > 0;
  const hasEducation = education.length > 0;
  const hasSkills    = skills.length > 0;
  const hasSummary   = summary.text.trim().length > 0;

  return (
    <div
      id="resume-preview"
      className="max-w-2xl mx-auto p-8 bg-white text-black text-sm shadow-sm border border-gray-100"
      style={{ fontFamily: 'Inter, system-ui, Arial, sans-serif' }}
    >
      {/* Header */}
      <div className="mb-4">
        {fullName && (
          <h1 className="text-3xl font-bold leading-tight tracking-tight font-serif">{fullName}</h1>
        )}
        {jobTitle && (
          <p className="text-gray-500 text-sm font-normal mt-1">{jobTitle}</p>
        )}

        {hasContact && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-gray-500">
            {textItems.map((item, i) => (
              <span key={i} className="flex items-center gap-x-3">
                {item}
                {(i < textItems.length - 1 || linkedin) && (
                  <span className="select-none text-gray-300">&nbsp;·</span>
                )}
              </span>
            ))}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}

        <hr className="border-gray-200 mt-3" />
      </div>

      {/* Professional Summary */}
      {hasSummary && (
        <div className="mb-8">
          <h2 className={HEADING}>Professional Summary</h2>
          <p className="leading-relaxed text-gray-800">{summary.text}</p>
        </div>
      )}

      {/* Work Experience */}
      {hasWork && (
        <div className="mb-8">
          <h2 className={HEADING}>Work Experience</h2>
          <div className="flex flex-col gap-6">
            {workExperience.map((entry) => {
              const start = formatMonth(entry.startDate);
              const end   = formatMonth(entry.endDate);
              const range = [start, end].filter(Boolean).join(' – ');
              return (
                <div key={entry.id}>
                  <div className="flex justify-between items-baseline">
                    <span>
                      {entry.company && (
                        <span className="text-base font-bold">{entry.company}</span>
                      )}
                      {entry.company && entry.role && (
                        <span className="mx-1 text-gray-300">—</span>
                      )}
                      {entry.role && (
                        <em className="italic text-gray-700">{entry.role}</em>
                      )}
                    </span>
                    {range && (
                      <span className="text-gray-500 text-xs shrink-0 ml-4 text-right">{range}</span>
                    )}
                  </div>
                  {entry.description && (
                    <p className="mt-2 text-gray-800 leading-relaxed">{entry.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Education */}
      {hasEducation && (
        <div className="mb-8">
          <h2 className={HEADING}>Education</h2>
          <div className="flex flex-col gap-3">
            {education.map((entry) => {
              const meta = getEducationMeta(entry);
              return (
                <div key={entry.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">{entry.institution || entry.type}</span>
                    {entry.type && (
                      <span className="text-gray-500 text-sm ml-4">{entry.type}</span>
                    )}
                  </div>
                  {meta && <p className="text-gray-600 mt-0.5">{meta}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div className="mb-8">
          <h2 className={HEADING}>Skills</h2>
          <p>
            <span className="font-semibold">Skills: </span>
            <span className="text-gray-600">{skills.map((s) => s.name).join(', ')}</span>
          </p>
        </div>
      )}
    </div>
  );
}
