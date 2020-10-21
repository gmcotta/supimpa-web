import React from 'react';
import { FiFilter, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import AdminTemplate from '../../../templates/AdminTemplate';

import { retirementHomeIcon, seniorCenterIcon } from '../../../utils/mapIcons';

import {
  Container,
  BoardTitle,
  MapSection,
  MapContainer,
  MapFooter,
} from './styles';

const Dashboard: React.FC = () => {
  return (
    <AdminTemplate>
      <Container>
        <BoardTitle>
          <h1>Instituições cadastradas</h1>
          <div>
            <button type="button">
              <FiFilter size={16} />
            </button>
            <span>2 instituições</span>
          </div>
        </BoardTitle>
        <MapSection>
          <MapContainer>
            <div style={{ width: '100%', height: 240 }}>
              <Map
                center={[-23.23, -46.46]}
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
                  position={[-23.23, -46.46]}
                  icon={seniorCenterIcon}
                />
              </Map>
            </div>
            <MapFooter>
              <span>Casa de repouso</span>
              <div>
                <button type="button">
                  <FiEdit3 size={16} />
                </button>
                <button type="button">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </MapFooter>
          </MapContainer>
        </MapSection>
      </Container>
    </AdminTemplate>
  );
};

export default Dashboard;
