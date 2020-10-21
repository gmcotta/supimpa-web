import styled, { css, keyframes } from 'styled-components';

const shimmerAnimation = keyframes`
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: -125% 0%;
  }
`;

const shimmerEffect = css`
  background: linear-gradient(-90deg, #d3e2e5 0%, #ededed 50%, #d3e2e5 100%);
  background-size: 400% 400%;
  animation: ${shimmerAnimation} 1.25s ease-in-out infinite;
`;

export const Container = styled.div`
  padding: 8rem 0;
`;

export const BoardTitle = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-input-border);
  padding-bottom: 2.4rem;

  & div:nth-child(1) {
    ${shimmerEffect}
    width: 32rem;
    height: 3.2rem;
  }

  & div:nth-child(2) {
    display: flex;
    align-items: flex-end;

    span:nth-child(1) {
      ${shimmerEffect}
      width: 8rem;
      height: 1.6rem;
      margin-right: 1.6rem;
    }

    span:nth-child(2) {
      ${shimmerEffect}
      width: 3.2rem;
      height: 3.2rem;
    }
  }
`;

export const InstitutionsSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3.2rem;
  row-gap: 3.2rem;
  margin-top: 4rem;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 23rem;
  ${shimmerEffect}
  border-radius: 0.8rem;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
`;

export const MapFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--color-white);
  padding: 1.6rem;

  & span {
    width: 16rem;
    height: 2rem;
    ${shimmerEffect}
  }

  & div {
    display: flex;
    flex-direction: row;

    & span {
      width: 3.2rem;
      height: 3.2rem;
      ${shimmerEffect}
    }

    & span + span {
      margin-left: 0.8rem;
    }
  }
`;
