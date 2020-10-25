import React from 'react';
import { MdCheck } from 'react-icons/md';

import { Container } from './styles';

type CheckboxProps = React.HTMLProps<HTMLInputElement> & {
  label: string;
  touched?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  name,
  checked,
  hasError = false,
  errorMessage,
  disabled,
  onChange,
  onBlur,
}) => {
  return (
    <Container htmlFor={id} checked={checked} hasError={hasError}>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      <div>
        <MdCheck size={12} />
      </div>
      <span>{label}</span>
    </Container>
  );
};

export default Checkbox;
