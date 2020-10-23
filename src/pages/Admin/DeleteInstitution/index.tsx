import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../../services/api';

import deleteImage from '../../../assets/images/grandma-delete.svg';

import { Container, ContentWrapper, ImageWrapper } from './styles';

type InstitutionRouteParams = {
  id: string;
};

const DeleteInstitution: React.FC = () => {
  const [name, setName] = useState<string>('');
  const { id } = useParams<InstitutionRouteParams>();
  const history = useHistory();

  const handleCancelRequest = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleDeleteRequest = useCallback(() => {
    api
      .delete(`/admin/institutions/delete/${id}`)
      .then(() => {
        console.log('Deleted');
        history.push('/admin/dashboard');
      })
      .catch(() => {
        console.log('error');
      });
  }, [id, history]);

  useEffect(() => {
    api.get(`/institutions/${id}`).then(response => {
      const { name: institutionName } = response.data;
      setName(institutionName);
    });
  }, [id]);

  return (
    <Container>
      <ContentWrapper>
        <h1>Excluir!</h1>
        <p>{`Você tem certeza que quer excluir ${name}?`}</p>
        <div>
          <button type="button" onClick={handleDeleteRequest}>
            Sim
          </button>
          <button type="button" onClick={handleCancelRequest}>
            Não
          </button>
        </div>
      </ContentWrapper>
      <ImageWrapper>
        <img src={deleteImage} alt="Delete institution" />
      </ImageWrapper>
    </Container>
  );
};

export default DeleteInstitution;
