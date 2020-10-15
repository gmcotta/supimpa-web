import styled from 'styled-components';

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
    height: 4rem;
    padding: 0.8rem;
    font-size: 1.6rem;
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
  height: 4rem;
  border: none;
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 2rem;
  background-color: var(--color-blue-light);
  color: var(--color-light);
`;
