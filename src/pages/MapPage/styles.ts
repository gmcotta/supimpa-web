import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--color-background-light);
  display: grid;
  grid-template-columns: 30% 70%;
`;

export const Aside = styled.aside`
  padding: 4rem;
  background: linear-gradient(
    330deg,
    var(--color-gradient-blue-dark) 0%,
    var(--color-gradient-blue-light) 100%
  );
  color: var(--color-light);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  & header {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  & footer {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 2.4rem;
  }
`;

export const AsideText = styled.div`
  & h1 {
    font-size: 4rem;
    font-weight: 700;
  }

  & p {
    font-size: 2.4rem;
    margin-top: 1.6rem;
  }
`;

export const MapLegend = styled.div`
  & h2 {
    font-size: 2.4rem;
    margin-bottom: 1.6rem;
  }

  & div {
    display: flex;
    align-items: center;
    margin-bottom: 1.6rem;

    & img {
      width: 4rem;
    }

    & span {
      margin-left: 0.8rem;
      font-size: 1.6rem;
    }
  }
`;

export const MapContainer = styled.main`
  position: relative;

  & a {
    position: absolute;
    bottom: 4rem;
    right: 4rem;
    text-decoration: none;

    &:hover {
      cursor: pointer;
    }
  }
`;
