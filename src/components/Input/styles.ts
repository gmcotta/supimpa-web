import styled from 'styled-components';

type InputProps = {
  hasError?: boolean;
};

export const Container = styled.div<InputProps>`
  display: flex;
  flex-direction: column;

  & label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props =>
      props.hasError
        ? 'var(--color-red-error)'
        : 'var(--color-input-label-text)'};
    font-size: 1.6rem;
    font-weight: 500;

    & span {
      color: inherit;
      font-size: 1.2rem;
      font-weight: inherit;
    }
  }

  & input {
    background-color: var(--color-background-light);
    height: 4.8rem;
    font-size: 2rem;
    color: var(--color-text-blue);
    border: 1px solid
      ${props =>
        props.hasError
          ? 'var(--color-red-error)'
          : 'var(--color-input-border)'};
    border-radius: 4px;
    margin-top: 0.8rem;
    padding-left: 1.6rem;

    &::placeholder {
      color: var(--color-input-border);
    }

    &:disabled {
      background-color: var(--color-gray-light);
      border-color: var(--color-gray);
      cursor: not-allowed;
    }
  }

  & span {
    font-size: 1.6rem;
    color: var(--color-red-error);
    font-weight: 500;
    margin-top: 0.8rem;
  }
`;
