export const recipeResponseSchema = {
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of ingredients with measurements."
    },
    "instructions": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Step-by-step cooking instructions."
    },
    "recipeInfo": {
      "type": "object",
      "properties": {
        "calories": {
          "type": "number",
          "description": "Estimated calories for the recipe."
        },
        "cookTime": {
          "type": "string",
          "description": "Approximate cook time (e.g., '30 minutes')."
        },
        "prepTime": {
          "type": "string",
          "description": "Approximate prep time (e.g., '15 minutes')."
        },
        "servings": {
          "type": "number",
          "description": "Number of servings."
        },
        "title": {
          "type": "string",
          "description": "Title of the recipe."
        }
      },
      "required": ["calories", "cookTime", "prepTime", "servings"],
      "additionalProperties": false
    }
  },
  "required": ["ingredients", "instructions", "recipeInfo"],
  "additionalProperties": false
}

export const generateIngredientsPrompt = (ingredients: string, mealType: string) => {
  return {
    prompt: `Given a list of ingredients and a meal type, please generate a JSON describing a recipe with the fields ingredients (an array of objects with the fields quantity (number, using decimals not fractions), unit (string), and name (string)), instructions (a string array), a creative title (a string), and recipeInfo (an object with string fields calories, cookTime, prepTime, and servings). Guidelines:\n-You do not need to use all provided ingredients. ${guidelines}`,
    userMessage: `Ingredients: ${ingredients}. Meal type: ${mealType}`
  }
}

export const generateDescriptionPrompt = (description: string, mealType: string) => {
  return {
    prompt: `Given a description of a recipe and a meal type, please generate a JSON describing a recipe with the fields ingredients (an array of objects with the fields quantity (number, using decimals not fractions), unit (string), and name (string)), instructions (a string array), a creative title (a string), and recipeInfo (an object with string fields calories, cookTime, prepTime, and servings). Guidelines: ${guidelines}`,
    userMessage: `Description: ${description}. Meal type: ${mealType}`
  }
}
export const generateSurpriseMePrompt = (mealType: string) => {
  return {
    prompt: `Given a meal type, generate a JSON describing a recipe with the fields ingredients (an array of objects with the fields quantity (number, using decimals not fractions), unit (string), and name (string)), instructions (a string array), a creative title (a string), and recipeInfo (an object with string fields calories, cookTime, prepTime, and servings). Guidelines: Be creative! Guidelines: ${guidelines}`,
    userMessage: `Meal type: ${mealType}`
  }
}

export const guidelines = '\n-Make sure the selected ingredients complement each other for a great-tasting, realistic dish.\n-Ensure the recipe suits the given meal type.\n-Be creative with the title and concise yet clear with instructions.\n -The ingredient unit should be one of the following: ["g", "kg", "ml", "l", "cup", "tbsp", "tsp", "oz", "lb", "clove", "piece", "pinch", ""] \n-Return only valid, structured JSON — no explanations or extra text.'