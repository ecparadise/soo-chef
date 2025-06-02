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

export const generateIngredientsPrompt = (ingredients: string, mealType: string, preferences: string[]) => {
  return {
    prompt: `Given a list of ingredients, a meal type, and a list of preferences, please generate a JSON describing a recipe with the fields ingredients (an array of objects with the fields quantity (number, using decimals not fractions), unit (string), and name (string)), instructions (a string array), a creative title (a string), and recipeInfo (an object with calories (string), cookTime (string), prepTime (string), and servings (number)). Guidelines:\n-You do not need to use all provided ingredients. ${guidelines}`,
    userMessage: `Ingredients: ${ingredients}. Meal type: ${mealType}. Preferences: ${preferences}.`
  }
}

export const generateDescriptionPrompt = (description: string, mealType: string, preferences: string[]) => {
  return {
    prompt: `Given a description of a recipe, a meal type, and a list of preferences, please generate a JSON describing a recipe with the fields ingredients (an array of objects with the fields quantity (number, using decimals not fractions), unit (string), and name (string)), instructions (a string array), a creative title (a string), and recipeInfo (an object with string fields calories (string), cookTime (string), prepTime (string), and servings (number)). Guidelines: ${guidelines}`,
    userMessage: `Description: ${description}. Meal type: ${mealType}. Preferences: ${preferences}.`
  }
}
export const generateSurpriseMePrompt = (mealType: string, preferences: string[]) => {
  return {
    prompt: `Given a meal type and a list of preferences, generate a JSON describing a recipe with the fields ingredients (an array of objects with the fields quantity (number, using decimals not fractions), unit (string), and name (string)), instructions (a string array), a creative title (a string), and recipeInfo (an object with fields calories (string), cookTime (string), prepTime (string), and servings (number)). Guidelines:\n -Be creative! ${guidelines}`,
    userMessage: `Meal type: ${mealType}. Preferences: ${preferences}.`
  }
}

export const guidelines = '\n-Use only ingredients that complement each other for a great-tasting, realistic dish.\n-Ensure the recipe suits the given meal type.\n-Be creative with the title and concise yet clear with instructions.\n -The ingredient unit should be one of the following: ["g", "kg", "ml", "l", "cup", "tbsp", "tsp", "oz", "lb", "clove", "piece", "pinch", ""]. Use an empty string if no unit is needed.\n-Ensure that all user preferences are accommodated. \n-Return only valid, structured JSON — no explanations or extra text.'