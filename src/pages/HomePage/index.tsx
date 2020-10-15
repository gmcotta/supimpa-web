import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Lottie from 'react-lottie';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import homeAnimation from '../../assets/animations/homeAnimation.json';

import {
  ModalForm,
  ModalHeading1,
  ModalHeading2,
  ModalFieldset,
  ModalButton,
  Container,
  ContentWrapper,
  ContentHeader,
  LeftContent,
  RightContent,
} from './styles';

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
  const lottieOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: homeAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }),
    [],
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [countryStates, setCountryStates] = useState<AppStateProps[]>();
  const [cities, setCities] = useState<AppCityProps[]>();
  const [selectedCountryState, setSelectedCountryState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [modalError, setModalError] = useState(false);

  const handleSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      if (name === 'app-state') setSelectedCountryState(value);
      if (name === 'app-city') setSelectedCity(value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (!selectedCountryState || !selectedCity) {
        setModalError(true);
      } else {
        setModalError(false);
        setModalIsOpen(false);
        localStorage.setItem(
          '@HOME/Location',
          JSON.stringify({ state: selectedCountryState, city: selectedCity }),
        );
        console.log(
          JSON.stringify({ state: selectedCountryState, city: selectedCity }),
        );
      }
    },
    [selectedCountryState, selectedCity],
  );

  // Check if location is already set
  useEffect(() => {
    const localStorageLocation = localStorage.getItem('@HOME/Location');
    if (localStorageLocation === null) {
      setModalIsOpen(true);
    } else {
      const { state, city } = JSON.parse(localStorageLocation);
      setSelectedCountryState(state);
      setSelectedCity(city);
    }
  }, []);

  // Get states from IBGE API
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

  // Get cities from IBGE API
  useEffect(() => {
    const localStorageLocation = localStorage.getItem('@HOME/Location');
    if (localStorageLocation === null || modalIsOpen) {
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
    }
  }, [selectedCountryState, modalIsOpen]);

  return (
    <Container>
      <ContentWrapper>
        <ContentHeader>
          <img src={logo} alt="Supimpa logo" />
          {!modalIsOpen && selectedCountryState && selectedCity && (
            <div>
              <span>{`${selectedCity} - ${selectedCountryState}`}</span>
              <button type="button" onClick={() => setModalIsOpen(true)}>
                Mudar localidade
              </button>
            </div>
          )}
        </ContentHeader>
        <main>
          <LeftContent>
            <h1>Leve felicidade para o mundo</h1>
            <div>
              <p>
                Visite casas de repouso e alegre o dia daqueles que já fizeram
                muito por nós
              </p>
              <p>
                Conheça os centros de comunidade para idosos e recomende para
                seus parentes
              </p>
            </div>
          </LeftContent>
          <RightContent>
            <Lottie
              options={lottieOptions}
              height={480}
              width={800}
              isClickToPauseDisabled
              ariaLabel="home page animation"
            />
            <Link to="/">
              Acessar
              <FiArrowRight />
            </Link>
          </RightContent>
        </main>
      </ContentWrapper>
      <Modal
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
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
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <ModalForm onSubmit={handleSubmit}>
          {}
          <ModalHeading1>Olá! Primeira vez por aqui?</ModalHeading1>
          <ModalHeading2>Diga para a gente: de onde você é?</ModalHeading2>
          <ModalFieldset>
            <select
              id="app-state"
              name="app-state"
              onChange={handleSelectChange}
            >
              {countryStates?.map(state => (
                <option key={state.id} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
            <select id="app-city" name="app-city" onChange={handleSelectChange}>
              {cities ? (
                cities?.map(city => (
                  <option key={city.id} value={city.value}>
                    {city.name}
                  </option>
                ))
              ) : (
                <option value="">Selecione uma cidade</option>
              )}
            </select>
            {modalError && <span>Por favor, preencha os dados</span>}
          </ModalFieldset>
          <ModalButton type="submit" onClick={handleSubmit}>
            Confirmar
          </ModalButton>
        </ModalForm>
      </Modal>
    </Container>
  );
};

export default HomePage;
