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

    & span {
      color: ${props =>
        props.hasError
          ? 'var(--color-red-error)'
          : 'var(--color-input-label-text)'};
      font-size: 1.6rem;
      font-weight: 500;

      &.optional {
        font-size: 1.2rem;
      }
    }
  }

  & div {
    position: relative;
    margin-top: 0.8rem;
    display: flex;
    align-items: center;

    & input {
      background-color: var(--color-background-light);
      width: 100%;
      height: 4.8rem;
      font-size: 2rem;
      color: var(--color-text-blue);
      border: 1px solid
        ${props =>
          props.hasError
            ? 'var(--color-red-error)'
            : 'var(--color-input-border)'};
      border-radius: 4px;
      padding-left: 1.6rem;
      padding-right: 4.8rem;

      &::placeholder {
        color: var(--color-input-border);
      }

      &:disabled {
        background-color: var(--color-gray-light);
        border-color: var(--color-gray);
        cursor: not-allowed;
      }
    }

    & button {
      position: absolute;
      right: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;
      margin-right: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;

      & svg {
        color: var(--color-text-blue);
      }
    }
  }

  > span {
    font-size: 1.6rem;
    color: var(--color-red-error);
    font-weight: 500;
    margin-top: 0.8rem;
  }
`;
