/* eslint-disable import/order */
'use client'

import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FilePond, registerPlugin } from 'react-filepond';
// eslint-disable-next-line import/default
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { updateProfil } from '../actions/updateProfil'; // Importer l'action
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { User } from '@/types/User';

registerPlugin(FilePondPluginImagePreview);

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  phone: string;
  birthDate: string;
  audioEquipment: string;
  influence: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Adresse email invalide').required('L\'email est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
  birthDate: Yup.date().required('La date de naissance est requise'),
  audioEquipment: Yup.string().required('L\'équipement audio est requis'),
  influence: Yup.string(),
  description: Yup.string(),
});

const ProfilForm: React.FC<{ user: User }> = ({ user }) => {
  const [initialValues, setInitialValues] = useState<ProfileFormData>({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    avatar: user.avatar,
    phone: user.phone,
    birthDate: user.birth_date,
    audioEquipment: user.audio_equipment,
    influence: user.influence,
    description: user.description,
  });

  const handleSubmit = async (values: ProfileFormData, { setSubmitting }: any) => {
    try {
      await updateProfil(values); // Appeler l'action
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur lors de la mise à jour du profil:', error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
            <Field type="text" id="firstName" name="firstName" className="block w-full mt-1" />
            <ErrorMessage name="firstName" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
            <Field type="text" id="lastName" name="lastName" className="block w-full mt-1" />
            <ErrorMessage name="lastName" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Field type="email" id="email" name="email" className="block w-full mt-1" />
            <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
            <Field type="text" id="phone" name="phone" className="block w-full mt-1" />
            <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Date de naissance</label>
            <Field type="date" id="birthDate" name="birthDate" className="block w-full mt-1" />
            <ErrorMessage name="birthDate" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="audioEquipment" className="block text-sm font-medium text-gray-700">Équipement audio</label>
            <Field type="text" id="audioEquipment" name="audioEquipment" className="block w-full mt-1" />
            <ErrorMessage name="audioEquipment" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="influence" className="block text-sm font-medium text-gray-700">Influence</label>
            <Field type="text" id="influence" name="influence" className="block w-full mt-1" />
            <ErrorMessage name="influence" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Field as="textarea" id="description" name="description" className="block w-full mt-1" />
            <ErrorMessage name="description" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
            <FilePond
              files={initialValues.avatar ? [initialValues.avatar] : []} // Utiliser l'URL directement
              onupdatefiles={(fileItems) => {
                setFieldValue('avatar', fileItems.map(fileItem => fileItem.file)[0] || null);
              }}
              allowMultiple={false}
              acceptedFileTypes={['image/png', 'image/jpeg']}
              labelIdle='Déposez votre image ou <span class="filepond--label-action">parcourez</span>'
              imagePreviewHeight={200} // Hauteur de la prévisualisation
            />
            <ErrorMessage name="avatar" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le profil'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfilForm;
