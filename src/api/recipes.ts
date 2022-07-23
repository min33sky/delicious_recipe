import axios from 'axios';
import { IFetchCategoryResponse, IRandomRecipesResponse } from 'types/recipe';
import { CousineType, FETCH_RECIPES_BASE_URL } from 'utils/constants';

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

/**
 * ## 특정 지역이나 나라의 음식들을 가져오는 API
 * @param type 지역이나 국가
 * @returns 해당 음식들을 담은 객체
 */
export async function fetchCousineRecipes(type: CousineType) {
  const { data } = await axios.get<IFetchCategoryResponse>(
    `${FETCH_RECIPES_BASE_URL}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}`
  );

  return data;
}

/**
 * ## 해당 키워드에 맞는 검색 결과를 가져오는 API
 * @param keyword 검색어
 * @returns 검색 결과를 담은 객체
 */
export async function fetchSearchedRecipes(keyword: string) {
  const { data } = await axios.get<IFetchCategoryResponse>(
    `${FETCH_RECIPES_BASE_URL}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${keyword}`
  );

  return data;
}
