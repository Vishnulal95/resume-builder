export const exportPDF = async () => {
  const element = document.getElementById('resume-preview');

  const options = {
    margin: 10,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    },
  };

  const html2pdf = (await import('html2pdf.js')).default;
  return html2pdf().from(element).set(options).save();
};
