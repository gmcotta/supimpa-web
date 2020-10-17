import styled from 'styled-components';

type TextareaProps = {
  hasError?: boolean;
};

type CounterProps = {
  status?: string;
};

type StatusProps = {
  [key: string]: string;
};

export const Container = styled.div<TextareaProps>`
  display: flex;
  max-width: 100%;
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

  & textarea {
    resize: none;
    height: 16.8rem;
    font-size: 2rem;
    color: var(--color-text-blue);
    background-color: var(--color-white);
    border: 1px solid
      ${props =>
        props.hasError
          ? 'var(--color-red-error)'
          : 'var(--color-input-border)'};
    border-radius: 4px;
    margin: 0.8rem 0;
    padding: 0.8rem;

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
    clear: both;
  }
`;

const statusColors: StatusProps = {
  // min: 'var(--color-red-error)',
  min: 'var(--color-text-blue)',
  ok: 'var(--color-text-blue)',
  caution: 'var(--color-yellow)',
  danger: 'var(--color-orange)',
  max: 'var(--color-red-error)',
};

export const CharCounter = styled.div<CounterProps>`
  color: ${props => props.status !== undefined && statusColors[props.status]};
  text-align: right;
  font-size: 1.2rem;
  float: right;
`;
