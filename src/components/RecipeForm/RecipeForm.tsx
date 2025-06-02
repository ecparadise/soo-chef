'use client';
import React, { useState } from 'react';
import MealTypeDropdown from '../MealTypeDropdown/MealTypeDropdown';
import { mealTypeOptions } from './constants';
import RecipeInput from '../RecipeInput/RecipeInput';
import * as motion from "motion/react-client"
import { set, useForm } from "react-hook-form"
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
    reset
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
    <>
      <h2 className="text-center">{`Let\'s cook something together!`}</h2>
      <form onSubmit={handleSubmit(submitForm)} className='w-full'>
        <RecipeInput register={register} errors={errors} selectedPromptType={selectedPromptType} setSelectedPromptType={setSelectedPromptType} value={recipeInput[selectedPromptType]} onChange={(e) => onChangeInput(e)} onClear={onClearInput} />
        <MealTypeDropdown register={register} selectedOption={mealType} setSelectedOption={setMealType} options={mealTypeOptions} />
        <Preferences selectedPreferences={selectedPreferences} setSelectedPreferences={setSelectedPreferences} />
        <motion.button
          type="button"
          className="mt-4 py-2 px-4 rounded w-full border"
          animate={{
            borderColor: isDarkMode ? '#e7000b' : '#9f0712',
            color: isDarkMode ? '#e7000b' : '#9f0712'
          }}
          whileHover={{
            backgroundColor: '#e7000b',
            color: '#ffffff'
          }}
          onClick={onReset}
        >
          {'Reset selections'}
        </motion.button>
        <motion.button
          type="submit"
          className="mt-4 text-white py-2 px-4 rounded w-full"
          animate={{
            backgroundColor: '#00bc7d'
          }}
          whileHover={{
            backgroundColor: '#009966'
          }}
        >
          {'Generate Recipe'}
        </motion.button>
      </form>
    </>
  );
};

export default RecipeForm;