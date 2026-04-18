import { useState } from 'react';
import { ResumePreview } from './preview/ResumePreview';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { SummaryForm } from './components/SummaryForm';
import { WorkExperienceForm } from './components/WorkExperienceForm';
import { EducationForm } from './components/EducationForm';
import { SkillsForm } from './components/SkillsForm';
import { ATSScorePanel } from './components/ATSScorePanel';
import { exportPDF } from './utils/exportPDF';

export default function App() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    await exportPDF();
    setExporting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Resume Builder</h1>
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {exporting ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <section className="overflow-y-auto max-h-[calc(100vh-100px)] rounded-lg border border-gray-200 bg-white p-4 sm:p-6 flex flex-col gap-8">
            <PersonalInfoForm />
            <SummaryForm />
            <WorkExperienceForm />
            <EducationForm />
            <SkillsForm />
            <ATSScorePanel />
          </section>

          <section className="overflow-y-auto max-h-[calc(100vh-100px)] rounded-lg border border-gray-200 bg-white">
            <ResumePreview />
          </section>
        </div>
      </main>
    </div>
  );
}
