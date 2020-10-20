import styled from 'styled-components';

export const Form = styled.form`
  padding: 8rem;

  .block--spacing {
    margin-bottom: 2.4rem;
  }

  & fieldset {
    border: 0;
    display: flex;
    flex-direction: column;

    & + fieldset {
      margin-top: 8rem;
    }
  }

  & legend {
    width: 100%;
    font-size: 3.2rem;
    padding-bottom: 3.2rem;
    margin-bottom: 3.2rem;
    border-bottom: 1px solid var(--color-input-border);
  }
`;

export const MapSection = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  overflow: hidden;
  margin-bottom: 2.4rem;

  & > span {
    height: 5.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-blue-lightest-2);
    text-decoration: none;
    color: var(--color-text-blue);
    font-size: 2rem;

    &.error {
      color: var(--color-red-error);
    }
  }
`;

export const RadioButtonSection = styled.div`
  display: flex;
  flex-direction: column;

  & span {
    font-size: 1.6rem;
    color: var(--color-input-label-text);
    font-weight: 500;
  }

  & div {
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
  }
`;

export const Checkbox = styled.div`
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

export const ImagesSection = styled.div`
  & label {
    font-size: 1.6rem;
    color: var(--color-input-label-text);
    font-weight: 500;
  }

  > div {
    margin: 0.8rem 0;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(6, 1fr);
    row-gap: 1.6rem;

    & div {
      position: relative;
      width: 9.6rem;
      height: 9.6rem;

      & img {
        height: 9.6rem;
        width: 9.6rem;
        object-fit: cover;
        border-radius: 20px;
        border: 1px solid var(--color-input-label-text);
      }

      & button {
        position: absolute;
        top: 0;
        right: 0;
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 2rem 0 2rem;
        border: 1px solid var(--color-input-border);
        background-color: var(--color-white);
        z-index: 10;
        cursor: pointer;
      }
    }

    & label {
      height: 9.6rem;
      width: 9.6rem;
      background-color: var(--color-background-light);
      border: 1px dashed var(--color-input-label-text);
      border-radius: 20px;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    & input {
      display: none;
    }
  }

  & span {
    font-size: 1.6rem;
    color: var(--color-red-error);
    font-weight: 500;
  }
`;

export const ElementWrapper = styled.div`
  margin-bottom: 2.4rem;
`;
