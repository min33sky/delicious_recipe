import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IFetchCategoryResponse } from 'types/recipe';

function Searched() {
  const params = useParams<{ search: string }>();
  const [searchData, setSearchData] = useState<IFetchCategoryResponse>();

  useEffect(() => {
    if (params.search) {
      const localData = localStorage.getItem(`keyword_${params.search}`);
      if (localData !== null) {
        return setSearchData(JSON.parse(localData));
      }

      const getSearchData = async () => {
        const { data } = await axios.get<IFetchCategoryResponse>(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${params.search}`
        );

        setSearchData(data);
        localStorage.setItem(`keyword_${params.search}`, JSON.stringify(data));
      };

      getSearchData();
    }
  }, [params.search]);

  return (
    <Grid>
      {searchData?.results.map((item) => (
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

export default Searched;
