import { InferenceClient } from "@huggingface/inference";

const hfInferenceClient = new InferenceClient(process.env.HF_API_KEY);

const generateRecipeImage = async (recipeTitle) => {
  const prompt = recipeTitle
    ? `A high resolution image for a recipe with the title: ${recipeTitle}`
    : 'A generic high resolution image for a recipe';

  try {
    const image = await hfInferenceClient.textToImage({
      provider: "together",
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt,
    });
    if (image) {
      // Convert the blob to a base64 string
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64Image = buffer.toString('base64');
      // Return the base64 string with a data URL prefix
      return `data:image/png;base64,${base64Image}`;
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return '';
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title } = req.body
    const response = await generateRecipeImage(title)
    if (response) {
      res.status(200).json({ imageUrl: response })
    } else {
      res.status(500).json({ imageUrl: '' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}