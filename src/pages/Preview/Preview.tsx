import { useResume } from '../../hooks/useResume';
import { Download, Printer, Eye, EyeOff } from 'lucide-react';
import { useState, useRef } from 'react';
import NotificationModal from '../../components/NotificationModal';
import Header from './components/Header';
import PersonalStatement from './components/PersonalStatement';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import SidebarSkills from './components/SidebarSkills';
import SidebarEducation from './components/SidebarEducation';
import './preview-markdown.css';

// Simple markdown renderer for basic formatting
const renderMarkdown = (text: string) => {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  let inList = false;

  lines.forEach((line) => {
    // Handle bullet points
    if (line.trim().startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      const content = line.trim().substring(2)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      html += `<li>${content}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      // Handle bold and italic for non-list lines
      const formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      if (formatted.trim() !== '') {
        html += formatted + '<br />';
      }
    }
  });
  if (inList) html += '</ul>';
  return html;
};

const Preview = () => {
  const { resumeData, template } = useResume();
  const [showContactDetails, setShowContactDetails] = useState(true);
  const [showPrintTip, setShowPrintTip] = useState(false);
  const { personalInfo, experience, education, skills } = resumeData;
  
  // Ref for the resume content to be printed
  const resumeRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  const handlePrintClick = () => {
    setShowPrintTip(true);
  };

  const handleConfirmPrint = () => {
    setShowPrintTip(false);
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    alert('PDF download functionality will be implemented soon!');
  };

  // Layouts
  const renderClassic = () => (
    <div>
      <Header personalInfo={personalInfo} showContactDetails={showContactDetails} />
      <PersonalStatement personalStatement={personalInfo.personalStatement} renderMarkdown={renderMarkdown} />
      <Experience experience={experience} formatDate={formatDate} renderMarkdown={renderMarkdown} />
      <Education education={education} formatDate={formatDate} renderMarkdown={renderMarkdown} />
      <Skills skills={skills} renderMarkdown={renderMarkdown} />
    </div>
  );

  // Sidebar Left layout
  const renderSidebarLeft = () => (
    <div>
      <Header personalInfo={personalInfo} showContactDetails={showContactDetails} />
      <PersonalStatement personalStatement={personalInfo.personalStatement} renderMarkdown={renderMarkdown} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 w-full">
          <SidebarSkills skills={skills} />
          <SidebarEducation education={education} />
        </div>
        <div className="md:w-2/3 w-full">
          <Experience experience={experience} formatDate={formatDate} renderMarkdown={renderMarkdown} />
        </div>
      </div>
    </div>
  );

  // Sidebar Right layout
  const renderSidebarRight = () => (
    <div>
      <Header personalInfo={personalInfo} showContactDetails={showContactDetails} />
      <PersonalStatement personalStatement={personalInfo.personalStatement} renderMarkdown={renderMarkdown} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 w-full">
          <Experience experience={experience} formatDate={formatDate} renderMarkdown={renderMarkdown} />
        </div>
        <div className="md:w-1/3 w-full">
          <SidebarSkills skills={skills} />
          <SidebarEducation education={education} />
        </div>
      </div>
    </div>
  );

  let content;
  switch (template) {
    case 'sidebar-left':
      content = renderSidebarLeft();
      break;
    case 'sidebar-right':
      content = renderSidebarRight();
      break;
    case 'classic':
    default:
      content = renderClassic();
      break;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Preview Controls */}
      <div className="preview-controls mb-6 flex flex-wrap gap-4 items-center justify-between bg-base-200 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Resume Preview</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowContactDetails(!showContactDetails)}
              className="btn btn-sm btn-outline"
            >
              {showContactDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showContactDetails ? 'Hide' : 'Show'} Contact Details
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrintClick} className="btn btn-primary btn-outline btn-sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button onClick={handleDownload} className="btn btn-primary btn-sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <NotificationModal
        isOpen={showPrintTip}
        onClose={() => setShowPrintTip(false)}
        title="Print Tip"
        message={"For a clean resume, please disable 'Headers and footers' in your browser's print dialog before printing or saving as PDF. This will remove the date, title, URL, and page numbers from your printout."}
        icon={<Printer className="w-8 h-8 text-primary" />}
        showCloseButton={true}
      >
        <div className="flex gap-2 justify-end mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={handleConfirmPrint}
          >
            Continue to Print
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowPrintTip(false)}
          >
            Cancel
          </button>
        </div>
      </NotificationModal>

      {/* Resume Content */}
      <div ref={resumeRef} className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
        <div className="p-8 print:p-6">
          {content}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:p-6 {
            padding: 0 !important;
          }
          /* Prevent extra blank page in Chrome */
          html, body {
            height: auto !important;
            overflow: visible !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          /* Hide navigation bar when printing */
          .navbar {
            display: none !important;
          }
          /* Hide preview controls when printing */
          .preview-controls {
            display: none !important;
          }
          /* Hide all preview-related elements in print */
          .preview-controls,
          .preview-controls *,
          [class*="preview-controls"] {
            display: none !important;
          }
          /* Hide specific preview elements */
          .btn,
          button[class*="btn"] {
            display: none !important;
          }
          /* Hide the entire preview controls section */
          div[class*="preview-controls"] {
            display: none !important;
          }
          /* Ensure resume takes full page with custom margins */
          body {
            margin: 0.06in 0.08in 0.08in 0.04in !important;
            padding: 0 !important;
            min-height: auto !important;
          }
          /* Remove container max-width for print but preserve layout */
          .max-w-4xl, .max-w-6xl, .container {
            max-width: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          /* Remove outer padding but preserve inner layout */
          .p-6, .px-4, .py-6 {
            padding: 0 !important;
          }
          /* Keep inner padding for content spacing */
          .p-8 {
            padding: 1.5rem !important;
          }
          /* Remove background colors for clean printing */
          .bg-gradient-to-br {
            background: white !important;
          }
          .bg-base-200 {
            background: white !important;
          }
          /* Preserve flexbox layouts for templates */
          .flex {
            display: flex !important;
          }
          .flex-col {
            flex-direction: column !important;
          }
          .md\\:flex-row {
            flex-direction: row !important;
          }
          .gap-8 {
            gap: 2rem !important;
          }
          /* Preserve width classes for sidebar layouts - make more explicit for print */
          .md\\:w-1\\/3 {
            width: 24% !important;
            flex: 0 0 24% !important;
          }
          .md\\:w-2\\/3 {
            width: 76% !important;
            flex: 0 0 76% !important;
          }
          .w-full {
            width: 100% !important;
          }
          /* Force sidebar layout in print regardless of screen size */
          .flex.flex-col.md\\:flex-row {
            flex-direction: row !important;
          }
          /* Prevent page breaks within resume sections */
          .bg-white {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          /* Ensure resume content doesn't overflow */
          .bg-white > div {
            max-height: none !important;
            overflow: visible !important;
          }
          /* Ensure text is readable and properly sized */
          .text-3xl {
            font-size: 1.75rem !important;
          }
          .text-xl {
            font-size: 1.25rem !important;
          }
          .text-lg {
            font-size: 1.125rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Preview; 