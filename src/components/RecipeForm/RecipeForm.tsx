'use client';
import React, { useState } from 'react';
import MealTypeDropdown from '../MealTypeDropdown/MealTypeDropdown';
import { mealTypeOptions } from './constants';
import RecipeInput from '../RecipeInput/RecipeInput';
import * as motion from "motion/react-client"
import { useForm } from "react-hook-form"
import { getInputId } from '@/utils/form-helper';

export interface IFormValues {
  'ingredients-textarea': string
  'description-textarea': string
  mealType: string
}

export type PromptType = "Ingredients" | "Description" | "Surprise me!";

type IRecipeInput = {
  [key in PromptType]: string;
};

const RecipeForm: React.FC<{ onSubmit: (selectedPromptType: PromptType, recipeInputValue: string, mealType: string) => void }> = ({ onSubmit }) => {

  const [mealType, setMealType] = useState<string>('Breakfast');
  const [recipeInput, setRecipeInput] = useState<IRecipeInput>({ Ingredients: '', Description: '', 'Surprise me!': '' });
  const [selectedPromptType, setSelectedPromptType] = useState<PromptType>('Ingredients');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IFormValues>()

  const submitForm = () => {
    onSubmit(selectedPromptType, recipeInput[selectedPromptType], mealType)
  }

  return (
    <>
      <h2 className="text-center">{`Let\'s cook something together!`}</h2>
      <form onSubmit={handleSubmit(submitForm)} className='w-full'>
        <RecipeInput register={register} errors={errors} selectedPromptType={selectedPromptType} setSelectedPromptType={setSelectedPromptType} value={recipeInput[selectedPromptType]} onChange={(e) => {
          clearErrors(getInputId(selectedPromptType));
          setRecipeInput({ ...recipeInput, [selectedPromptType]: e.target.value })
        }} />
        <MealTypeDropdown register={register} selectedOption={mealType} setSelectedOption={setMealType} options={mealTypeOptions} />
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