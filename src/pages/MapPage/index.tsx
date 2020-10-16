import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import grandmaIcon from '../../assets/images/grandma.svg';
import retirementHome from '../../assets/images/retirement-home.svg';
import seniorCenter from '../../assets/images/senior-center.svg';

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
    <div>
      <aside>
        <img src={grandmaIcon} alt="Vó Supimpa" />
        <h1>Escolha uma instituição no mapa</h1>
        <p>Muitos idosos precisam da sua ajuda!</p>
        <h2>Legenda</h2>
        <div>
          <div>
            <img src={retirementHome} alt="Casa de repouso" />
            <span>Casa de repouso</span>
          </div>
          <div>
            <img src={seniorCenter} alt="Centro de convivência" />
            <span>Centro de convivência</span>
          </div>
        </div>
        <strong>{`${selectedCity}-${selectedCountryState}`}</strong>
      </aside>
      <main>Mapa</main>
    </div>
  );
};

export default MapPage;
