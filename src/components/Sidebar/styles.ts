import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    330deg,
    var(--color-gradient-blue-dark) 0%,
    var(--color-gradient-blue-light) 100%
  );
  height: 100vh;
  width: 9.6rem;
  padding: 1.6rem;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 0.8rem;
    background-color: var(--color-blue-light);
    color: var(--color-light);
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-blue-dark);
    }
  }
`;
