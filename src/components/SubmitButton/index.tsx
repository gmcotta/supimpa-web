import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

const SubmitButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  type,
}) => {
  return <Container type={type}>{children}</Container>;
};

export default SubmitButton;
