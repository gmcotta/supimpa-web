import styled from 'styled-components';

type CheckboxProps = {
  checked?: boolean;
  hasError?: boolean;
};

export const Container = styled.label<CheckboxProps>`
  align-self: flex-start;
  display: flex;
  align-items: center;
  cursor: pointer;

  & input {
    display: none;
  }

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 4px;
    border: 1px solid
      ${props =>
        props.checked ? 'var(--color-whatsapp)' : 'var(--color-blue-dark)'};
    background-color: ${props =>
      props.checked
        ? 'var(--color-whatsapp)'
        : 'var(--color-background-light)'};

    & svg {
      display: ${props => (props.checked ? 'block' : 'none')};
      color: var(--color-light);
    }
  }

  & span {
    margin-left: 0.8rem;
    font-size: 1.6rem;
    color: var(--color-text-blue);
  }
`;

export const ErrorMessage = styled.span<CheckboxProps>`
  color: var(--color-red-error);
  font-weight: 500;
  margin-top: 0.8rem;
`;
