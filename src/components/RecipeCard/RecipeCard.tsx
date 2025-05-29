"use client";

import React from 'react';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { generatePDF } from '@/utils/generate-pdf';
import ServingsEditor from './ServingsEditor';
import NutritionInfo, { NutritionInfoType } from './NutritionInfo';
import * as motion from "motion/react-client";
import Image from 'next/image';
import { toast, ToastContentProps } from 'react-toastify';

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

const GoBackToast = ({ closeToast }: ToastContentProps) => {
  return (
    // <div className="grid grid-rows-[1fr_1px_.5fr] w-full">
    <div className="grid grid-cols-[1fr_1px_.5fr] xs:grid-cols-[1fr_1px_1fr] w-full">
      <div className="flex flex-col p-2">
        <h3 className="text-foreground text-sm font-semibold">Go back?</h3>
        <p className="text-sm text-foreground">You will lose your current recipe</p>
      </div>
      <div className="bg-zinc-300 h-full" />
      <div className="grid grid-rows-2 h-full mx-4 gap-2">
        <motion.button onClick={() => closeToast('back')} className="text-white py-1 rounded"
          animate={{
            backgroundColor: '#00bc7d'
          }}
          whileHover={{
            backgroundColor: '#009966'
          }}>
          Go back
        </motion.button>
        <motion.button
          onClick={() => closeToast('cancel')}
          className="py-1 rounded border-1"
          animate={{ borderColor: '#fb2c36', color: '#fb2c36' }}
          whileHover={{
            borderColor: '#9f0712',
            color: '#9f0712'
          }}
        >
          Cancel
        </motion.button>
      </div>
    </div>
  );
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

  const onCloseToast = (reason: string | boolean | undefined) => {
    if (reason === 'back') {
      dismissRecipe();
    }
    const overlay = document.getElementById('overlay');
    setTimeout(() => {
      overlay?.classList.remove('block');
      overlay?.classList.add('hidden');
    }, 250);
  }

  const onBackClick = () => {
    toast(GoBackToast, { onClose: onCloseToast, hideProgressBar: true, autoClose: false, position: 'top-left', className: 'dark:bg-gray-900!' })
  }

  toast.onChange(payload => {
    const overlay = document.getElementById('overlay');
    if (payload.status === "added") {
      overlay?.classList.remove('hidden');
      overlay?.classList.add('block');
    }
  })

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
    <>
      <div id="overlay" className="hidden fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75 z-1000"></div>
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
    </>
  );
};

export default RecipeCard;