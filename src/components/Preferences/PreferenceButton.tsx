import React, { useState } from 'react';

interface PreferenceButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const PreferenceButton: React.FC<PreferenceButtonProps> = ({ label, onClick, isSelected }) => {

  const handleClick = (code?: string) => {
    if (code && code !== "Space") {
      return;
    }
    onClick();
  };

  return (
    <div
      onClick={() => handleClick()}
      onKeyDown={(e) => handleClick(e.code)}
      className={`cursor-pointer text-center rounded-full flex items-center justify-center px-1 py-2 transition-colors duration-300 ${isSelected ? 'bg-violet-900 text-white dark:text-gray-900 border-violet-900 dark:bg-violet-400 dark:border-violet-400' : 'border border-violet-900 text-violet-900 dark:border-violet-400 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-950'
        }`}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
    >
      {label}
    </div>
  );
};

export default PreferenceButton;