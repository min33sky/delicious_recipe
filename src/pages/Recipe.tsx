import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IFetchRecipeDetail } from 'types/recipe';

function Recipe() {
  const params = useParams<{ name: string }>();
  const [recipeDetail, setRecipeDetail] = useState<IFetchRecipeDetail>();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('instructions');

  useEffect(() => {
    if (params.name) {
      const localData = localStorage.getItem(`${params.name}_detail`);

      if (localData !== null) {
        return setRecipeDetail(JSON.parse(localData));
      }

      const getDetail = async () => {
        const { data } = await axios.get<IFetchRecipeDetail>(
          `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );

        setRecipeDetail(data);
        localStorage.setItem(`${params.name}_detail`, JSON.stringify(data));
      };

      getDetail();
    }
  }, [params.name]);

  return (
    <DetailWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2>{recipeDetail?.title}</h2>
        <img src={recipeDetail?.image} alt={recipeDetail?.title} />
      </div>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>

        <AnimatePresence exitBeforeEnter>
          {activeTab === 'instructions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 dangerouslySetInnerHTML={{ __html: recipeDetail?.summary || '' }}></h3>
              <h3 dangerouslySetInnerHTML={{ __html: recipeDetail?.instructions || '' }}></h3>
            </motion.div>
          )}
          {activeTab === 'ingredients' && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {recipeDetail?.extendedIngredients.map((item) => (
                <li key={item.id}>{item.original}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled(motion.div)`
  margin-top: 8rem;
  margin-bottom: 5rem;

  display: grid;
  width: 100%;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  img {
    width: 100%;
    border-radius: 10px;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  h3 {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    margin-left: 1.2rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background-color: white;
  border: 2px solid black;
  font-weight: 600;
  cursor: pointer;

  /* 첫번째 버튼만 마진을 적용 */
  &:nth-of-type(1) {
    margin-right: 1rem;
  }
`;

const Info = styled.div`
  width: 100%;
`;

export default Recipe;
