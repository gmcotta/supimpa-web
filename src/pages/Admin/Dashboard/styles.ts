import styled from 'styled-components';

export const Container = styled.div`
  padding: 8rem 0;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const BoardTitle = styled.section`
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-input-border);
  padding-bottom: 2.4rem;

  & h1 {
    font-size: 3.2rem;
    color: var(--color-title-dark-blue);
  }

  & div {
    display: flex;
    align-items: flex-end;

    & button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.2rem;
      height: 3.2rem;
      border: none;
      border-radius: 0.8rem;
      background-color: var(--color-blue-dark);
      color: var(--color-light);
      cursor: pointer;
      transition: color background-color 0.2s;

      &:hover {
        background-color: var(--color-yellow);
        color: var(--color-blue-dark);
      }
    }

    & span {
      font-size: 1.6rem;
      color: var(--color-text-blue);
      margin-right: 1.6rem;
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
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  overflow: hidden;
`;

export const MapFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white);
  padding: 2.4rem;
  height: 100%;

  > span {
    font-size: 2rem;
    color: var(--color-text-blue);
  }

  & div {
    display: flex;
    flex-direction: row;

    & a + a {
      margin-left: 0.8rem;
    }
  }

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.2rem;
    height: 3.2rem;
    border: none;
    border-radius: 0.8rem;
    background-color: var(--color-background);
    color: var(--color-blue-light);
    cursor: pointer;
    transition: color background-color 0.2s;

    &:hover {
      background-color: var(--color-gray);
      color: var(--color-blue-dark);
    }
  }
`;

export const FormContainer = styled.form`
  width: 64rem;

  & fieldset {
    border: 0;
    display: flex;
    flex-direction: column;

    > label {
      margin-bottom: 2.4rem;
    }
  }

  & legend {
    width: 100%;
    font-size: 3.2rem;
    padding-bottom: 3.2rem;
    margin-bottom: 3.2rem;
    border-bottom: 1px solid var(--color-input-border);
    color: var(--color-title-dark-blue);
    font-weight: 500;
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red-error);
    font-weight: 500;
  }

  > button {
    margin-top: 2.4rem;
  }
`;

export const NoInstitutionSection = styled.section`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    height: 8rem;
  }

  & span {
    font-size: 2rem;
    color: var(--color-text-blue);
    margin: 1.6rem;
  }
`;
