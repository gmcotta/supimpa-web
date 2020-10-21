import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: var(--color-background);
  min-height: 100vh;
  width: 100vw;
  padding-left: 9.6rem;
`;

export const AdminSidebar = styled.aside`
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
      display: none;
      opacity: 0;
      height: 5.6rem;
      width: 28rem;
      position: absolute;
      left: calc(4.8rem + 1.6rem);
      font-size: 2rem;
      padding: 0.8rem;
      border-radius: 0.8rem;
      transition: all 0.2s;
    }

    &:hover span {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      background-color: var(--color-blue-dark);
      color: var(--color-light);
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
    display: none;
    opacity: 0;
    height: 5.6rem;
    width: 28rem;
    position: absolute;
    left: calc(4.8rem + 1.6rem);
    font-size: 2rem;
    padding: 0.8rem;
    border-radius: 0.8rem;
    transition: all 0.2s;
  }

  &:hover span {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    background-color: var(--color-blue-dark);
    color: var(--color-light);
  }

  & svg {
    color: var(--color-white);
  }

  &:hover svg {
    color: var(--color-blue-dark);
  }
`;
