import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Search() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/searched/${keyword}`);
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <FaSearch />
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
    </FormStyle>
  );
}

const FormStyle = styled.form`
  position: relative;
  margin: 0 auto;
  width: 80%;

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;
