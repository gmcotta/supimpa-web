import styled from 'styled-components';

export const Container = styled.div`
  background-color: var(--color-whatsapp);
  height: 100vh;
  width: 100vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;

  & div {
    color: var(--color-light);
    & h1 {
      font-size: 6rem;
    }

    & img {
      margin: 3.6rem 0;
    }

    & p {
      font-size: 2.4rem;
    }
  }
`;
