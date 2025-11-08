import React from 'react';
import { AlertTriangle, Info, CheckCircle, X, AlertCircle } from 'lucide-react';

const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = 'OK',
  type = 'info', // 'error', 'warning', 'success', 'info'
}) => {
  if (!isOpen) return null;

  const typeConfig = {
    error: {
      icon: AlertCircle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonBg: 'bg-red-600 hover:bg-red-700',
      borderColor: 'border-red-200',
      gradient: 'from-red-50 to-red-100',
    },
    warning: {
      icon: AlertTriangle,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      buttonBg: 'bg-orange-600 hover:bg-orange-700',
      borderColor: 'border-orange-200',
      gradient: 'from-orange-50 to-orange-100',
    },
    success: {
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonBg: 'bg-green-600 hover:bg-green-700',
      borderColor: 'border-green-200',
      gradient: 'from-green-50 to-green-100',
    },
    info: {
      icon: Info,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonBg: 'bg-blue-600 hover:bg-blue-700',
      borderColor: 'border-blue-200',
      gradient: 'from-blue-50 to-blue-100',
    },
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        {/* Header with Icon */}
        <div className={`bg-gradient-to-r ${config.gradient} border-b-2 ${config.borderColor} rounded-t-2xl p-6`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className={`${config.iconBg} p-3 rounded-xl shadow-lg`}>
                <IconComponent className={`h-8 w-8 ${config.iconColor}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 text-base leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 rounded-b-2xl px-6 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className={`${config.buttonBg} text-white px-8 py-2.5 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
