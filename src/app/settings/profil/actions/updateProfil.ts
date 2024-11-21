'use server';

import { fetchAPI } from '@/utils/fetchAPI';
import { ProfileFormData } from '../components/ProfilForm';
import { revalidateTag } from 'next/cache';

export const updateProfil = async (userData: ProfileFormData) => {
  const formData = new FormData();

  // Liste des champs à vérifier
  const fields: (keyof ProfileFormData)[] = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'birth_date',
    'audio_equipment',
    'influence',
    'description'
  ];

  // N'ajouter que les champs non vides
  fields.forEach(field => {
    if (userData[field]) {
      formData.append(field, userData[field]);
    }
  });

  // Traitement spécial pour l'avatar car c'est un File
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
