'use client';
import React from 'react';
import { instructions, promptTypes } from './constants';
import * as motion from "motion/react-client"

interface InputTypeProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectedPromptType: string;
  setSelectedPromptType: (value: string) => void;
}

const InputType: React.FC<InputTypeProps> = ({ value, onChange, selectedPromptType, setSelectedPromptType }) => {

  return (
    <>
      <div className="flex gap-2 mb-2 mt-4">
        <fieldset className="border-none p-0">
          <legend className="mb-4 text-center font-medium">How do you want to generate the recipe?</legend>
          <div role="radiogroup" className="flex gap-2">
            {promptTypes.map((pType) =>
              <motion.span
                key={pType}
                role="radio"
                aria-checked={selectedPromptType === pType}
                tabIndex={0}
                data-value={pType}
                onClick={() => setSelectedPromptType(pType)}
                initial={false}
                animate={{
                  borderBottomWidth: selectedPromptType === pType ? '2px' : '0px',
                  borderBottomColor: selectedPromptType === pType ? 'var(--color-primary)' : 'rgba(93, 14, 192, 0)',
                  color: selectedPromptType === pType ? 'var(--color-primary)' : 'var(--color-neutral)',
                }}
                whileHover={{
                  color: selectedPromptType === pType ? 'var(--color-primary)' : 'var(--color-neutral-hover)',
                }}
                className={`cursor-pointer px-2 py-2 inputRadio font-semibold`}
              >
                {pType}
              </motion.span>)}
          </div>
        </fieldset>
      </div>
      {selectedPromptType !== 'Surprise me!' &&
        <motion.textarea
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          placeholder={instructions[selectedPromptType] || 'Enter your input here...'}
          value={value}
          onChange={onChange}
          rows={3}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-500 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
        />}
    </>
  );
};

export default InputType;