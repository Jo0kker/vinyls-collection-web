import create from "zustand";

interface BearState {
  user: object;
}

export const useBearStore = create<BearState>()((set) => ({
  user: {},
  login: (user: object) => set({ user }),
  logout: () => set({ user: {} }),
}));
