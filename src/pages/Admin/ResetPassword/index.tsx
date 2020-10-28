import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { AxiosError } from 'axios';
import api from '../../../services/api';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import LoginTemplate from '../../../templates/LoginTemplate';

import { LoginSection, ResetSuccessSection } from './styles';

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
  handleSubmit: () => ({}),
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
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const { token } = useParams() as ResetPasswordParams;
  const history = useHistory();

  const {
    values,
    touched,
    errors,
    setFieldValue,
    setTouched,
    setErrors,
    validateForm,
  } = props;

  const handleSubmit = useCallback(
    async (event: FormEvent, finalValues: FormValues) => {
      event.preventDefault();
      setTouched({ password: true, confirm_password: true });
      const result = await validateForm(finalValues);
      if (result.password || result.confirm_password) {
        setErrors(result);
      } else {
        api
          .post('/admin/reset-password', { ...finalValues, token })
          .then(() => {
            setIsPasswordReset(true);
          })
          .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
              setPasswordError(
                'Não pode redefinir nova senha com senha antiga',
              );
            }
          });
      }
    },
    [token, setErrors, setTouched, validateForm],
  );

  if (isPasswordReset) {
    return (
      <ResetSuccessSection>
        <h1>Senha redefinida</h1>
        <p>
          Sua senha foi redefinida com sucesso. Por favor, volte para a tela de
          log in para acessar o dashboard.
        </p>
        <SubmitButton
          type="button"
          onClick={() => history.push('/admin')}
          buttonColorType="success"
        >
          Voltar para login
        </SubmitButton>
      </ResetSuccessSection>
    );
  }

  return (
    <LoginSection onSubmit={event => handleSubmit(event, values)}>
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
      {passwordError && <span>{passwordError}</span>}
      <SubmitButton buttonColorType="success" type="submit">
        Enviar
      </SubmitButton>
    </LoginSection>
  );
};

const ForgotPasswordForm = formikEnhancer(Form);

const AdminResetPassword: React.FC = () => {
  return (
    <LoginTemplate>
      <ForgotPasswordForm />
    </LoginTemplate>
  );
};

export default AdminResetPassword;
