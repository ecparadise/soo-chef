export const calculateValuePerServing = (value: number, servings: number) => {
  return parseFloat((value / servings).toFixed(1));
}