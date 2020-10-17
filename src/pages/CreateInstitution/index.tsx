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

import { Form, MapSection, RadioButtonSection, Checkbox } from './styles';

const CreateInstitution: React.FC = () => {
  const initialValues = useMemo(
    () => ({
      name: '',
      latitude: 0,
      longitude: 0,
      about: '',
      phone: '',
      retirement_or_center: 'retirement',
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
      phone: '',
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
      phone: false,
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

  const handlePhoneChange = useCallback(event => {
    const fieldName = event.target.getAttribute('name');
    let { value } = event.target;
    if (typeof value === 'string') {
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1');
    }
    setValues(oldValues => ({ ...oldValues, [fieldName]: value }));
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

    if (!values.phone) defineErrorMessage('phone', 'Campo obrigatório');
    if (!values.phone.match(/^\d{2} \d{4,5}-\d{4}$/)) {
      defineErrorMessage('phone', 'Telefone no padrão incorreto');
    } else defineErrorMessage('phone', '');
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
                  icon={
                    values.retirement_or_center === 'retirement'
                      ? retirementHomeIcon
                      : seniorCenterIcon
                  }
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
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.name && !!errors.name}
            errorMessage={errors.name}
          />
          <RadioButtonSection>
            <span>Tipo de instituição</span>
            <div>
              <label htmlFor="retirement">
                <input
                  type="radio"
                  name="retirement_or_center"
                  id="retirement"
                  value="retirement"
                  onChange={handleChange}
                />
                <span
                  className={
                    values.retirement_or_center === 'retirement'
                      ? 'selected'
                      : ''
                  }
                />
                Casa de repouso
              </label>
            </div>
            <div>
              <label htmlFor="center">
                <input
                  type="radio"
                  name="retirement_or_center"
                  id="center"
                  value="center"
                  onChange={handleChange}
                />
                <span
                  className={
                    values.retirement_or_center === 'center' ? 'selected' : ''
                  }
                />
                Centro de convivência
              </label>
            </div>
          </RadioButtonSection>
          <Textarea
            id="about"
            label="Sobre"
            name="about"
            value={values.about}
            onChange={handleChange}
            onBlur={handleBlur}
            minLength={0}
            maxLength={300}
            hasError={touched.about && !!errors.about}
            errorMessage={errors.about}
            hasCounter
            optional="Máximo de 300 caracteres"
          />
          <Input
            id="phone"
            label="Número de Whatsapp"
            name="phone"
            value={values.phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            hasError={touched.phone && !!errors.phone}
            errorMessage={errors.phone}
            placeholder="__ _____-____"
          />
          <div>Fotos</div>
        </fieldset>
        <fieldset>
          <legend>Visitação</legend>
          <Textarea
            id="instructions"
            label="Instruções"
            name="instructions"
            value={values.instructions}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.instructions && !!errors.instructions}
            errorMessage={errors.instructions}
          />
          <Input
            id="working_hours"
            label="Horário de funcionamento"
            name="working_hours"
            value={values.working_hours}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.working_hours && !!errors.working_hours}
            errorMessage={errors.working_hours}
            optional="Ex.: Das 8h às 17h"
          />
          <Checkbox>
            <label htmlFor="open_on_weekends">
              Atende fim de semana?
              <span className={values.open_on_weekends ? 'checked' : ''} />
              <input
                type="checkbox"
                name="open_on_weekends"
                id="open_on_weekends"
                onChange={handleChange}
                defaultChecked
              />
            </label>
          </Checkbox>
        </fieldset>
        <button type="submit">Confirmar</button>
      </Form>
    </DefaultTemplate>
  );
};

export default CreateInstitution;
