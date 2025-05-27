import { PromptType } from "@/components/RecipeForm/RecipeForm";

export const getInputId = (selectedPromptType: PromptType) => selectedPromptType === 'Ingredients' ? 'ingredients-textarea' : 'description-textarea';