import { NutritionInfoType } from "@/components/RecipeCard/NutritionInfo";
import { RecipeInfoType } from "@/components/RecipeCard/RecipeCard";
import jsPDF from "jspdf";
import { calculateValuePerServing } from "./nutrition-calculation";

export const generatePDF = (title: string, recipeInfo: RecipeInfoType, ingredients: string[], instructions: string[], servings: number, nutritionInfo?: NutritionInfoType) => {
  const { cookTime, prepTime } = recipeInfo;
  const doc = new jsPDF();

  const addText = (text: string, x: number, y: number, fontSize = 12) => {
    doc.setFontSize(fontSize);
    doc.text(text, x, y);
  };

  const addContentWithPagination = (content: string | string[], x: number, y: number, lineHeight: number) => {
    const lines = Array.isArray(content) ? content : doc.splitTextToSize(content, 180);
    lines.forEach((line: string | string[]) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, x, y);
      y += lineHeight;
    });
    return y;
  };

  addText(title, 10, 10, 16);
  addText(`Cook time: ${cookTime}`, 10, 20);
  addText(`Prep time: ${prepTime}`, 10, 30);
  addText(`Servings: ${servings}`, 10, 40);

  addText('Ingredients:', 10, 60);
  let yOffset = 70;
  yOffset = ingredients.reduce((y, ingredient) => addContentWithPagination(`- ${ingredient}`, 10, y, 10), yOffset);
  yOffset += 10;
  addText('Instructions:', 10, yOffset);
  yOffset += 10;
  yOffset = instructions.reduce((y, instruction, index) => {
    const numberedInstruction = `${index + 1}. ${instruction}`;
    return addContentWithPagination(numberedInstruction, 10, y, 10);
  }, yOffset);
  yOffset += 10;
  if (nutritionInfo) {
    addText('Nutrition Info:', 10, yOffset);
    yOffset += 10;

    const { calories, protein, total_fat, total_carbohydrate, dietary_fiber, sodium } = nutritionInfo;
    const nutritionDetails = [
      `Calories: ${calculateValuePerServing(calories, servings)} kcal`,
      `Protein: ${calculateValuePerServing(protein, servings)}g`,
      `Fat: ${calculateValuePerServing(total_fat, servings)}g`,
      `Carbs: ${calculateValuePerServing(total_carbohydrate, servings)}g`,
      `Fiber: ${calculateValuePerServing(dietary_fiber, servings)}g`,
      `Sodium: ${calculateValuePerServing(sodium, servings)}mg`,
    ];

    yOffset = nutritionDetails.reduce((y, detail) => addContentWithPagination(detail, 10, y, 10), yOffset);
  }

  return doc;
};

