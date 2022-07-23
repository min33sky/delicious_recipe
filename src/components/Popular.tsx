import React, { useEffect, useState } from 'react';
import { Recipe } from 'types/recipe';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { POPULAR_RECIPES } from 'utils/constants';
import { fetchPopularRecipes } from 'api/recipes';

/**
 * ## 인기 레시피 컴포넌트
 */
function Popular() {
  const [popular, setPopular] = useState<Recipe[]>([]);

  useEffect(() => {
    (async () => {
      //? 로컬스토리지에 데이터가 있으면 API 호출을 하지 않는다. (API 횟수 제한때문에 ㅠㅠㅠ)
      const popular = localStorage.getItem(POPULAR_RECIPES);

      if (popular !== null) {
        console.log('이미 존재:)');
        setPopular(JSON.parse(popular));
        return;
      }

      const data = await fetchPopularRecipes();
      setPopular(data);
      localStorage.setItem(POPULAR_RECIPES, JSON.stringify(data));
    })();
  }, []);

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          gap: '5rem',
          breakpoints: {
            1280: {
              perPage: 3,
            },
            1024: {
              perPage: 2,
            },
            767: {
              perPage: 1,
            },
          },
        }}
      >
        {popular.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={`/recipe/${recipe.id}`}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: 4rem 0;
`;

const Card = styled.article`
  position: relative;
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;

  img {
    position: absolute;
    border-radius: 2rem;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
`;

export default Popular;
