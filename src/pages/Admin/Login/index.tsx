import React, { FormEvent, useCallback } from 'react';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../../context/AuthContext';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import logo from '../../../assets/images/logo-vertical.svg';

import { Container, ImageSection, LoginSection } from './styles';

type FormValues = {
  email: string;
  password: string;
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  }),
  handleSubmit: () => ({}),
});

const Form = (props: FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setErrors,
    setTouched,
    validateForm,
  } = props;
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (event: FormEvent, finalValues: FormValues) => {
      event.preventDefault();
      setTouched({ email: true, password: true });

      const result = await validateForm(finalValues);
      if (result.email || result.password) {
        setErrors(result);
      } else {
        signIn(finalValues);
      }
    },
    [setErrors, setTouched, signIn, validateForm],
  );

  return (
    <LoginSection onSubmit={event => handleSubmit(event, values)}>
      <h1>Fazer login</h1>
      <Input
        id="email"
        name="email"
        label="E-mail"
        value={values.email}
        onChange={(event: any) => setFieldValue('email', event.target.value)}
        hasError={touched.email && !!errors.email}
        errorMessage={errors.email}
      />
      <Input
        id="password"
        name="password"
        label="Senha"
        type="password"
        value={values.password}
        onChange={(event: any) => setFieldValue('password', event.target.value)}
        hasError={touched.password && !!errors.password}
        errorMessage={errors.password}
      />
      <SubmitButton type="submit">Entrar</SubmitButton>
    </LoginSection>
  );
};

const LoginForm = formikEnhancer(Form);

const PageContent: React.FC = () => {
  return (
    <Container>
      <ImageSection>
        <img src={logo} alt="Supimpa logo" />
      </ImageSection>
      <LoginForm />
    </Container>
  );
};

const AdminLogin = formikEnhancer(PageContent);

export default AdminLogin;
