import styled from 'styled-components';

export const Container = styled.div`
  & label {
    font-size: 1.6rem;
    color: var(--color-input-label-text);
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & input {
      display: none;
    }

    & span {
      width: 6.4rem;
      height: 2.4rem;
      border-radius: 1.6rem;
      border: 1px solid var(--color-input-border);
      background-color: var(--color-background-light);
      display: flex;
      align-items: center;
      padding: 0 0.8rem;
      cursor: pointer;
      transition: all 0.2s;

      &.checked {
        border: 1px solid var(--color-whatsapp);
        background-color: var(--color-whatsapp);
        justify-content: flex-end;
      }

      &::after {
        content: '';
        width: 2.4rem;
        height: 1.2rem;
        background-color: var(--color-gray-dark);
        border-radius: 0.8rem;
        transition: all 0.2s;
      }

      &.checked::after {
        background-color: var(--color-background-light);
      }
    }
  }
`;
