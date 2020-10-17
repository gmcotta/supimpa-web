import { LeafletMouseEvent } from 'leaflet';
import React, { FormEvent, useCallback, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import DefaultTemplate from '../../templates/DefaultTemplate';

import Input from '../../components/Input';

import { retirementHomeIcon, seniorCenterIcon } from '../../utils/mapIcons';

import { Form, MapSection } from './styles';

const CreateInstitution: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }, []);

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
                  position={[position.latitude, position.longitude]}
                />
              </Map>
            </div>
            <span>Clique no mapa para adicionar a localização</span>
          </MapSection>
          <Input
            id="name"
            label="Nome"
            name="name"
            hasError
            errorMessage="Teste"
            optional="Teste opcional"
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
                checked
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
