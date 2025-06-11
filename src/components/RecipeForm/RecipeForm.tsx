'use client';
import React from 'react';
import MealTypeDropdown from '../MealTypeDropdown/MealTypeDropdown';
import { mealTypeOptions } from './constants';
import RecipeInput from '../RecipeInput/RecipeInput';
import * as motion from "motion/react-client"
import { useForm } from "react-hook-form"
import { getInputId } from '@/utils/form-helper';
import Preferences from '../Preferences/Preferences';

export interface IFormValues {
  'ingredients-textarea': string;
  'description-textarea': string;
  mealType: string;
}

export type PromptType = "Ingredients" | "Description" | "Surprise me!";

export type IRecipeInput = {
  [key in PromptType]: string;
};

interface RecipeFormProps {
  onSubmit: (selectedPromptType: PromptType, recipeInputValue: string, mealType: string, selectedPreferences: string[]) => void;
  recipeInput: IRecipeInput;
  setRecipeInput: React.Dispatch<React.SetStateAction<IRecipeInput>>;
  mealType: string;
  setMealType: (value: string) => void;
  selectedPromptType: PromptType;
  selectedPreferences: string[];
  setSelectedPromptType: (value: PromptType) => void;
  setSelectedPreferences: (preferences: string[]) => void;
  isDarkMode?: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, recipeInput, setRecipeInput, mealType, setMealType, selectedPromptType, setSelectedPromptType, selectedPreferences, setSelectedPreferences, isDarkMode }) => {

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    resetField,
  } = useForm<IFormValues>()

  const submitForm = () => {
    onSubmit(selectedPromptType, recipeInput[selectedPromptType], mealType, selectedPreferences)
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    clearErrors(getInputId(selectedPromptType));
    setRecipeInput({ ...recipeInput, [selectedPromptType]: e.target.value })
  }

  const onClearInput = () => {
    resetField(getInputId(selectedPromptType));
    setRecipeInput({ ...recipeInput, [selectedPromptType]: '' })
  }

  const onReset = () => {
    setRecipeInput({ Ingredients: '', Description: '', 'Surprise me!': '' });
    setMealType('Breakfast');
    setSelectedPromptType('Ingredients');
    setSelectedPreferences([]);
    resetField('description-textarea');
    resetField('ingredients-textarea');
    clearErrors();
  }


  return (
    <motion.div transition={{ delay: 0.75, duration: 0.75 }}>
      <h2 className="text-center">{`Let\'s cook something together!`}</h2>
      <form onSubmit={handleSubmit(submitForm)} className='w-full'>
        <RecipeInput register={register} errors={errors} selectedPromptType={selectedPromptType} setSelectedPromptType={setSelectedPromptType} value={recipeInput[selectedPromptType]} onChange={(e) => onChangeInput(e)} onClear={onClearInput} />
        <MealTypeDropdown register={register} selectedOption={mealType} setSelectedOption={setMealType} options={mealTypeOptions} />
        <Preferences selectedPreferences={selectedPreferences} setSelectedPreferences={setSelectedPreferences} />
        <motion.button
          type="submit"
          className="mt-4 text-white py-2 px-4 rounded w-full font-bold dark:text-gray-900"
          animate={{
            backgroundColor: isDarkMode ? '#009966' : '#007a55'
          }}
          whileHover={{
            backgroundColor: isDarkMode ? '#00d492' : '#009966'
          }}
        >
          {'Generate Recipe'}
        </motion.button>
        <motion.button
          type="button"
          className="mt-4 py-2 px-4 rounded w-full border flex items-center justify-center gap-2 font-bold"
          animate={{
            borderColor: isDarkMode ? '#d1d5dc' : '#6a7282',
            color: isDarkMode ? '#d1d5dc' : '#6a7282',
            backgroundColor: 'transparent'
          }}
          whileHover={{
            backgroundColor: isDarkMode ? '#364153' : '#e5e7eb',
            borderColor: isDarkMode ? '#364153' : '#6a7282',
            color: isDarkMode ? '#fff' : '#6a7282'
          }}
          whileTap={{
            backgroundColor: isDarkMode ? '#1e2939' : '#d1d5dc',
            color: isDarkMode ? '#fff' : '#6a7282',
            borderColor: isDarkMode ? '#1e2939' : '#d1d5dc'
          }}
          onClick={onReset}
        >
          {'Reset selections'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default RecipeForm;