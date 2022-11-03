import create from "zustand";

interface BearState {
  bears: number;
  health: string;
  increase: (by: number) => void;
  test: () => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 33,
  health: "pending",
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  test: async () => {
    // get data from server with fetch
    const res = await fetch("http://localhost:8000/api/test");
    const data = await res.json();
    // update state
    set((state) => ({ health: data.data }));
  },
}));
