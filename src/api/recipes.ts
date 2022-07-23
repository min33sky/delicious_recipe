import axios from 'axios';
import { IRandomRecipesResponse } from 'types/recipe';
import { FETCH_RECIPES_BASE_URL } from 'utils/constants';

/**
 * ## 인기 레시피를 가져오는 API
 * @returns 인기 레시피 배열
 */
export async function fetchPopularRecipes() {
  const { data } = await axios.get<IRandomRecipesResponse>(
    `${FETCH_RECIPES_BASE_URL}/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
  );
  return data.recipes;
}

/**
 * ## 채식자 추천 레시피를 가져오는 API
 * @returns 채식자 추천 레시피 배열
 */
export async function fetchVegetarianRecipes() {
  const { data } = await axios.get<IRandomRecipesResponse>(
    `${FETCH_RECIPES_BASE_URL}/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
  );

  return data.recipes;
}
