'use client';
import React, { useState } from 'react';
import MealTypeDropdown from '../MealTypeDropdown/MealTypeDropdown';
import { mealTypeOptions } from './constants';
import RecipeInput from '../RecipeInput/RecipeInput';
import * as motion from "motion/react-client"


const RecipeForm: React.FC<{ handleSubmit: (e: React.FormEvent<HTMLFormElement>, selectedPromptType: string, recipeInput: string, mealType: string) => void }> = ({ handleSubmit }) => {

  const [mealType, setMealType] = useState<string>('Breakfast');
  const [recipeInput, setRecipeInput] = useState<string>('');
  const [selectedPromptType, setSelectedPromptType] = useState<string>('Ingredients');

  return (
    <>
      <h2 className="text-center">Let's cook something together!</h2>
      <form onSubmit={(e) => handleSubmit(e, selectedPromptType, recipeInput, mealType)} className='w-full'>
        <RecipeInput selectedPromptType={selectedPromptType} setSelectedPromptType={setSelectedPromptType} value={recipeInput} onChange={(e) =>
          setRecipeInput(e.target.value)
        } />
        <MealTypeDropdown selectedOption={mealType} setSelectedOption={setMealType} options={mealTypeOptions} />
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