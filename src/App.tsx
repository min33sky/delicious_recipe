import Category from 'components/Category';
import Search from 'components/Search';
import Pages from 'pages/Pages';
import { GiKnifeFork } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <>
      <Header>
        <GiKnifeFork />
        <LogoText to={'/'}>Deliciouss</LogoText>
      </Header>

      <Wrapper>
        <Search />
        <Category />
        <Pages />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 0 10px;
`;

const LogoText = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 1024px;
  margin: auto;
  padding: 4rem 1rem;
  gap: 0.5rem;

  svg {
    font-size: 1.5rem;
  }
`;

export default App;
