import React from 'react';

import { Container } from './styles';

type InputProps = React.HTMLProps<HTMLInputElement> & {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  checkedClassName?: string;
};

const SwitchButton: React.FC<InputProps> = ({
  id,
  checkedClassName,
  name,
  label,
  defaultChecked,
  onChange,
  onBlur,
}) => {
  return (
    <Container>
      <label htmlFor={id}>
        {label}
        <span className={checkedClassName} />
        <input
          type="checkbox"
          name={name}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          defaultChecked={defaultChecked}
        />
      </label>
    </Container>
  );
};

export default SwitchButton;
