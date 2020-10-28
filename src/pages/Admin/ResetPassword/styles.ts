import styled from 'styled-components';

export const LoginSection = styled.form`
  padding: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h1,
  p {
    font-size: 3.2rem;
    font-weight: 600;
    color: var(--color-text-blue);
    margin-bottom: 4rem;
  }

  & p {
    font-size: 1.8rem;
    font-weight: 500;
  }

  > div {
    margin-bottom: 2.4rem;
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red-error);
    font-weight: 500;
    margin-bottom: 2.4rem;
  }
`;

export const ResetSuccessSection = styled.section`
  padding: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h1,
  p {
    font-size: 3.2rem;
    font-weight: 600;
    color: var(--color-text-blue);
    margin-bottom: 4rem;
  }

  & p {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;
