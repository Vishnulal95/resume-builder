# Resume Builder — Claude Code Instructions

## Project Stack
- React 18 + Vite
- Tailwind CSS (utility classes only, no custom CSS files)
- Zustand for state management
- html2pdf.js for PDF export
- React Router DOM for navigation

## Code Rules

### General
- Use functional components only, no class components
- Use named exports, not default exports (except App.jsx)
- Always use async/await, never .then() chains
- No console.log statements in final code — use comments instead
- All components must be under 150 lines; split if larger

### File Structure
- Forms go in src/components/
- Preview components go in src/preview/
- State/store goes in src/store/
- Helper functions go in src/utils/
- Never put logic inside App.jsx — keep it layout only

### Styling
- Tailwind CSS classes only
- No inline styles unless absolutely necessary
- No external UI libraries (no MUI, no Ant Design, no Chakra)
- Mobile responsive by default — use Tailwind responsive prefixes

### State Management
- All resume data lives in Zustand store only
- No useState for resume data — only for local UI state (open/close, hover etc.)
- Never pass resume data as props more than 1 level deep

## ATS Compliance Rules (Critical)
- Resume preview must be single-column layout only
- No CSS tables, no multi-column layouts in the preview
- No images, icons, or SVGs inside the resume preview
- Section headings must use exact standard names:
  - "Work Experience" (not "Experience" or "Employment")
  - "Education"
  - "Skills"
  - "Professional Summary" (not "About Me")
  - "Certifications" (if added)
- All text in preview must be selectable (no canvas rendering)
- Font must be system font or embedded web font (Arial, Calibri, or Inter)

## PDF Export Rules
- Must use html2pdf.js with html2canvas — never use window.print()
- PDF must have selectable text (letterRendering: true)
- Never export as image/canvas-only
- A4 format, 10mm margins

## What NOT to Do
- Do not install any new npm packages without asking first
- Do not modify CLAUDE.md
- Do not create files outside the src/ folder (except config files)
- Do not use any AI/LLM API calls inside the app
- Do not add authentication or backend — this is a frontend-only app
- Do not use localStorage for anything except auto-save of form data
- Do not generate placeholder/lorem ipsum content in components
