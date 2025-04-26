import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = 'h-12' }) => {
  return (
    <img
      src="https://www.herr-informatik.ch/wp-content/uploads/2022/03/Herr-Logo-1.jpg"
      alt="Herr Informatik"
      className={`${className} object-contain`}
    />
  );
};