import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 60% 40%;
`;

export const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    330deg,
    var(--color-gradient-blue-dark) 0%,
    var(--color-gradient-blue-light) 100%
  );

  & h1 {
    color: var(--color-light);
    font-weight: 800;
    text-transform: uppercase;
    font-size: 8rem;
    margin-top: 3.2rem;
  }
`;

export const LoginSection = styled.form`
  padding: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h1 {
    font-size: 3.2rem;
    font-weight: 600;
    color: var(--color-text-blue);
    margin-bottom: 4rem;
  }

  & div {
    margin-bottom: 2.4rem;
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red-error);
    font-weight: 500;
    margin-bottom: 2.4rem;
  }
`;
