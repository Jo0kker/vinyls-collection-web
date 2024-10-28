'use server';

import { fetchAPI } from '@/utils/fetchAPI';

import { ProfileFormData } from '../components/ProfilForm';
import { revalidateTag } from 'next/cache';

export const updateProfil = async (userData: ProfileFormData) => {
  const formData = new FormData();
  formData.append('first_name', userData.first_name);
  formData.append('last_name', userData.last_name);
  formData.append('email', userData.email);
  formData.append('phone', userData.phone);
  formData.append('birth_date', userData.birth_date);
  formData.append('audio_equipment', userData.audio_equipment);
  formData.append('influence', userData.influence);
  formData.append('description', userData.description);

  console.log('avatar', userData.avatar)

  if (userData.avatar) {
    formData.append('avatar', userData.avatar);
  }

  try {

    const response = await fetchAPI('/users/profile', {
      method: 'POST',
      body: formData,
      withSession: true,
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw error;
  }
};
