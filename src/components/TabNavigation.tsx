import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  Eye 
} from 'lucide-react';

const TabNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/personal-info', label: 'Personal Info', icon: User },
    { path: '/experience', label: 'Experience', icon: Briefcase },
    { path: '/education', label: 'Education', icon: GraduationCap },
    { path: '/skills', label: 'Skills', icon: Zap },
    { path: '/preview', label: 'Preview', icon: Eye },
  ];

  return (
    <div className="tabs tabs-boxed bg-base-200/50 backdrop-blur-sm rounded-lg p-2 shadow-lg">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`tab tab-lifted rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'tab-active bg-primary/20 text-primary border-primary'
                : 'hover:bg-base-300/50'
            }`}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default TabNavigation; 