import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const tooltipCSS = css`
  display: none;
  height: 5.6rem;
  width: 28rem;
  position: absolute;
  left: calc(4.8rem + 1.6rem);
  font-size: 2rem;
  padding: 0.8rem;
  border-radius: 0.8rem;
  transition: all 0.2s;
`;

const tooltipHoverCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-blue-dark);
  color: var(--color-light);
`;

export const Container = styled.aside`
  z-index: 500;
  position: fixed;
  left: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(
    330deg,
    var(--color-gradient-blue-dark) 0%,
    var(--color-gradient-blue-light) 100%
  );
  width: 9.6rem;
  padding: 1.6rem;

  & img {
    width: 4.8rem;
    height: 4.8rem;
  }

  > div {
    display: flex;
    flex-direction: column;

    & a + a {
      margin-top: 1.6rem;
    }
  }

  & button {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 0.8rem;
    border: none;
    background-color: var(--color-blue-dark);
    color: var(--color-light);
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: var(--color-yellow);
    }

    & span {
      ${tooltipCSS}
    }

    &:hover span {
      ${tooltipHoverCSS}
    }
  }
`;

export const CustomLink = styled(Link)`
  position: relative;
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 0.8rem;
  border: none;
  background-color: var(--color-blue-dark);
  color: var(--color-light);
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color-yellow);
  }

  & span {
    ${tooltipCSS}
  }

  &:hover span {
    ${tooltipHoverCSS}
  }

  & svg {
    color: var(--color-white);
  }

  &:hover svg {
    color: var(--color-blue-dark);
  }
`;
