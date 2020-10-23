import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: var(--color-text-pink);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 32rem;
  color: var(--color-light);

  & h1 {
    font-size: 8rem;
    margin-bottom: 3.2rem;
  }

  & p {
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 6.4rem;
  }

  & div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }

  & button {
    font-size: 1.6rem;
    color: var(--color-light);
    padding: 1.6rem;
    border: none;
    border-radius: 0.8rem;
    background-color: var(--color-pink-dark);
    cursor: pointer;

    &:hover {
      background-color: ${darken(0.05, '#d6487b')};
    }
  }
`;

export const ImageWrapper = styled.div`
  margin-left: 3.2rem;
  & img {
    height: 40rem;
  }
`;
