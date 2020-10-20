import React from 'react';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import logo from '../../../assets/images/logo-vertical.svg';

import { Container, ImageSection, LoginSection } from './styles';

const AdminLogin: React.FC = () => {
  return (
    <Container>
      <ImageSection>
        <img src={logo} alt="Supimpa logo" />
      </ImageSection>
      <LoginSection>
        <h1>Fazer login</h1>
        <Input id="email" name="email" label="E-mail" />
        <Input id="password" name="password" label="Senha" type="password" />
        <SubmitButton type="button">Entrar</SubmitButton>
      </LoginSection>
    </Container>
  );
};

export default AdminLogin;
