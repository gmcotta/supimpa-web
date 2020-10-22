import React from 'react';

import { Container } from './styles';

type InputProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  radioClassName?: string;
};

const RadioButton: React.FC<InputProps> = ({
  id,
  label,
  name,
  value,
  radioClassName,
  hasError,
  errorMessage,
  disabled,
  defaultChecked,
  onChange,
  onBlur,
}) => {
  return (
    <Container>
      <label htmlFor={id}>
        <input
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          defaultChecked={defaultChecked}
        />
        <span className={radioClassName} />
        {label}
      </label>
      {hasError && <span>{errorMessage}</span>}
    </Container>
  );
};

export default RadioButton;
