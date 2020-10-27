import React from 'react';
import { useParams } from 'react-router-dom';

import LoginTemplate from '../../../templates/LoginTemplate';

type ResetPasswordParams = {
  token: string;
};

const ResetPassword: React.FC = () => {
  const { token } = useParams() as ResetPasswordParams;
  return (
    <LoginTemplate>
      <h1>{token}</h1>
    </LoginTemplate>
  );
};

export default ResetPassword;
