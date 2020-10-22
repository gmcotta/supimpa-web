import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { FiPlus } from 'react-icons/fi';

import api from '../../../services/api';

import DefaultTemplate from '../../../templates/DefaultTemplate';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import RadioButton from '../../../components/RadioButton';
import SwitchButton from '../../../components/SwitchButton';
import SubmitButton from '../../../components/SubmitButton';

import { retirementHomeIcon, seniorCenterIcon } from '../../../utils/mapIcons';

import {
  FormContainer,
  MapSection,
  RadioButtonSection,
  ImagesSection,
} from './styles';

type InstitutionProps = {
  latitude: number;
  longitude: number;
  name: string;
  retirement_or_center: string;
  about: string;
  phone: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
};

type FormValues = {
  latitude: number;
  longitude: number;
  name: string;
  retirement_or_center: string;
  about: string;
  phone: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: File[];
};

type InstitutionRouteParams = {
  id: string;
};

const EditInstitution: React.FC = () => {
  const [institution, setInstitution] = useState<InstitutionProps>();
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { id } = useParams<InstitutionRouteParams>();
  const history = useHistory();

  // Read data from API
  useEffect(() => {
    api.get(`/institutions/${id}`).then(response => {
      setInstitution(response.data);
      setMapCenter([response.data.latitude, response.data.longitude]);
    });
  }, [id]);

  // Transform images data (id and url) into file data, and store preview images url
  useEffect(() => {
    if (institution?.images) {
      const previewImagesArray = institution.images.map(image => {
        fetch(image.url)
          .then(response => response.blob())
          .then(response => {
            const newFile = new File(
              [response],
              `${Date.now()}-${institution.name}`,
            );
            setUploadedImages(oldFiles => [...oldFiles, newFile]);
          });
        return image.url;
      });
      setPreviewImages(previewImagesArray);
    }
  }, [institution]);

  if (!institution) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  const formikEnhancer = withFormik({
    handleSubmit: async (values: FormValues) => {
      console.log(values);
      const data = new FormData();
      data.append('about', values.about);
      data.append('instructions', values.instructions);
      data.append('name', values.name);
      data.append('phone', values.phone);
      data.append('retirement_or_center', values.retirement_or_center);
      data.append('opening_hours', values.opening_hours);
      data.append('open_on_weekends', String(values.open_on_weekends));
      data.append('latitude', String(values.latitude));
      data.append('longitude', String(values.longitude));
      values.images.forEach(image => {
        data.append('images', image);
      });

      await api
        .put(`/admin/institutions/edit/${id}`, data)
        .then(() => {
          history.push('/admin/dashboard');
        })
        .catch(error => {
          console.log(error);
        });
    },
    mapPropsToValues: () => ({
      name: institution.name,
      latitude: institution.latitude,
      longitude: institution.longitude,
      retirement_or_center: institution.retirement_or_center,
      about: institution.about,
      phone: institution.phone,
      instructions: institution.instructions,
      opening_hours: institution.opening_hours,
      open_on_weekends: institution.open_on_weekends,
      images: uploadedImages,
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Campo obrigatório'),
      latitude: Yup.number().required('Campo obrigatório'),
      longitude: Yup.number().required('Campo obrigatório'),
      about: Yup.string().required('Campo obrigatório'),
      phone: Yup.string()
        .required('Campo obrigatório')
        .matches(/^\d{2} \d{4,5}-\d{4}$/, 'Telefone no padrão incorreto'),
      instructions: Yup.string().required('Campo obrigatório'),
      opening_hours: Yup.string().required('Campo obrigatório'),
      images: Yup.array().required('Campo obrigatório'),
    }),
  });

  const Form = (props: FormikProps<FormValues>) => {
    const { values, errors, touched, setFieldValue, handleSubmit } = props;

    const handleMapClick = useCallback(
      (event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        setFieldValue('latitude', lat);
        setFieldValue('longitude', lng);
      },
      [setFieldValue],
    );

    const handleFieldChange = useCallback(
      (event, fieldName) => {
        const { type } = event.target;
        if (type === 'checkbox') {
          setFieldValue(fieldName, event.target.checked);
        } else {
          setFieldValue(fieldName, event.target.value);
        }
      },
      [setFieldValue],
    );

    const handlePhoneChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        value = value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1 $2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
          .replace(/(-\d{4})\d+?$/, '$1');
        setFieldValue('phone', value);
      },
      [setFieldValue],
    );

    const handleSelectImages = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files) {
          return;
        }
        const selectedImages = Array.from(files);
        setUploadedImages(selectedImages);

        const previewImagesArray = selectedImages.map(image => {
          return URL.createObjectURL(image);
        });
        setPreviewImages(previewImagesArray);
      },
      [],
    );

    const handleDeleteImage = useCallback((image: string, index: number) => {
      const filteredImages = uploadedImages.filter(
        (_, imageIndex) => imageIndex !== index,
      );
      setUploadedImages(filteredImages);

      const filteredPreviewImages = previewImages.filter(
        previewImage => previewImage !== image,
      );
      setPreviewImages(filteredPreviewImages);
    }, []);

    return (
      <FormContainer onSubmit={handleSubmit}>
        <fieldset>
          <legend>Dados</legend>
          <MapSection>
            <div style={{ width: '100%', height: 320 }}>
              <Map
                // center={[-23.4439484, -46.5258909]}
                center={mapCenter}
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
            <span
              className={
                !!errors.latitude &&
                touched.latitude &&
                !!errors.latitude &&
                touched.longitude
                  ? 'error'
                  : ''
              }
            >
              Clique no mapa para adicionar a localização
            </span>
          </MapSection>
          <Input
            id="name"
            name="name"
            label="Nome"
            value={values.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange(event, 'name')
            }
            hasError={touched.name && !!errors.name}
            errorMessage={errors.name}
          />
          <RadioButtonSection>
            <span>Tipo de instituição</span>
            <RadioButton
              id="retirement"
              name="retirement_or_center"
              value="retirement"
              label="Casa de repouso"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleFieldChange(event, 'retirement_or_center')
              }
              radioClassName={
                values.retirement_or_center === 'retirement' ? 'selected' : ''
              }
              defaultChecked={values.retirement_or_center === 'retirement'}
            />
            <RadioButton
              id="center"
              name="retirement_or_center"
              value="center"
              label="Centro de convivência"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleFieldChange(event, 'retirement_or_center')
              }
              radioClassName={
                values.retirement_or_center === 'center' ? 'selected' : ''
              }
              defaultChecked={values.retirement_or_center === 'center'}
            />
          </RadioButtonSection>
          <Textarea
            id="about"
            label="Sobre"
            name="about"
            value={values.about}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              handleFieldChange(event, 'about')
            }
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
            hasError={touched.phone && !!errors.phone}
            errorMessage={errors.phone}
            placeholder="__ _____-____"
          />
          <ImagesSection>
            <label htmlFor="images">Fotos</label>
            <div>
              {previewImages.map((image, index) => (
                <div key={`${values.name}-${index + 1}`}>
                  <img src={image} alt={`${values.name}-${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image, index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <label htmlFor="add_image">
                <FiPlus />
                <input
                  type="file"
                  name="image"
                  id="add_image"
                  multiple
                  onChange={handleSelectImages}
                />
              </label>
            </div>
            {touched.images && !!errors.images && (
              <span>Obrigatório incluir uma foto</span>
            )}
          </ImagesSection>
        </fieldset>
        <fieldset>
          <legend>Visitação</legend>
          <Textarea
            id="instructions"
            label="Instruções"
            name="instructions"
            value={values.instructions}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              handleFieldChange(event, 'instructions')
            }
            hasError={touched.instructions && !!errors.instructions}
            errorMessage={errors.instructions}
          />
          <Input
            id="opening_hours"
            label="Horário de funcionamento"
            name="opening_hours"
            value={values.opening_hours}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange(event, 'opening_hours')
            }
            hasError={touched.opening_hours && !!errors.opening_hours}
            errorMessage={errors.opening_hours}
            optional="Ex.: Das 8h às 17h"
          />
          <SwitchButton
            id="open_on_weekends"
            name="open_on_weekends"
            label="Atende fim de semana?"
            checkedClassName={values.open_on_weekends ? 'checked' : ''}
            defaultChecked={values.open_on_weekends}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange(event, 'open_on_weekends')
            }
          />
        </fieldset>
        <SubmitButton type="submit">Confirmar</SubmitButton>
      </FormContainer>
    );
  };

  const EditForm = formikEnhancer(Form);

  return (
    <DefaultTemplate backButtonUrl="/admin/dashboard">
      <EditForm />
    </DefaultTemplate>
  );
};

export default EditInstitution;
