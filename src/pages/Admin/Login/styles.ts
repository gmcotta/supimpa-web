import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 60% 40%;
`;

export const ImageSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    330deg,
    var(--color-gradient-blue-dark) 0%,
    var(--color-gradient-blue-light) 100%
  );
`;

export const LoginSection = styled.section`
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
`;
