import { calculateValuePerServing } from '@/utils/nutrition-calculation';
import React from 'react';

export type NutritionInfoType = {
  calories: number;
  protein: number; // in grams
  total_carbohydrate: number; // in grams
  total_fat: number; // in grams
  sodium: number; // in milligrams
  dietary_fiber: number; // in grams
}

interface NutritionInfoProps {
  nutritionInfo: NutritionInfoType;
  servings: number;
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ nutritionInfo, servings }) => {
  const { calories, protein, total_carbohydrate, total_fat, sodium, dietary_fiber } = nutritionInfo;

  return (
    <div className="border p-4 rounded-md shadow-md bg-white dark:bg-gray-300 dark:text-black">
      <h3>Nutrition Information (per serving)</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li><strong>Calories:</strong> {calculateValuePerServing(calories, servings)} kcal</li>
        <li><strong>Protein:</strong> {calculateValuePerServing(protein, servings)} g</li>
        <li><strong>Carbohydrates:</strong> {calculateValuePerServing(total_carbohydrate, servings)} g</li>
        <li><strong>Fat:</strong> {calculateValuePerServing(total_fat, servings)} g</li>
        <li><strong>Sodium:</strong> {calculateValuePerServing(sodium, servings)} mg</li>
        <li><strong>Fiber:</strong> {calculateValuePerServing(dietary_fiber, servings)} g</li>
      </ul>
      <span className="italic text-xs">Nutrition information calculated using Nutritionix API</span>
    </div>
  );
};

export default NutritionInfo;