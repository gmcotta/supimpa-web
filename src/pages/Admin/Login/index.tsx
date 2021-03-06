import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';

import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import SubmitButton from '../../../components/SubmitButton';

import LoginTemplate from '../../../templates/LoginTemplate';

import { LoginSection } from './styles';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    rememberMe: false,
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    rememberMe: Yup.boolean(),
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
        const isSignInSuccessful = await signIn(finalValues);

        if (isSignInSuccessful) {
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
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue('email', event.target.value)
        }
        hasError={touched.email && !!errors.email}
        errorMessage={errors.email}
      />
      <Input
        id="password"
        name="password"
        label="Senha"
        type="password"
        value={values.password}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFieldValue('password', event.target.value)
        }
        hasError={touched.password && !!errors.password}
        errorMessage={errors.password}
      />
      <div>
        <Checkbox
          id="rememberMe"
          name="rememberMe"
          label="Lembrar-me"
          checked={values.rememberMe}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFieldValue('rememberMe', event.target.checked)
          }
        />
        <Link to="/admin/forgot-password">Esqueci minha senha</Link>
      </div>
      {signInError && <span>E-mail ou senha inválida</span>}
      <SubmitButton type="submit" buttonColorType="success">
        Entrar
      </SubmitButton>
    </LoginSection>
  );
};

const LoginForm = formikEnhancer(Form);

const PageContent: React.FC = () => {
  return (
    <LoginTemplate>
      <LoginForm />
    </LoginTemplate>
  );
};

const AdminLogin = formikEnhancer(PageContent);

export default AdminLogin;
