import React, { useEffect, useState } from 'react';
import { Recipe } from 'types/recipe';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Link } from 'react-router-dom';
import { VEGGIE_RECIPES } from 'utils/constants';
import { fetchVegetarianRecipes } from 'api/recipes';

/**
 * ## 채식주의자용 레시피 추천 컴포넌트
 */
function Veggie() {
  const [veggie, setVeggie] = useState<Recipe[]>([]);

  useEffect(() => {
    (async () => {
      const veggie = localStorage.getItem(VEGGIE_RECIPES);

      if (veggie !== null) {
        return setVeggie(JSON.parse(veggie));
      }

      const data = await fetchVegetarianRecipes();
      setVeggie(data);

      localStorage.setItem(VEGGIE_RECIPES, JSON.stringify(data));
    })();
  }, []);

  return (
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          gap: '5rem',
          breakpoints: {
            1280: {
              perPage: 2,
            },
            1024: {
              perPage: 1,
            },
          },
        }}
      >
        {veggie.map((recipe) => (
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

export default Veggie;
