import styled from 'styled-components';

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

  > div {
    margin-bottom: 2.4rem;

    &:nth-child(4) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red-error);
    font-weight: 500;
    margin-bottom: 2.4rem;
  }

  & a {
    text-decoration: none;
    color: var(--color-text-blue);
    font-size: 1.4rem;
  }
`;
