const calculateNutritionInfo = async (ingredients) => {
  try {
    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': process.env.NUTRITIONIX_APP_ID,
        'x-app-key': process.env.NUTRITIONIX_APP_KEY
      },
      body: JSON.stringify({
        query: ingredients,
      })
    }
    )
    const data = await response.json();
    if (data && data.foods && data.foods.length > 0) {
      const totals = data.foods.reduce((acc, food) => {
        acc.calories += food.nf_calories || 0;
        acc.total_fat += food.nf_total_fat || 0;
        acc.total_carbohydrate += food.nf_total_carbohydrate || 0;
        acc.protein += food.nf_protein || 0;
        acc.sodium += food.nf_sodium || 0;
        acc.dietary_fiber += food.nf_dietary_fiber || 0;
        return acc;
      }, {
        calories: 0,
        total_fat: 0,
        total_carbohydrate: 0,
        protein: 0,
        sodium: 0,
        dietary_fiber: 0
      });
      return totals;
    } else {
      console.error("No nutrition data found");
      return {};
    }
  } catch (error) {
    console.error("Error calculating nutrition info:", error);
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ingredients } = req.body
    const response = await calculateNutritionInfo(ingredients)
    if (response) {
      res.status(200).json({ nutritionInfo: response })
    } else {
      res.status(500).json({ nutritionInfo: {} })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}