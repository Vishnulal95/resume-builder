import { create } from 'zustand';

const blankPersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  linkedin: '',
  location: '',
  jobTitle: '',
};

const blankWorkExperience = () => ({
  id: crypto.randomUUID(),
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  description: '',
});

const blankEducation = () => ({
  id: crypto.randomUUID(),
  type: '',
  institution: '',
  board: '',
  stream: '',
  specialization: '',
  duration: '',
  degree: '',
  university: '',
  title: '',
  startYear: '',
  endYear: '',
  passingYear: '',
  grade: '',
});

export const useResumeStore = create((set) => ({
  personalInfo: { ...blankPersonalInfo },
  summary: { text: '' },
  workExperience: [],
  education: [],
  skills: [],

  updatePersonalInfo: (field, value) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, [field]: value },
    })),

  updateSummary: (value) =>
    set(() => ({ summary: { text: value } })),

  addWorkExperience: () =>
    set((state) => ({
      workExperience: [...state.workExperience, blankWorkExperience()],
    })),

  updateWorkExperience: (id, field, value) =>
    set((state) => ({
      workExperience: state.workExperience.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    })),

  removeWorkExperience: (id) =>
    set((state) => ({
      workExperience: state.workExperience.filter((entry) => entry.id !== id),
    })),

  addEducation: () =>
    set((state) => ({
      education: [...state.education, blankEducation()],
    })),

  updateEducation: (id, field, value) =>
    set((state) => ({
      education: state.education.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    })),

  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((entry) => entry.id !== id),
    })),

  addSkill: (name) =>
    set((state) => ({
      skills: [...state.skills, { id: crypto.randomUUID(), name }],
    })),

  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== id),
    })),
}));
