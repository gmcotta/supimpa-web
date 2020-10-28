import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Container hasError={hasError}>
      {label && (
        <label htmlFor={id}>
          <span>{label}</span>
          {!!optional && <span className="optional">{optional}</span>}
        </label>
      )}
      <div>
        <input
          type={isVisible ? 'text' : type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {type === 'password' && (
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        )}
      </div>
      {hasError && <span>{errorMessage}</span>}
    </Container>
  );
};

export default Input;
