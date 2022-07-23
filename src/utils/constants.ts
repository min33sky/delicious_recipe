export const POPULAR_RECIPES = 'popular_recipes';
export const VEGGIE_RECIPES = 'veggie_recipes';
export const FETCH_RECIPES_BASE_URL = 'https://api.spoonacular.com/recipes';

export enum COUSINE_TYPE {
  'italian' = `cousine_italian`,
  'american' = `cousine_american`,
  'thai' = `cousine_thai`,
  'korean' = `cousine_korean`,
}

export type CousineType = keyof typeof COUSINE_TYPE;
