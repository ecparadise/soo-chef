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
      className={`cursor-pointer text-center rounded px-1 py-2 transition-colors duration-300 ${isSelected ? 'bg-gray-400 dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-600'
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