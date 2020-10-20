import React, { useRef } from 'react';

import { Container } from './styles';

type InputProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  touched?: boolean;
  mask?: string;
  optional?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  value,
  placeholder,
  hasError,
  errorMessage,
  disabled,
  optional,
  type,
  onChange,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container hasError={hasError}>
      {label && (
        <label htmlFor={id}>
          {label}
          {!!optional && <span>{optional}</span>}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {hasError && <span>{errorMessage}</span>}
    </Container>
  );
};

export default Input;
