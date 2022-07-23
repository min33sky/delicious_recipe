import { fetchCousineRecipes } from 'api/recipes';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IFetchCategoryResponse } from 'types/recipe';
import { CousineType, COUSINE_TYPE } from 'utils/constants';

/**
 * ## 지역이나 나라별 음식 컴포넌트
 */
function Cuisine() {
  const params = useParams<{ type: CousineType }>();
  const [cousine, setCousine] = useState<IFetchCategoryResponse>();

  useEffect(() => {
    (async () => {
      if (!params.type) return;

      const localData = localStorage.getItem(COUSINE_TYPE[params.type]);

      if (localData !== null) {
        return setCousine(JSON.parse(localData));
      }

      const data = await fetchCousineRecipes(params.type);
      setCousine(data);
      localStorage.setItem(COUSINE_TYPE[params.type], JSON.stringify(data));
    })();
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
