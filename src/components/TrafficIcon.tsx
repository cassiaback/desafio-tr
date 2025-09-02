import React from 'react';

interface TrafficIconProps {
  className?: string;
  variant?: 'light' | 'sign' | 'car';
}

export const TrafficIcon: React.FC<TrafficIconProps> = ({ 
  className = "w-8 h-8", 
  variant = 'light' 
}) => {
  if (variant === 'light') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="9" y="2" width="6" height="20" rx="3" fill="currentColor" className="text-foreground/20"/>
        <circle cx="12" cy="7" r="2" fill="currentColor" className="text-destructive"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" className="text-accent"/>
        <circle cx="12" cy="17" r="2" fill="currentColor" className="text-primary"/>
      </svg>
    );
  }
  
  if (variant === 'sign') {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2L22 8V16L12 22L2 16V8L12 2Z" 
          fill="currentColor" 
          className="text-destructive"
        />
        <rect x="8" y="10" width="8" height="2" rx="1" fill="white"/>
      </svg>
    );
  }
  
  // Car variant
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19 17H22V19H19V21H17V19H15V17H17V15H19V17Z" 
        fill="currentColor"
      />
      <path 
        d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5Z"
        fill="currentColor" 
        className="text-secondary"
      />
      <path 
        d="M19 12C19 16.4183 15.4183 20 11 20C6.58172 20 3 16.4183 3 12C3 7.58172 6.58172 4 11 4C15.4183 4 19 7.58172 19 12Z"
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none"
      />
    </svg>
  );
};