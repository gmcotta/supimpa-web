import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

type IBGEStateResponse = {
  sigla: string;
  nome: string;
};

type IBGECityResponse = {
  nome: string;
};

type AppStateProps = {
  id: number;
  name: string;
  abbreviation: string;
};

type AppCityProps = {
  id: number;
  name: string;
  value: string;
};

const HomePage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [countryStates, setCountryStates] = useState<AppStateProps[]>();
  const [cities, setCities] = useState<AppCityProps[]>();
  const [selectedCountryState, setSelectedCountryState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      if (name === 'app-state') setSelectedCountryState(value);
      if (name === 'app-city') setSelectedCity(value);
    },
    [],
  );

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const stateList = response.data.map(
          (item: IBGEStateResponse, index: number) => ({
            id: index + 1,
            name: item.nome,
            abbreviation: item.sigla,
          }),
        );
        let orderedStateList = stateList.sort(
          (a: AppStateProps, b: AppStateProps) => {
            if (a.abbreviation > b.abbreviation) return 1;
            if (a.abbreviation < b.abbreviation) return -1;
            return 0;
          },
        );
        orderedStateList = [
          { id: 0, name: 'Selecione um estado', abbreviation: '' },
          ...orderedStateList,
        ];

        setCountryStates(orderedStateList);
      });
  }, []);

  useEffect(() => {
    setCities([]);
    setSelectedCity('');
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedCountryState}/municipios`,
      )
      .then(response => {
        const cityList = response.data.map(
          (item: IBGECityResponse, index: number) => ({
            id: index + 1,
            name: item.nome,
            value: item.nome,
          }),
        );
        console.log(cityList);
        let orderedCityList = cityList.sort(
          (a: AppCityProps, b: AppCityProps) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          },
        );
        orderedCityList = [
          { id: 0, name: 'Selecione uma cidade', value: '' },
          ...orderedCityList,
        ];
        setCities(orderedCityList);
      });
  }, [selectedCountryState]);

  return (
    <div>
      <h1>Home Page</h1>
      <Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false}>
        <h1>Modal</h1>
        <select id="app-state" name="app-state" onChange={handleSelectChange}>
          {countryStates?.map(state => (
            <option key={state.id} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </select>
        <select id="app-city" name="app-city" onChange={handleSelectChange}>
          {cities?.map(city => (
            <option key={city.id} value={city.value}>
              {city.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setModalIsOpen(false)}>
          Confirmar
        </button>
      </Modal>
    </div>
  );
};

export default HomePage;
