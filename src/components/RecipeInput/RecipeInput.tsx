'use client';
import React from 'react';
import { instructions, promptTypes } from './constants';
import * as motion from "motion/react-client"
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IFormValues, PromptType } from '../RecipeForm/RecipeForm';
import { getInputId } from '@/utils/form-helper';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface InputTypeProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectedPromptType: PromptType;
  setSelectedPromptType: (value: PromptType) => void;
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  onClear: () => void;
}

const InputType: React.FC<InputTypeProps> = ({ value, onChange, selectedPromptType, setSelectedPromptType, register, errors, onClear }) => {

  const renderInputBox = () => {
    const formId = getInputId(selectedPromptType);
    const errorsForId = errors?.[formId];
    return (
      <div className="mb-6">
        <motion.textarea
          {...register(formId, { required: true })}
          key={formId}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          placeholder={instructions[selectedPromptType] || 'Enter your input here...'}
          value={value}
          onChange={onChange}
          rows={3}
          aria-invalid={errorsForId ? "true" : "false"}
          className={`block p-2.5 w-full text-sm text-gray-900 rounded-md border ${errorsForId ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-500 focus:ring-blue-500 focus:border-blue-500'} dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
        {errorsForId && (<p role="alert" className="text-red-500 text-sm">{`${selectedPromptType} cannot be blank`}</p>)}
        {value !== '' && <button onClick={onClear} className="flex text-sm font-medium text-red-800 dark:text-red-600 items-center">
          <XMarkIcon aria-hidden='true' className="w-4 h-4" />
          Clear input
        </button>}
      </div>
    )
  }

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
                onClick={() => setSelectedPromptType(pType as PromptType)}
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
        renderInputBox()
      }
    </>
  );
};

export default InputType;