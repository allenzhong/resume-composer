import { useResume } from '../../hooks/useResume';
import { Download, Printer, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import NotificationModal from '../../components/NotificationModal';

// Simple markdown renderer for basic formatting
const renderMarkdown = (text: string) => {
  if (!text) return '';
  
  return text
    .split('\n')
    .map((line) => {
      // Handle bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Handle italic text
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // Handle bullet points
      if (line.trim().startsWith('- ')) {
        line = `<li>${line.trim().substring(2)}</li>`;
      }
      return line;
    })
    .join('<br />');
};

const Preview = () => {
  const { resumeData } = useResume();
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
          {/* Header */}
          <div className="border-b-2 border-gray-300 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                {personalInfo.title && (
                  <p className="text-xl text-gray-600 mb-2">{personalInfo.title}</p>
                )}
                {personalInfo.location && (
                  <p className="text-gray-600">{personalInfo.location}</p>
                )}
              </div>
              {showContactDetails && (
                <div className="text-right text-sm text-gray-600">
                  {personalInfo.email && (
                    <p className="mb-1">{personalInfo.email}</p>
                  )}
                  {personalInfo.phone && (
                    <p className="mb-1">{personalInfo.phone}</p>
                  )}
                  {personalInfo.website && (
                    <p className="mb-1">
                      <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">
                        {personalInfo.website.replace(/^https?:\/\//, '')}
                      </a>
                    </p>
                  )}
                  {(personalInfo.github || personalInfo.linkedin) && (
                    <div className="mt-2">
                      {personalInfo.github && (
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block">
                          GitHub
                        </a>
                      )}
                      {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 hover:underline block">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Personal Statement */}
          {personalInfo.personalStatement && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">
                Professional Summary
              </h2>
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(personalInfo.personalStatement) }}
              />
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && experience[0].jobTitle && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{exp.jobTitle}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <div 
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(exp.description) }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && education[0].degree && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        {edu.location && <p>{edu.location}</p>}
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>
                    {edu.description && (
                      <div 
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(edu.description) }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && skills.some(cat => cat.skills.some(skill => skill.name)) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
                Skills & Certifications
              </h2>
              <div className="space-y-4">
                {skills.map((category) => {
                  const validSkills = category.skills.filter(skill => skill.name);
                  if (validSkills.length === 0) return null;
                  
                  return (
                    <div key={category.id} className="mb-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{category.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {validSkills.map((skill) => (
                          <div key={skill.id} className="mb-3">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-medium text-gray-800">{skill.name}</span>
                              {skill.proficiency && (
                                <span className="text-sm text-gray-600">{skill.proficiency}</span>
                              )}
                            </div>
                            {skill.description && (
                              <div 
                                className="text-sm text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: renderMarkdown(skill.description) }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
          /* Hide navigation bar when printing */
          .navbar {
            display: none !important;
          }
          /* Hide preview controls when printing */
          .preview-controls {
            display: none !important;
          }
          /* Ensure resume takes full page with custom margins */
          body {
            margin: 0.24in 0.08in 0.08in 0.08in !important;
            padding: 0 !important;
          }
          /* Remove all max-width and padding for print */
          .max-w-4xl, .max-w-6xl, .container {
            max-width: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .p-6, .p-8, .px-4, .py-6 {
            padding: 0 !important;
          }
          /* Remove background colors for clean printing */
          .bg-gradient-to-br {
            background: white !important;
          }
          .bg-base-200 {
            background: white !important;
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