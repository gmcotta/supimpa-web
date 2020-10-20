import React from 'react';

import { Container } from './styles';

type ButtonProps =
  | HTMLButtonElement
  | {
      children?: string;
    };

const SubmitButton: React.FC<ButtonProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default SubmitButton;
