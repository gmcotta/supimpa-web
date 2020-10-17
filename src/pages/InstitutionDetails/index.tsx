import React, { useCallback, useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';

import Sidebar from '../../components/Sidebar';

import { retirementHomeIcon, seniorCenterIcon } from '../../utils/mapIcons';
import api from '../../services/api';

import {
  Container,
  InstitutionCard,
  ImagesSection,
  ImagesSelector,
  ContentSection,
  MapSection,
  InstructionCardsWrapper,
  WorkingHoursCard,
  WorkOnWeekendsCard,
  WhatsappButton,
} from './styles';

type InstitutionRouteParams = {
  id: string;
};

type InstitutionProps = {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  retirement_or_center: string;
  phone: string;
  formattedPhone: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
};

const InstitutionDetails: React.FC = () => {
  const [institution, setInstitution] = useState<InstitutionProps>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { id } = useParams<InstitutionRouteParams>();

  const formatPhoneNumber = useCallback((phone: string) => {
    return phone.replace(/[\s-]/g, '');
  }, []);

  useEffect(() => {
    api.get(`/institutions/${id}`).then(response => {
      const { data } = response;
      setInstitution({
        ...data,
        formattedPhone: formatPhoneNumber(data.phone),
      });
    });
  }, [id, formatPhoneNumber]);

  if (!institution) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Sidebar />
      <InstitutionCard>
        <ImagesSection>
          <img
            src={institution.images[selectedImageIndex].url}
            alt="imagem selecionada"
          />
          <ImagesSelector>
            {institution.images.map((image, index) => (
              <button
                type="button"
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={selectedImageIndex === index ? 'active' : ''}
              >
                <img src={image.url} alt={`${institution.name}-${index + 1}`} />
              </button>
            ))}
          </ImagesSelector>
        </ImagesSection>
        <ContentSection>
          <h1>{institution.name}</h1>
          <p>{institution.about}</p>
          <MapSection>
            <div style={{ width: '100%', height: 320 }}>
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
            <a
              href={`https://maps.google.com/?q=${institution.latitude},${institution.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver rotas no Google Maps
            </a>
          </MapSection>
          <h2>Instruções para visita</h2>
          <p>{institution.instructions}</p>
          <InstructionCardsWrapper>
            <WorkingHoursCard>
              <FiClock size={32} />
              <div>
                <span>Horário de funcionamento</span>
                <span>{institution.opening_hours}</span>
              </div>
            </WorkingHoursCard>
            <WorkOnWeekendsCard workOnWeekends={institution.open_on_weekends}>
              <FiInfo size={32} />
              <div>
                <span>
                  {institution.open_on_weekends
                    ? 'Atendemos '
                    : 'Não atendemos '}
                </span>
                <span>no final de semana</span>
              </div>
            </WorkOnWeekendsCard>
          </InstructionCardsWrapper>
          <WhatsappButton
            href={`https://api.whatsapp.com/send?phone=+55${institution.formattedPhone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
            Entrar em contato
          </WhatsappButton>
        </ContentSection>
      </InstitutionCard>
    </Container>
  );
};

export default InstitutionDetails;
