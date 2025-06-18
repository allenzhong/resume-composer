import { useResume } from '../hooks/useResume';
import { Download, FileText, User, Briefcase, GraduationCap, Zap } from 'lucide-react';
import { useState } from 'react';
import NotificationModal from '../components/NotificationModal';

const Dashboard = () => {
  const { loadMockData } = useResume();
  const [showNotification, setShowNotification] = useState(false);

  const handleLoadMockData = () => {
    loadMockData();
    setShowNotification(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Resume Composer Dashboard</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to your professional resume builder! Use the tabs above to navigate between different sections and create a comprehensive resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-primary">
              <FileText className="w-6 h-6" />
              Quick Start
            </h2>
            <p className="text-gray-600">
              Get started quickly by loading sample resume data to see how the app works.
            </p>
            <div className="card-actions justify-end">
              <button 
                onClick={handleLoadMockData}
                className="btn btn-primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Load Sample Resume
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-secondary">
              <User className="w-6 h-6" />
              Resume Sections
            </h2>
            <p className="text-gray-600">
              Your resume is organized into these key sections for easy editing.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body text-center">
            <User className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Personal Info</h3>
            <p className="text-sm text-gray-600">Contact details, address, and professional summary</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body text-center">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <h3 className="font-semibold">Experience</h3>
            <p className="text-sm text-gray-600">Work history with detailed responsibilities</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body text-center">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-accent" />
            <h3 className="font-semibold">Education</h3>
            <p className="text-sm text-gray-600">Academic background and certifications</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-warning" />
            <h3 className="font-semibold">Skills</h3>
            <p className="text-sm text-gray-600">Technical skills, languages, and certifications</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-base-200 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• <strong>Markdown Support:</strong> Use markdown formatting in descriptions for rich text output</li>
          <li>• <strong>Responsive Design:</strong> Works perfectly on desktop, tablet, and mobile devices</li>
          <li>• <strong>Real-time Preview:</strong> See your changes instantly as you type</li>
          <li>• <strong>Professional Templates:</strong> Clean, modern design that looks great on any resume</li>
          <li>• <strong>Easy Navigation:</strong> Tab-based interface for quick section switching</li>
        </ul>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        title="Sample Resume Loaded!"
        message="The sample resume data has been loaded successfully. Navigate to any section using the tabs above to see the filled data and start customizing your resume."
      />
    </div>
  );
};

export default Dashboard; 