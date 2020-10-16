import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--color-background-light);
  display: grid;
  grid-template-columns: 30% 70%;
  position: relative;

  & > a {
    position: absolute;
    bottom: 4rem;
    right: 4rem;
    text-decoration: none;
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 0.8rem;
    background-color: var(--color-blue-light);
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;

    &:hover {
      cursor: pointer;
      background: var(--color-blue-dark);
    }

    & svg {
      color: var(--color-light);
    }
  }
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
  .leaflet-container {
    z-index: 5;
  }

  .map-popup {
    & .leaflet-popup-content-wrapper {
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 20px;
      box-shadow: none;
    }

    & .leaflet-popup-content {
      color: var(--color-blue-dark);
      font-size: 1.6rem;
      font-weight: bold;
      margin: 0.8rem 1.2rem;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    & .leaflet-popup-content a {
      width: 4rem;
      height: 4rem;
      background-color: var(--color-blue-light);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--color-blue-dark);
      }
    }

    & .leaflet-popup-content a svg {
      color: var(--color-light);
    }

    & .leaflet-popup-tip-container {
      display: none;
    }
  }
`;
