'use server';

import { fetchAPI } from '@/utils/fetchAPI';

import { ProfileFormData } from '../components/ProfilForm';

export const updateProfil = async (userData: ProfileFormData) => {
  const formData = new FormData();
  formData.append('firstName', userData.firstName);
  formData.append('lastName', userData.lastName);
  formData.append('email', userData.email);
  formData.append('phone', userData.phone);
  formData.append('birthDate', userData.birthDate);
  formData.append('audioEquipment', userData.audioEquipment);
  formData.append('influence', userData.influence);
  formData.append('description', userData.description);

  if (userData.avatar) {
    formData.append('avatar', userData.avatar);
  }

  try {
    const response = await fetchAPI('/users/profile', {
      method: 'PUT',
      body: formData,
      withSession: true, // Ajout de l'option pour gérer la session
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw error;
  }
};
