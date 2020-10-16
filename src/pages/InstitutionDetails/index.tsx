import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';

import { retirementHomeIcon, seniorCenterIcon } from '../../utils/mapIcons';
import api from '../../services/api';

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
  const { id } = useParams<InstitutionRouteParams>();

  useEffect(() => {
    api.get(`/institutions/${id}`).then(response => {
      setInstitution(response.data);
    });
  }, [id]);

  if (!institution) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <img src={institution.images[0].url} alt="imagem selecionada" />
      <div>
        {institution.images.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt={`${institution.name}-${index + 1}`}
          />
        ))}
      </div>
      <h1>{institution.name}</h1>
      <p>{institution.about}</p>
      <div>
        <div style={{ width: 500, height: 300 }}>
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
        <footer>
          <a
            href={`https://maps.google.com/?q=${institution.latitude},${institution.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver rotas no Google Maps
          </a>
        </footer>
      </div>
      <h2>Instruções para visita</h2>
      <p>{institution.instructions}</p>
      <div>
        <div>
          <FiClock />
          <div>
            <span>Horário de funcionamento</span>
            <span>{institution.opening_hours}</span>
          </div>
        </div>
        <div>
          <FiInfo />
          <div>
            <span>
              {institution.open_on_weekends ? 'Atendemos ' : 'Não atendemos '}
              no final de semana
            </span>
          </div>
        </div>
      </div>
      <a
        href="https://api.whatsapp.com/send?phone=5511994150535"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
        Entrar em contato
      </a>
    </div>
  );
};

export default InstitutionDetails;
