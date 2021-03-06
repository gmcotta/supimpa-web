import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../../services/api';
import { retirementHomeIcon, seniorCenterIcon } from '../../utils/mapIcons';

import grandmaIcon from '../../assets/images/grandma.svg';
import retirementHome from '../../assets/images/retirement-home.svg';
import seniorCenter from '../../assets/images/senior-center.svg';

import { Container, Aside, AsideText, MapLegend, MapContainer } from './styles';

type BackendDataResponse = {
  data: Array<InstitutionProps>;
};

type InstitutionProps = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  retirement_or_center: string;
};

const MapPage: React.FC = () => {
  const history = useHistory();

  const [selectedCountryState, setSelectedCountryState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cityLocation, setCityLocation] = useState<[number, number]>([0, 0]);
  const [institutions, setInstitutions] = useState<InstitutionProps[]>([]);

  useEffect(() => {
    const localStorageLocation = localStorage.getItem('@Supimpa/location');
    const localStorageCoordinates = localStorage.getItem(
      '@Supimpa/coordinates',
    );
    if (localStorageLocation === null || localStorageCoordinates === null) {
      history.push('/');
    } else {
      const { city, state } = JSON.parse(localStorageLocation);
      const { latitude, longitude } = JSON.parse(localStorageCoordinates);
      setCityLocation([latitude, longitude]);
      setSelectedCountryState(state);
      setSelectedCity(city);

      api
        .get('/institutions?accepted=true')
        .then((response: BackendDataResponse) => {
          setInstitutions(response.data);
        });
    }
  }, [history]);

  return (
    <Container>
      <Aside>
        <header>
          <Link to="/">
            <img src={grandmaIcon} alt="Vó Supimpa" />
          </Link>
        </header>
        <AsideText>
          <h1>Escolha uma instituição no mapa</h1>
          <p>Muitos idosos precisam da sua ajuda!</p>
        </AsideText>
        <MapLegend>
          <h2>Legenda</h2>
          <div>
            <img src={retirementHome} alt="Casa de repouso" />
            <span>Casa de repouso</span>
          </div>
          <div>
            <img src={seniorCenter} alt="Centro de convivência" />
            <span>Centro de convivência</span>
          </div>
        </MapLegend>
        <footer>
          <strong>{`${selectedCity}-${selectedCountryState}`}</strong>
          <Link to="/">
            <FiArrowLeft size={24} />
          </Link>
        </footer>
      </Aside>
      <MapContainer>
        <Map
          center={cityLocation}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
          maxZoom={17}
          minZoom={13}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          {institutions !== [] &&
            institutions.map(institution => (
              <Marker
                key={institution.id}
                position={[institution.latitude, institution.longitude]}
                icon={
                  institution.retirement_or_center === 'retirement'
                    ? retirementHomeIcon
                    : seniorCenterIcon
                }
              >
                <Popup
                  closeButton={false}
                  minWidth={300}
                  maxWidth={300}
                  className="map-popup"
                >
                  {institution.name}
                  <Link to={`/institutions/${institution.id}`}>
                    <FiArrowRight />
                  </Link>
                </Popup>
              </Marker>
            ))}
        </Map>
      </MapContainer>
      <span
        style={{
          position: 'absolute',
          top: '3.2rem',
          right: '3.2rem',
          zIndex: 20,
        }}
      >
        {institutions?.length}
      </span>
      <Link to="/create">
        <MdAdd size={40} />
      </Link>
    </Container>
  );
};

export default MapPage;
