import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 0.8rem;

  & label {
    display: flex;
    align-items: center;
    color: var(--color-text-blue);
    font-size: 2rem;
    cursor: pointer;

    & span {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 1px solid var(--color-input-border);
      margin-right: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;

      &.selected {
        border: 1px solid var(--color-blue-light);
        transition: all 0.2s;
      }

      &.selected::after {
        content: '';
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background-color: var(--color-blue-light);
      }
    }
  }

  & input {
    display: none;
  }
`;
