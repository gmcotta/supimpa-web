import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';

import DefaultTemplate from '../../templates/DefaultTemplate';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import { retirementHomeIcon, seniorCenterIcon } from '../../utils/mapIcons';

import { Form, MapSection } from './styles';

const CreateInstitution: React.FC = () => {
  const initialValues = useMemo(
    () => ({
      name: '',
      latitude: 0,
      longitude: 0,
      about: '',
      retirement_or_center: '',
      instructions: '',
      working_hours: '',
      open_on_weekends: true,
      images: [],
    }),
    [],
  );
  const initialErrors = useMemo(
    () => ({
      name: '',
      latitude: '',
      longitude: '',
      about: '',
      retirement_or_center: '',
      instructions: '',
      working_hours: '',
      open_on_weekends: '',
      images: '',
    }),
    [],
  );
  const initialTouched = useMemo(
    () => ({
      name: false,
      latitude: false,
      longitude: false,
      about: false,
      retirement_or_center: false,
      instructions: false,
      working_hours: false,
      open_on_weekends: false,
      images: false,
    }),
    [],
  );

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setValues(oldValues => ({ ...oldValues, latitude: lat, longitude: lng }));
  }, []);

  const handleChange = useCallback(event => {
    const fieldName = event.target.getAttribute('name');
    const fieldType = event.target.getAttribute('type');

    if (fieldType === 'checkbox') {
      const { checked } = event.target;
      setValues(oldValues => ({ ...oldValues, [fieldName]: checked }));
    } else {
      const { value } = event.target;
      setValues(oldValues => ({ ...oldValues, [fieldName]: value }));
    }
  }, []);

  const defineErrorMessage = useCallback((key: string, message: string) => {
    setErrors(oldErrors => ({ ...oldErrors, [key]: message }));
  }, []);

  const handleBlur = useCallback(event => {
    const fieldName = event.target.getAttribute('name');
    setTouched(oldTouched => ({ ...oldTouched, [fieldName]: true }));
  }, []);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

  useEffect(() => {
    if (!values.name) defineErrorMessage('name', 'Campo obrigatório');
    else defineErrorMessage('name', '');
    if (!values.about) defineErrorMessage('about', 'Campo obrigatório');
    else defineErrorMessage('about', '');
  }, [values, defineErrorMessage]);

  return (
    <DefaultTemplate>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dados</legend>
          <MapSection>
            <div style={{ width: '100%', height: 320 }}>
              <Map
                // center={[-23.4439484, -46.5258909]}
                center={[-23.4439484, -46.5258909]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
                onClick={handleMapClick}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  icon={retirementHomeIcon}
                  position={[values.latitude, values.longitude]}
                />
              </Map>
            </div>
            <span>Clique no mapa para adicionar a localização</span>
          </MapSection>
          <Input
            id="name"
            label="Nome"
            name="name"
            value={values.name}
            onChange={event => handleChange(event)}
            onBlur={event => handleBlur(event)}
            hasError={touched.name && !!errors.name}
            errorMessage={errors.name}
            optional="Teste opcional"
          />
          <Textarea
            id="about"
            label="Sobre"
            name="about"
            value={values.about}
            onChange={event => handleChange(event)}
            onBlur={event => handleBlur(event)}
            minLength={0}
            maxLength={300}
            hasError={touched.about && !!errors.about}
            errorMessage={errors.about}
            hasCounter
            optional="Máximo de 300 caracteres"
          />
          <label htmlFor="name">
            Nome
            <input type="text" id="name" name="name" />
          </label>
          <div>
            <div>
              <span>Tipo de instituição</span>
              <input
                type="radio"
                name="retirement_or_center"
                id="retirement"
                value="retirement"
                defaultChecked
              />
              <label htmlFor="retirement">Casa de repouso</label>
            </div>
            <div>
              <input
                type="radio"
                name="retirement_or_center"
                id="center"
                value="center"
              />
              <label htmlFor="center">Centro de convivência</label>
            </div>
          </div>
          <label htmlFor="about">
            Sobre
            <span>Máximo de 300 caracteres</span>
            <textarea id="about" maxLength={300} name="about" />
          </label>
          <label htmlFor="phone">
            Número de Whatsapp
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="__ _____-____"
            />
          </label>
          <div>Fotos</div>
        </fieldset>
        <fieldset>
          <legend>Visitação</legend>
          <label htmlFor="instructions">
            Instruções
            <textarea id="instructions" name="instructions" />
          </label>
          <label htmlFor="working_hours">
            Número de Whatsapp
            <input
              type="text"
              id="working_hours"
              name="working_hours"
              placeholder="Exemplo: Das 8h às 17h"
            />
          </label>
          <label htmlFor="open_on_weekends">
            Atende fim de semana?
            <input
              type="checkbox"
              name="open_on_weekends"
              id="open_on_weekends"
            />
          </label>
        </fieldset>
        <button type="submit">Confirmar</button>
      </Form>
    </DefaultTemplate>
  );
};

export default CreateInstitution;
