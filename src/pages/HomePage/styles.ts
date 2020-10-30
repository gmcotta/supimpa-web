import styled from 'styled-components';
import { darken } from 'polished';

export const ModalForm = styled.form`
  text-align: center;
`;

export const ModalHeading1 = styled.h1`
  font-size: 4rem;
  margin-bottom: 2.4rem;
`;

export const ModalHeading2 = styled.h2`
  font-size: 3.2rem;
  margin-bottom: 2.4rem;
`;

export const ModalFieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;

  & select {
    margin-bottom: 1.6rem;
    height: 5.6rem;
    padding: 0.8rem;
    font-size: 1.6rem;
    border-radius: 8px;
    -moz-appearance: none;
    -webkit-appearance: none;

    &:hover {
      cursor: pointer;
    }
  }

  & span {
    text-align: left;
    color: var(--color-red-error);
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
`;

export const ModalButton = styled.button`
  width: 100%;
  height: 5.6rem;
  border: none;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 2rem;
  background-color: var(--color-blue-light);
  color: var(--color-light);
  transition: background-color 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${darken(0.05, '#15c3d6')};
  }
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    330deg,
    var(--color-gradient-blue-dark) 0%,
    var(--color-gradient-blue-light) 100%
  );
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 100rem;
  height: 100vh;
  padding: 4rem 0;
  margin: 0 auto;
  color: var(--color-light);

  & main {
    display: grid;
    grid-template-columns: 40% 60%;
    column-gap: 1.6rem;
    height: calc(100% - 7.2rem);
    position: relative;
  }
`;

export const ContentHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 7.2rem;

  & div {
    display: flex;
    flex-direction: column;
  }

  & span {
    font-size: 2.4rem;
    font-weight: bold;
  }

  & button {
    border: none;
    text-align: right;
    background: none;
    color: var(--color-light);
    align-self: flex-end;
    transition: background-color 0.2s;

    &:hover {
      cursor: pointer;
      color: ${darken(0.05, '#fffcf7')};
    }
  }
`;

export const LeftContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h1 {
    font-size: 6rem;
    margin: 2.4rem 0 6.4rem;
  }

  & p {
    font-size: 2.4rem;
    margin-top: 1.6rem;
  }
`;

export const RightContent = styled.section`
  & div {
    position: absolute;
    right: -7.2rem;
    top: 7.2rem;
  }
  & a {
    height: 5.6rem;
    border: none;
    border-radius: 8px;
    text-transform: uppercase;
    font-size: 2rem;
    text-decoration: none;
    background-color: var(--color-yellow);
    color: var(--color-brown);
    padding: 0.8rem 1.6rem;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: background-color 0.2s;

    position: absolute;
    bottom: 0;
    right: 0;

    &:hover {
      cursor: pointer;
      background-color: var(--color-blue-lightest);
      color: var(--color-blue-light);
      font-weight: 500;
    }

    & svg {
      margin-left: 0.8rem;
    }
  }
`;
