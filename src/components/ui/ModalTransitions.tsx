import React from 'react';

interface ModalLoadingProps {
  isVisible: boolean;
  message?: string;
}

export const ModalLoading: React.FC<ModalLoadingProps> = ({ 
  isVisible, 
  message = "Loading..." 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

interface ModalTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
}

export const ModalTransition: React.FC<ModalTransitionProps> = ({
  children,
  isVisible,
  duration = 300,
}) => {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!shouldRender) return null;

  return (
    <div
      className={`transition-all duration-${duration} ease-in-out ${
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95'
      }`}
    >
      {children}
    </div>
  );
};
