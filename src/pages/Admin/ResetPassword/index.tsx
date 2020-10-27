import React, { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import LoginTemplate from '../../../templates/LoginTemplate';

import { LoginSection } from './styles';

type ResetPasswordParams = {
  token: string;
};

type FormValues = {
  password: string;
  confirm_password: string;
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    password: '',
    confirm_password: '',
  }),
  handleSubmit: () => {
    console.log('oi');
  },
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .min(6, 'Senha precisa ter pelo menos 6 caracteres')
      .required('Senha obrigatória'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas não batem')
      .required('Obrigatório confirmar senha'),
  }),
});

const Form = (props: FormikProps<FormValues>) => {
  const { values, touched, errors, setFieldValue, handleSubmit } = props;
  return (
    <LoginSection onSubmit={handleSubmit}>
      <h1>Redefinição de senha</h1>
      <p>Escolha uma nova senha para você acessar o dashboard do Happy</p>
      <Input
        id="password"
        name="password"
        label="Nova senha"
        type="password"
        hasError={touched.password && !!errors.password}
        errorMessage={errors.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue('password', event.target.value)
        }
        optional="Pelo menos 6 caracteres"
      />
      <Input
        id="confirm_password"
        name="confirm_password"
        label="Repetir senha"
        type="password"
        hasError={touched.confirm_password && !!errors.confirm_password}
        errorMessage={errors.confirm_password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue('confirm_password', event.target.value)
        }
      />
      <SubmitButton buttonColorType="success" type="submit">
        Enviar
      </SubmitButton>
    </LoginSection>
  );
};

const ForgotPasswordForm = formikEnhancer(Form);

const AdminResetPassword: React.FC = () => {
  const { token } = useParams() as ResetPasswordParams;
  return (
    <LoginTemplate>
      <ForgotPasswordForm />
    </LoginTemplate>
  );
};

export default AdminResetPassword;
