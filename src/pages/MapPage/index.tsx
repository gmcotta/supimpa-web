import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Map, TileLayer } from 'react-leaflet';

import grandmaIcon from '../../assets/images/grandma.svg';
import retirementHome from '../../assets/images/retirement-home.svg';
import seniorCenter from '../../assets/images/senior-center.svg';

import { Container, Aside, AsideText, MapLegend, MapContainer } from './styles';

const MapPage: React.FC = () => {
  const history = useHistory();

  const [selectedCountryState, setSelectedCountryState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const localStorageLocation = localStorage.getItem('@HOME/Location');
    if (localStorageLocation === null) {
      history.push('/');
    } else {
      const { city, state } = JSON.parse(localStorageLocation);
      setSelectedCountryState(state);
      setSelectedCity(city);
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
        </footer>
      </Aside>
      <MapContainer>
        <Map
          center={[-23.4439484, -46.5258909]}
          zoom={14}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
        </Map>
      </MapContainer>
      <Link to="/">
        <MdAdd size={40} />
      </Link>
    </Container>
  );
};

export default MapPage;
