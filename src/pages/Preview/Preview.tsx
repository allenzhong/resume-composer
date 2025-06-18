import { useResume } from '../../hooks/useResume';
import { Download, Printer, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
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

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const handlePrint = () => {
    setShowPrintTip(true);
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
          <button onClick={handlePrint} className="btn btn-primary btn-outline btn-sm">
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
            onClick={() => {
              setShowPrintTip(false);
              setTimeout(() => window.print(), 100);
            }}
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
      <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
        <div className="p-8 print:p-6">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Preview; 