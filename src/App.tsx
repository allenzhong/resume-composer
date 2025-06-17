import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TabNavigation from './components/TabNavigation';
import Dashboard from './pages/Dashboard';
import PersonalInfo from './pages/PersonalInfo/PersonalInfo';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Preview from './pages/Preview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
        {/* Header */}
        <div className="navbar bg-base-100/80 backdrop-blur-md shadow-lg border-b border-base-300/50">
          <div className="navbar-start">
            <h1 className="text-2xl font-bold text-primary">Resume Composer</h1>
          </div>
          <div className="navbar-center">
            <TabNavigation />
          </div>
          <div className="navbar-end">
            <button className="btn btn-primary btn-outline">Export Resume</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
