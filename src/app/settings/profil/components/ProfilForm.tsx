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
import { useSession } from 'next-auth/react';
import { showToast } from '@/utils/toast';
import { FilePondInitialFile, FilePondFile } from 'filepond';
registerPlugin(FilePondPluginImagePreview);

export interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string | null;
  phone: string;
  birth_date: string;
  audio_equipment: string;
  influence: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('Le prénom est requis'),
  last_name: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Adresse email invalide').required('L\'email est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
  birth_date: Yup.date().required('La date de naissance est requise'),
  audio_equipment: Yup.string().required('L\'équipement audio est requis'),
  influence: Yup.string(),
  description: Yup.string(),
});

const ProfilForm: React.FC<{ user: User }> = ({ user }) => {
  const { update } = useSession()
  const [tempAvatar, setTempAvatar] = useState<FilePondFile | null>(null);
  const [initialAvatar, setInitialAvatar] = useState<FilePondInitialFile | string | null>(user.avatar);
  const [initialValues, setInitialValues] = useState<ProfileFormData>({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar,
    phone: user.phone,
    birth_date: user.birth_date,
    audio_equipment: user.audio_equipment,
    influence: user.influence,
    description: user.description,
  });
  console.log('user', user)
  console.log('initialValues', initialValues)

  
  const handleSubmit = async (values: ProfileFormData, { setSubmitting }: any) => {
    console.log('values', values)
    try {
      updateProfil(values).then((response) => {
        console.log('response', response)
        showToast({ type: 'success', message: 'Profil mis à jour avec succès' })

        values.avatar = response.avatar
        console.log('values', values)
        console.log('update user', {
          ...user,
          ...values
        })
        

        if (response.avatar) {
          setInitialValues((prev) => ({
            ...prev,
            avatar: response.avatar,
          }));
        }
        
        update({
          user: {
            ...user,
            ...values
          }
        });
      })
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
            <Field type="text" id="first_name" name="first_name" className="block w-full mt-1" />
            <ErrorMessage name="first_name" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Nom</label>
            <Field type="text" id="last_name" name="last_name" className="block w-full mt-1" />
            <ErrorMessage name="last_name" component="p" className="mt-1 text-sm text-red-600" />
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
            <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Date de naissance</label>
            <Field type="date" id="birth_date" name="birth_date" className="block w-full mt-1" />
            <ErrorMessage name="birth_date" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="audio_equipment" className="block text-sm font-medium text-gray-700">Équipement audio</label>
            <Field type="text" id="audio_equipment" name="audio_equipment" className="block w-full mt-1" />
            <ErrorMessage name="audio_equipment" component="p" className="mt-1 text-sm text-red-600" />
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
              files={initialAvatar ? [initialAvatar] : []}
              onupdatefiles={(fileItems) => {
                const file = fileItems[0] || null;
              
                if (file) {
                  setTempAvatar(file);
              
                  const adaptedFile: FilePondInitialFile = {
                    source: file.file as unknown as string,
                    options: {
                      type: 'local',
                      file: {
                        name: file.file.name,
                        size: file.file.size,
                        type: file.file.type,
                      },
                    },
                  };
              
                  setInitialAvatar(adaptedFile);
                  setFieldValue('avatar', file.file);
                } else {
                  setTempAvatar(null);
                  setInitialAvatar(null);
                  setFieldValue('avatar', null);
                }
              }}
              allowMultiple={false}
              acceptedFileTypes={['image/png', 'image/jpeg']}
              labelIdle='Déposez votre image ou <span class="filepond--label-action">parcourez</span>'
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
