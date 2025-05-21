import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface ServingsEditorProps {
  servings: number;
  onChange: (newServings: number) => void;
}

const ServingsEditor: React.FC<ServingsEditorProps> = ({ servings, onChange }) => {
  const handleIncrease = () => onChange(servings + 1);
  const handleDecrease = () => {
    if (servings > 1) {
      onChange(servings - 1);
    }
  };

  return (
    <div className="gap-2 flex justify-center">
      <button onClick={handleDecrease} disabled={servings <= 1} aria-label='Decrease servings'>
        <MinusIcon className="w-4 h-4" />
      </button>
      <span className="border rounded px-2">{servings}</span>
      <button aria-label='Increase servings' onClick={handleIncrease}><PlusIcon className="w-4 h-4" /></button>
    </div>
  );
};

export default ServingsEditor;