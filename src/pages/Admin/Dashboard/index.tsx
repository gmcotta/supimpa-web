import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiFilter, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

import api from '../../../services/api';

import Checkbox from '../../../components/Checkbox';

import AdminTemplate from '../../../templates/AdminTemplate';

import grandmaChair from '../../../assets/images/grandma-chair.svg';

import { retirementHomeIcon, seniorCenterIcon } from '../../../utils/mapIcons';
import Skeleton from '../../../skeletons/AdminDashboard';

import {
  Container,
  BoardTitle,
  InstitutionsSection,
  MapContainer,
  MapFooter,
  FormContainer,
  NoInstitutionSection,
} from './styles';
import SubmitButton from '../../../components/SubmitButton';

Modal.setAppElement('#root');

type InstitutionType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  retirement_or_center: string;
};

type ModalValuesType = {
  retirement: boolean;
  center: boolean;
};

const Dashboard: React.FC = () => {
  const [institutions, setInstitutions] = useState<InstitutionType[]>();
  const [institutionQuantityText, setInstitutionQuantityText] = useState<
    string
  >('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalValues, setModalValues] = useState({
    retirement: true,
    center: true,
  });
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    api.get('/institutions?accepted=true').then(response => {
      setInstitutions(response.data);
    });
  }, []);

  useEffect(() => {
    if (institutions) {
      if (institutions.length <= 0)
        setInstitutionQuantityText('Nenhuma instituição encontrada');
      if (institutions.length === 1)
        setInstitutionQuantityText('1 instituição encontrada');
      else
        setInstitutionQuantityText(
          `${institutions.length} instituições encontradas`,
        );
    }
  }, [institutions]);

  const handleOpenModal = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    document.body.style.overflow = 'auto';
    setIsModalOpen(false);
  }, []);

  const showAPIResults = useCallback((values: ModalValuesType) => {
    if (values.center && values.retirement) {
      api.get('/institutions?accepted=true').then(response => {
        setInstitutions(response.data);
      });
      return;
    }
    if (values.retirement) {
      api
        .get('/institutions?accepted=true&retirement_or_center=retirement')
        .then(response => {
          setInstitutions(response.data);
        });
      return;
    }
    if (values.center) {
      api
        .get('/institutions?accepted=true&retirement_or_center=center')
        .then(response => {
          setInstitutions(response.data);
        });
    }
  }, []);

  if (!institutions) {
    return (
      <AdminTemplate>
        <Skeleton />
      </AdminTemplate>
    );
  }

  if (institutions.length === 0) {
    return (
      <AdminTemplate>
        <Container>
          <BoardTitle>
            <h1>Instituições cadastradas</h1>
          </BoardTitle>
          <NoInstitutionSection>
            <img src={grandmaChair} alt="" />
            <span>Nenhum no momento</span>
          </NoInstitutionSection>
        </Container>
      </AdminTemplate>
    );
  }

  const formikEnhancer = withFormik({
    mapPropsToValues: () => ({
      center: modalValues.center,
      retirement: modalValues.retirement,
    }),
    validationSchema: Yup.object().shape({
      center: Yup.boolean(),
      retirement: Yup.boolean(),
    }),
    handleSubmit: values => {
      if (values.center || values.retirement) {
        setModalError('');
        handleCloseModal();
        showAPIResults(values);
      } else {
        setModalError('Necessário escolher um tipo de instituição');
      }
    },
  });

  const Form = (props: FormikProps<ModalValuesType>) => {
    const { values, setFieldValue, handleSubmit } = props;

    const handleFieldChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFieldValue(name, checked);
        setModalValues(oldValues => ({ ...oldValues, [name]: checked }));
      },
      [setFieldValue],
    );

    return (
      <FormContainer onSubmit={handleSubmit}>
        <fieldset>
          <legend>Tipo de instituição</legend>
          <Checkbox
            id="retirement"
            name="retirement"
            checked={values.retirement}
            label="Casa de repouso"
            onChange={handleFieldChange}
          />
          <Checkbox
            id="center"
            name="center"
            checked={values.center}
            label="Centro de convivência"
            onChange={handleFieldChange}
          />
        </fieldset>
        {modalError && <span>{modalError}</span>}
        <SubmitButton type="submit" buttonColorType="success">
          Filtrar
        </SubmitButton>
      </FormContainer>
    );
  };

  const FilterForm = formikEnhancer(Form);

  return (
    <AdminTemplate>
      <Container>
        <BoardTitle>
          <h1>Instituições cadastradas</h1>
          {institutions.length && (
            <div>
              <span>{institutionQuantityText}</span>
              <button type="button" onClick={() => setIsModalOpen(true)}>
                <FiFilter size={16} />
              </button>
            </div>
          )}
        </BoardTitle>
        <InstitutionsSection>
          {institutions.map(institution => (
            <MapContainer key={institution.id}>
              <div style={{ width: '100%', height: 240 }}>
                <Map
                  center={[institution.latitude, institution.longitude]}
                  zoom={15}
                  style={{ width: '100%', height: '100%' }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker
                    interactive={false}
                    position={[institution.latitude, institution.longitude]}
                    icon={
                      institution.retirement_or_center === 'retirement'
                        ? retirementHomeIcon
                        : seniorCenterIcon
                    }
                  />
                </Map>
              </div>
              <MapFooter>
                <span>{institution.name}</span>
                <div>
                  <Link to={`/admin/institutions/edit/${institution.id}`}>
                    <FiEdit3 size={16} />
                  </Link>
                  <Link to={`/admin/institutions/delete/${institution.id}`}>
                    <FiTrash2 size={16} />
                  </Link>
                </div>
              </MapFooter>
            </MapContainer>
          ))}
        </InstitutionsSection>
      </Container>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={handleOpenModal}
        shouldCloseOnOverlayClick
        onRequestClose={handleCloseModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
            backgroundColor: 'var(--color-background-light)',
            padding: '8rem',
            zIndex: 10000,
            maxHeight: '64rem',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 9000,
          },
        }}
      >
        <FilterForm />
      </Modal>
    </AdminTemplate>
  );
};

export default Dashboard;
