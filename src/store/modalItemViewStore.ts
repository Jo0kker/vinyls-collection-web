import { create } from 'zustand';

import { CollectionVinyl, Search, Trade } from '@/types';

type ModalState = {
  isModalOpen: boolean;
  modalData: Search | CollectionVinyl | Trade | null;
  collectionType: string;
  openModal: (data: any, collectionType: string) => void;
  closeModal: () => void;
};

const useModalItemViewStore = create<ModalState>((set) => ({
  isModalOpen: false,
  modalData: null,
  collectionType: '',
  openModal: (data, collectionType) =>
    set({ isModalOpen: true, modalData: data, collectionType: collectionType }),
  closeModal: () => set({ isModalOpen: false, modalData: null }),
}));

export default useModalItemViewStore;