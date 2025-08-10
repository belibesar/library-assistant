import { useState, useEffect } from 'react';

interface UseModalAnimationProps {
  isOpen: boolean;
  onAnimationComplete?: () => void;
  duration?: number;
}

export const useModalAnimation = ({ 
  isOpen, 
  onAnimationComplete, 
  duration = 300 
}: UseModalAnimationProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setAnimationState('entering');
      
      const enterTimer = setTimeout(() => {
        setAnimationState('entered');
      }, 10);

      return () => clearTimeout(enterTimer);
    } else if (shouldRender) {
      setAnimationState('exiting');
      
      const exitTimer = setTimeout(() => {
        setAnimationState('exited');
        setShouldRender(false);
        onAnimationComplete?.();
      }, duration);

      return () => clearTimeout(exitTimer);
    }
  }, [isOpen, shouldRender, duration, onAnimationComplete]);

  return {
    shouldRender,
    animationState,
  };
};
