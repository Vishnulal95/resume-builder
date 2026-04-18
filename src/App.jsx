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
  const [activeTab, setActiveTab] = useState('form');

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

        {/* Mobile tab switcher — hidden on lg+ */}
        <div className="flex lg:hidden border-t border-gray-200">
          {['form', 'preview'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'form' ? 'Edit' : 'Preview'}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">

          <section
            className={`overflow-y-auto max-h-[calc(100vh-148px)] lg:max-h-[calc(100vh-100px)] rounded-lg border border-gray-200 bg-white p-4 sm:p-6 flex flex-col gap-8 lg:flex ${
              activeTab === 'form' ? 'flex' : 'hidden'
            }`}
          >
            <PersonalInfoForm />
            <SummaryForm />
            <WorkExperienceForm />
            <EducationForm />
            <SkillsForm />
            <ATSScorePanel />
          </section>

          <section
            className={`overflow-y-auto max-h-[calc(100vh-148px)] lg:max-h-[calc(100vh-100px)] rounded-lg border border-gray-200 bg-white lg:block ${
              activeTab === 'preview' ? 'block' : 'hidden'
            }`}
          >
            <ResumePreview />
          </section>

        </div>
      </main>
    </div>
  );
}
