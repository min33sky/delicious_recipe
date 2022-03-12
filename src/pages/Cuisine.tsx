import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IFetchCategoryResponse } from 'types/recipe';

function Cuisine() {
  const params = useParams<{ type: string }>();
  const [cousine, setCousine] = useState<IFetchCategoryResponse>();

  useEffect(() => {
    if (params.type) {
      const localData = localStorage.getItem(`cousine_${params.type}`);
      if (localData !== null) {
        console.log(params.type + ' 데이터를 로컬스토리지에서 가져옵니다. ');
        return setCousine(JSON.parse(localData));
      }

      const getPopular = async () => {
        console.log('*** 로컬 스토리지가 비어있으므로 API 호출 ***');

        const { data } = await axios.get<IFetchCategoryResponse>(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${params.type}`
        );

        setCousine(data);
        localStorage.setItem(`cousine_${params.type}`, JSON.stringify(data));
      };

      getPopular();
    }
  }, [params.type]);

  console.log(cousine);

  return (
    <Grid>
      {cousine?.results.map((item) => (
        <Card key={item.id}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
