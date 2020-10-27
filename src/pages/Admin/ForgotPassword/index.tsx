import React, { ChangeEvent } from 'react';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import LoginTemplate from '../../../templates/LoginTemplate';

import { LoginSection } from './styles';

type FormValues = {
  email: string;
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    email: '',
  }),
  handleSubmit: () => {
    console.log('oi');
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('E-mail no formato inválido')
      .required('E-mail obrigatório'),
  }),
});

const Form = (props: FormikProps<FormValues>) => {
  const { values, touched, errors, setFieldValue, handleSubmit } = props;
  return (
    <LoginSection onSubmit={handleSubmit}>
      <h1>Esqueci a senha</h1>
      <p>Sua redefinição de senha será enviada para o e-mail cadastrado.</p>
      <Input
        id="email"
        name="email"
        label="E-mail"
        value={values.email}
        hasError={touched.email && !!errors.email}
        errorMessage={errors.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue('email', event.target.value)
        }
      />
      <SubmitButton buttonColorType="success" type="submit">
        Enviar
      </SubmitButton>
    </LoginSection>
  );
};

const ForgotPasswordForm = formikEnhancer(Form);

const AdminForgotPassword: React.FC = () => {
  return (
    <LoginTemplate>
      <ForgotPasswordForm />
    </LoginTemplate>
  );
};

export default AdminForgotPassword;
