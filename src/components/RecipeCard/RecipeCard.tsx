"use client";

import React from 'react';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { generatePDF } from '@/utils/generate-pdf';
import ServingsEditor from './ServingsEditor';
import NutritionInfo, { NutritionInfoType } from './NutritionInfo';
import * as motion from "motion/react-client";
import Image from 'next/image';

export type RecipeInfoType = {
  calories: number;
  cookTime: string;
  prepTime: string;
  servings: number;
}

export type IngredientType = {
  quantity: number;
  unit: string;
  name: string;
}

export type RecipeType = {
  title: string;
  imageUrl?: string;
  recipeInfo: RecipeInfoType;
  ingredients: IngredientType[];
  instructions: string[];
  nutritionInfo?: NutritionInfoType;
}

interface RecipeCardProps {
  recipe: RecipeType;
  dismissRecipe: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, dismissRecipe }) => {
  const { title, ingredients, instructions, imageUrl, recipeInfo, nutritionInfo } = recipe;
  const { calories, cookTime, prepTime, servings: baseServings } = recipeInfo;
  const [servings, setServings] = React.useState(baseServings);
  const [scalableIngredients, setScalableIngredients] = React.useState(ingredients);

  const formatUnit = (quantity: number, unit: string) => {
    if (unit) {
      const plural = unit === 'pinch' ? 'es' : 's';
      return quantity <= 1 ? unit : unit + plural;
    }
    return unit;
  }

  const ingredientList = scalableIngredients.map((ingredient) => {
    const { quantity, unit, name } = ingredient;
    return `${quantity} ${formatUnit(quantity, unit)} ${name}`;
  }
  );

  const downloadRecipe = () => {
    const doc = generatePDF(title, recipeInfo, ingredientList, instructions, servings, nutritionInfo);
    doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  const onBackClick = () => {
    if (confirm('Go back? You will lose your current recipe.')) {
      dismissRecipe();
    }
  }

  const updateServings = (newServings: number) => {
    setServings(newServings);
    const scale = newServings / baseServings;
    const newIngredients = ingredients.map((ingredient) => {
      const { quantity } = ingredient;
      return {
        ...ingredient,
        quantity: parseFloat((quantity * scale).toFixed(2)),
      };
    }
    );
    setScalableIngredients(newIngredients);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: 50 }}>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between">
            <button aria-label="Go back" onClick={onBackClick}><ArrowLeftIcon className="w-6 h-6" /></button>
            <button aria-label="Download recipe" onClick={downloadRecipe}>
              <ArrowDownTrayIcon className="w-6 h-6" />
            </button>
          </div>
          <h2 className="w-full text-center" style={{ fontSize: '1.875rem', lineHeight: '36px' }}>{title}</h2>
          {imageUrl && <Image className="mx-auto my-4" src={imageUrl} alt={''} height={200} width={200} style={{ objectFit: "contain" }} />}
          <div className="bg-emerald-100 dark:bg-emerald-600 p-4 rounded-md flex flex-col gap-2">
            <dl className="flex flex-col align-center gap-4 mx-auto items-center">
              <div className="flex gap-4">
                <div>
                  <dt className="font-medium">Cook time:</dt>
                  <dd>{cookTime}</dd>
                </div>
                <div>
                  <dt className="font-medium">Prep time:</dt>
                  <dd>{prepTime}</dd>
                </div>
              </div>
              <div>
                <dt className="font-medium"># Servings:</dt>
                <dd><ServingsEditor servings={Number(servings)} onChange={updateServings} /></dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <h3>Ingredients</h3>
          <ul className="list-disc list-inside">
            {ingredientList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )
            )}
          </ul>
        </div>
        <div>
          <h3>Instructions</h3>
          <ol className="list-decimal list-inside">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        {nutritionInfo ? <NutritionInfo nutritionInfo={nutritionInfo} servings={baseServings} /> : <div>{`Estimated calories per serving: ${calories}`}</div>}
      </div>
    </motion.div>
  );
};

export default RecipeCard;