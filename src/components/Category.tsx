import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/**
 * ## 카테고리 컴포넌트
 */
function Category() {
  return (
    <List>
      <SLink to={`/cuisine/italian`}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={`/cuisine/american`}>
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={`/cuisine/thai`}>
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={`/cuisine/korean`}>
        <GiChopsticks />
        <h4>Korean</h4>
      </SLink>
    </List>
  );
}

const List = styled.nav`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  gap: 0.2rem;

  @media (min-width: 720px) {
    gap: 2rem;
  }
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100vmin;

  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;

  transform: scale(0.9);

  h4 {
    color: white;
    font-size: 0.8rem;
    transition: all 0.3s;
  }

  svg {
    color: white;
    font-size: 1.5rem;
    transition: all 0.3s;
  }

  &:hover {
    svg {
      color: tomato;
    }
    h4 {
      color: tomato;
    }
  }

  //? NavLink 사용 시 URL과 일치할 경우 active 클래스가 추가됨
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: white;
    }

    h4 {
      color: white;
    }
  }

  @media (min-width: 720px) {
    transform: scale(0.8);
  }
`;

export default Category;
