import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import LoginTemplate from '../../../templates/LoginTemplate';

import { LoginSection, EmailSentSection } from './styles';
import api from '../../../services/api';

type FormValues = {
  email: string;
};

const formikEnhancer = withFormik({
  mapPropsToValues: () => ({
    email: '',
  }),
  handleSubmit: () => ({}),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('E-mail no formato inválido')
      .required('E-mail obrigatório'),
  }),
});

const Form = (props: FormikProps<FormValues>) => {
  const [isEmailSend, setIsEmailSend] = useState(false);
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
      setTouched({ email: true });
      const result = await validateForm(finalValues);
      if (result.email) {
        setErrors(result);
      } else {
        api.post('/admin/forgot-password', finalValues).then(() => {
          setIsEmailSend(true);
        });
      }
    },
    [setErrors, setTouched, validateForm],
  );

  if (isEmailSend) {
    return (
      <EmailSentSection>
        <h1>E-mail enviado</h1>
        <p>
          Por favor, verifique a caixa de entrada do endereço de e-mail que usou
          para cadastro.
        </p>
        <SubmitButton
          type="button"
          onClick={() => history.push('/admin')}
          buttonColorType="success"
        >
          Voltar para login
        </SubmitButton>
      </EmailSentSection>
    );
  }

  return (
    <LoginSection onSubmit={event => handleSubmit(event, values)}>
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
