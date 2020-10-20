import React from 'react';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import logo from '../../../assets/images/logo-vertical.svg';

const AdminLogin: React.FC = () => {
  return (
    <div>
      <div>
        <img src={logo} alt="Supimpa logo" />
      </div>
      <div>
        <h1>Fazer login</h1>
        <Input id="email" name="email" label="E-mail" />
        <Input id="password" name="password" label="Senha" type="password" />
        <SubmitButton type="button">Entrar</SubmitButton>
      </div>
    </div>
  );
};

export default AdminLogin;
