import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IRandomRecipesResponse, Recipe } from 'types/recipe';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

function Popular() {
  const [popular, setPopular] = useState<Recipe[]>([]);

  useEffect(() => {
    const getPopular = async () => {
      //? 로컬스토리지에 데이터가 있으면 API 호출을 하지 않는다. (API 횟수 제한때문에 ㅠㅠㅠ)
      const popular = localStorage.getItem('popular_recipes');

      if (popular !== null) {
        console.log('*** 로컬 스토리지 값으로 초기화 ***');
        setPopular(JSON.parse(popular));
        return;
      }

      console.log('*** 로컬 스토리지가 비어있으므로 API 호출 ***');

      const { data } = await axios.get<IRandomRecipesResponse>(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      );
      setPopular(data.recipes);

      localStorage.setItem('popular_recipes', JSON.stringify(data.recipes));
    };

    getPopular();
  }, []);

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: 'free',
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
              <p>{recipe.title}</p>
              <img src={recipe.image} alt={recipe.title} />
              <Gradient />
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Card = styled.div`
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
