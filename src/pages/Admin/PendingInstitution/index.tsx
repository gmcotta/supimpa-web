import React, { useEffect, useState } from 'react';
import { FiFilter, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Link } from 'react-router-dom';

import api from '../../../services/api';

import AdminTemplate from '../../../templates/AdminTemplate';

import { retirementHomeIcon, seniorCenterIcon } from '../../../utils/mapIcons';
import Skeleton from '../../../skeletons/AdminDashboard';

import {
  Container,
  BoardTitle,
  InstitutionsSection,
  MapContainer,
  MapFooter,
} from './styles';

type InstitutionType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  retirement_or_center: string;
};

const Dashboard: React.FC = () => {
  const [institutions, setInstitutions] = useState<InstitutionType[]>();
  const [institutionQuantityText, setInstitutionQuantityText] = useState<
    string
  >('');

  useEffect(() => {
    api.get('/institutions?accepted=false').then(response => {
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

  if (!institutions) {
    return (
      <AdminTemplate>
        <Skeleton />
      </AdminTemplate>
    );
  }

  return (
    <AdminTemplate>
      <Container>
        <BoardTitle>
          <h1>Instituições cadastradas</h1>
          {institutions.length && (
            <div>
              <span>{institutionQuantityText}</span>
              <button type="button">
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
                  <Link to={`/admin/institutions/review/${institution.id}`}>
                    <FiArrowRight size={16} />
                  </Link>
                </div>
              </MapFooter>
            </MapContainer>
          ))}
        </InstitutionsSection>
      </Container>
    </AdminTemplate>
  );
};

export default Dashboard;
