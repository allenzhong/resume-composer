import { CheckCircle, X } from 'lucide-react';
import type { ReactNode } from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: ReactNode;
  showCloseButton?: boolean;
}

const NotificationModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  icon = <CheckCircle className="w-8 h-8 text-success" />,
  showCloseButton = true 
}: NotificationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Content */}
          <p className="text-gray-600 mb-6">{message}</p>
          
          {/* Actions */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="btn btn-primary btn-sm"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal; 