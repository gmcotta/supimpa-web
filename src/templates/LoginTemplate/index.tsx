import React from 'react';

import logo from '../../assets/images/logo-vertical.svg';

import { Container, ImageSection } from './styles';

const LoginTemplate: React.FC = ({ children }) => {
  return (
    <div>
      <Container>
        <ImageSection>
          <img src={logo} alt="Supimpa logo" />
          <h1>Admin</h1>
        </ImageSection>
        {children}
      </Container>
    </div>
  );
};

export default LoginTemplate;
