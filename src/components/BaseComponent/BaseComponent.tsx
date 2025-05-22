'use client'
import React, { useState } from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeCard, { IngredientType, RecipeType } from '../RecipeCard/RecipeCard';
import { generateDescriptionPrompt, generateIngredientsPrompt, generateSurpriseMePrompt } from '@/config/ai-model-config';
import { AnimatePresence } from "motion/react"
import Loader from '../Loader/Loader';
import axios from 'axios';

/**
 * BaseComponent is a React functional component that provides functionality
 * for generating recipes and their corresponding images based on user input.
 * It uses a form to collect user input and displays the generated recipe
 * in a card format.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - The component interacts with two backend APIs:
 *   1. `/api/generate-recipe` to generate a recipe based on user input.
 *   2. `/api/generate-img` to generate an image URL for the recipe.
 * - Recipes are expected to be returned in JSON format, enclosed within
 *   Markdown-style code blocks (` ```json ... ``` `).
 *
 * @function extractJSON
 * Extracts a JSON string from a Markdown-style code block.
 * @param {string} str - The input string containing the JSON code block.
 * @returns {string} The extracted JSON string.
 *
 * @function generateImage
 * Sends a POST request to generate an image URL for a given recipe title.
 * @param {string} title - The title of the recipe.
 * @returns {Promise<string>} A promise that resolves to the image URL.
 *
 * @function generateRecipe
 * Sends a POST request to generate a recipe based on the provided prompt type,
 * user input, and meal type.
 * @param {string} promptType - The type of prompt ('Ingredients' or 'Description').
 * @param {string} userInput - The user's input for the recipe.
 * @param {string} mealType - The type of meal (e.g., breakfast, lunch, dinner).
 * @returns {Promise<any>} A promise that resolves to the parsed recipe object.
 *
 * @function handleSubmit
 * Handles the form submission, generating a recipe and its corresponding image.
 * Updates the component state with the generated recipe and image URL.
 * @param {string} promptType - The type of prompt ('Ingredients' or 'Description').
 * @param {string} userInput - The user's input for the recipe.
 * @param {string} mealType - The type of meal (e.g., breakfast, lunch, dinner).
 * @returns {Promise<void>} A promise that resolves when the recipe is generated.
 *
 * @state {RecipeType} recipe - The current recipe object, including its image URL.
 *
 * @dependencies
 * - `RecipeForm`: A child component for collecting user input.
 * - `RecipeCard`: A child component for displaying the generated recipe.
 */
const BaseComponent: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const extractJSON = (str: string): string => {
    const start = '```json';
    const end = '```';
    const startIndex = str.indexOf(start) + start.length;
    const endIndex = str.indexOf(end, startIndex);
    return str.substring(startIndex, endIndex);
  };
  const generateImage = async (title: string) => {
    try {
      const response = await axios.post('/api/generate-img', {
        title: title,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { imageUrl } = response.data;
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      return '';
    }
  }

  const generatePrompt = (promptType: string, userInput: string, mealType: string) => {
    switch (promptType) {
      case 'Ingredients':
        return generateIngredientsPrompt(userInput, mealType);
      case 'Description':
        return generateDescriptionPrompt(userInput, mealType);
      default:
        return generateSurpriseMePrompt(mealType);
    }
  }

  const generateRecipe = async (promptType: string, userInput: string, mealType: string) => {
    const { prompt, userMessage } = generatePrompt(promptType, userInput, mealType);
    try {
      const response = await axios.post('/api/generate-recipe', {
        prompt,
        userMessage
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { chatResponse } = response.data;
      const recipeJSON = extractJSON(chatResponse);
      const parsedRecipe = JSON.parse(recipeJSON);
      return parsedRecipe;
    } catch (error) {
      console.error('Error generating recipe:', error);
      return null;
    }
  }

  const getNutritionInfo = async (recipe: RecipeType) => {
    const { ingredients } = recipe;
    const ingredientsList = ingredients.map((ingredient: IngredientType) => {
      const { quantity, unit, name } = ingredient;
      return `${quantity} ${unit} ${name}`;
    }).join(', ');
    try {
      const response = await axios.post('/api/calculate-nutrition-info', {
        ingredients: ingredientsList,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const { nutritionInfo } = response.data;
      return nutritionInfo;
    } catch (error) {
      console.error('Error fetching nutrition info:', error);
      throw error;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, promptType: string, userInput: string, mealType: string) => {
    e.preventDefault();
    setIsLoading(true);
    const recipe = await generateRecipe(promptType, userInput, mealType);
    if (!recipe) {
      alert('Error generating recipe. Please try again.');
      setIsLoading(false);
      return;
    }
    const { title } = recipe;
    const [imageUrl, nutritionInfo] = await Promise.all([
      generateImage(title),
      getNutritionInfo(recipe)]);
    setRecipe({ ...recipe, imageUrl, nutritionInfo });
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? <Loader /> :
        (!recipe ?
          <RecipeForm handleSubmit={handleSubmit} /> :
          <AnimatePresence>
            <RecipeCard recipe={recipe} dismissRecipe={() => setRecipe(null)} />
          </AnimatePresence>
        )
      }
    </div>
  );
};

export default BaseComponent;