import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

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
  const [signInError, setSignInError] = useState(false);
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setErrors,
    setTouched,
    validateForm,
    resetForm,
  } = props;
  const { user, signIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/admin/dashboard');
    }
  }, [user, history]);

  const handleSubmit = useCallback(
    async (event: FormEvent, finalValues: FormValues) => {
      event.preventDefault();
      setTouched({ email: true, password: true });

      const result = await validateForm(finalValues);
      if (result.email || result.password) {
        setErrors(result);
      } else {
        signIn(finalValues);
        const rawUser = localStorage.getItem('@Supimpa:admin/user');
        const token = localStorage.getItem('@Supimpa:admin/token');
        if (rawUser && token) {
          setSignInError(false);
          history.push('/admin/dashboard');
        } else {
          setSignInError(true);
          resetForm();
        }
      }
    },
    [history, setErrors, setTouched, signIn, validateForm, resetForm],
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
      {signInError && <span>E-mail ou senha inválida</span>}
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
        <h1>Admin</h1>
      </ImageSection>
      <LoginForm />
    </Container>
  );
};

const AdminLogin = formikEnhancer(PageContent);

export default AdminLogin;
