import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

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
          <img src={grandmaIcon} alt="Vó Supimpa" />
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
        Mapa
        <Link to="/">
          <MdAdd size={40} />
        </Link>
      </MapContainer>
    </Container>
  );
};

export default MapPage;
