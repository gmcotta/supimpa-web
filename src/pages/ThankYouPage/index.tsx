import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import eldersPartying from '../../assets/images/elders-partying.svg';

import { Container } from './styles';

const ThankYouPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/map');
    }, 5000);
  }, [history]);

  return (
    <Container>
      <div>
        <h1>Ebaaa!</h1>
        <img src={eldersPartying} alt="Imagem de obrigado" />
        <p>
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          <br />
          Agora é só esperar :)
        </p>
      </div>
    </Container>
  );
};

export default ThankYouPage;
