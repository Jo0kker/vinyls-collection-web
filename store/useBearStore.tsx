import create from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  description?: string | null;
  birth_date: string | null;
  audio_equipment: string | null;
  email_verified_at: string | null;
  influence: string | null;
  is_blocked: boolean;
  is_subscribed_newsletter: boolean;
  last_activity: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

interface BearState {
  user: User | null;
}

export const useBearStore = create<BearState>()((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));
