import { Suspense } from 'react';


import { User } from '@/types';
import { getSession } from '@/utils/authOptions';

import ProfilForm from './components/ProfilForm';

export const metadata = {
  title: 'Gestion du profil - Vinyls Collection',
  description: 'Modifiez vos informations personnelles sur Vinyls Collection',
};

export default async function SettingsProfilPage() {
  const session = await getSession()
  return (
    <div className="flex flex-col px-4 pt-4 mt-4 bg-white rounded sm:pt-0">
      <div className="flex flex-row justify-center mt-6 mb-4 text-2xl font-bold">
                <span className="mr-3 text-emerald-500">&#47;&#47;</span>
                <h1 className="text-fuchsia-800">Gestion du profil</h1>
                <span className="ml-3 text-orange-400">&#47;&#47;</span>
            </div>
      <Suspense fallback={<div>Chargement...</div>}>
        <ProfilForm user={session?.user as User}/>
      </Suspense>
    </div>
  );
}
