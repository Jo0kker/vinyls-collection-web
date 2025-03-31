/* eslint-disable import/order */
'use client'

import React, { useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FilePond, registerPlugin } from 'react-filepond';
// eslint-disable-next-line import/default
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { updateProfil } from '../actions/updateProfil'; // Importer l'action
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { User } from '@/types/User';
import { useSession } from 'next-auth/react';
import { showToast } from '@/utils/toast';
import { FilePondInitialFile, FilePondFile } from 'filepond';
registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateSize);
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
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string().email('Adresse email invalide').required('L\'email est requis'),
  phone: Yup.string(),
  birth_date: Yup.date(),
  audio_equipment: Yup.string(),
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

  
  const handleSubmit = async (values: ProfileFormData, { setSubmitting }: any) => {
    try {
      updateProfil(values).then((response) => {
        showToast({ type: 'success', message: 'Profil mis à jour avec succès' })

        values.avatar = response.avatar

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
      }).catch((error) => {
        showToast({ type: 'error', message: JSON.parse(error.message).error })
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
        <Form className="max-w-2xl p-6 mx-auto space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
              <Field 
                type="text" 
                id="first_name" 
                name="first_name" 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
              />
              <ErrorMessage name="first_name" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Nom</label>
              <Field 
                type="text" 
                id="last_name" 
                name="last_name" 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
              />
              <ErrorMessage name="last_name" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field 
                type="email" 
                id="email" 
                name="email" 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
              />
              <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
              <Field 
                type="text" 
                id="phone" 
                name="phone" 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
              />
              <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Date de naissance</label>
              <Field 
                type="date" 
                id="birth_date" 
                name="birth_date" 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
              />
              <ErrorMessage name="birth_date" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="audio_equipment" className="block text-sm font-medium text-gray-700">Équipement audio</label>
              <Field 
                type="text" 
                id="audio_equipment" 
                name="audio_equipment" 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
              />
              <ErrorMessage name="audio_equipment" component="p" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="influence" className="block text-sm font-medium text-gray-700">Influence</label>
              <Field 
                type="text" 
                id="influence" 
                name="influence" 
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
              />
              <ErrorMessage name="influence" component="p" className="mt-1 text-sm text-red-600" />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Field 
              as="textarea" 
              id="description" 
              name="description" 
              rows={4}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" 
            />
            <ErrorMessage name="description" component="p" className="mt-1 text-sm text-red-600" />
          </div>
          
          <div className="col-span-full">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
            <div className="mt-1">
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
                maxFileSize={"2MB"}
                acceptedFileTypes={['image/png', 'image/jpeg']}
                labelIdle='Déposez votre image ou <span class="filepond--label-action">parcourez</span>'
                className="filepond--panel-root:bg-emerald-50 filepond--drop-label:border-emerald-200 filepond--drop-label:hover:border-emerald-300"
              />
            </div>
            <ErrorMessage name="avatar" component="p" className="mt-1 text-sm text-red-600" />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le profil'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfilForm;
