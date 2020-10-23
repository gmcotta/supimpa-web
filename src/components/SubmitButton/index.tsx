import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonColorType?: string;
};

const SubmitButton: React.FC<ButtonProps> = ({
  children,
  type,
  buttonColorType,
  onClick,
}) => {
  return (
    <Container type={type} buttonColorType={buttonColorType} onClick={onClick}>
      <div>{children}</div>
    </Container>
  );
};

export default SubmitButton;
