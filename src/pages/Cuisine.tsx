import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IFetchCategoryResponse } from 'types/recipe';

function Cuisine() {
  const params = useParams<{ type: string }>();
  const [cousine, setCousine] = useState<IFetchCategoryResponse>();

  useEffect(() => {
    if (params.type) {
      const localData = localStorage.getItem(`cousine_${params.type}`);
      if (localData !== null) {
        return setCousine(JSON.parse(localData));
      }

      const getPopular = async () => {
        const { data } = await axios.get<IFetchCategoryResponse>(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${params.type}`
        );

        setCousine(data);
        localStorage.setItem(`cousine_${params.type}`, JSON.stringify(data));
      };

      getPopular();
    }
  }, [params.type]);

  return (
    <Grid
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cousine?.results.map((item) => (
        <Card key={item.id}>
          <Link to={`/recipe/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled(motion.div)`
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
