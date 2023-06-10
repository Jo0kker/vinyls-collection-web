import create from 'zustand';
import { Cookies } from 'react-cookie';

import type { User } from '@definitions/User';

interface BearState {
  user: User | null;
  logout(): void;
}

export const useBearStore = create<BearState>()((set) => ({
    user: null,
    login: (user: User) => {
        set({ user });
    },
    logout: () => {
    // remove cookie
        const cookies = new Cookies();
        cookies.remove('token');
        cookies.remove('refresh_token');
        cookies.remove('expires_in');
        set({ user: null });
        // redirect to home
        window.location.href = '/';
    },
}));
