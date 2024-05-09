import { create } from 'zustand'
import { CollectionVinyl, Search, Trade } from '@/types'

type ModalState = {
    isModalOpen: boolean;
    modalData: Search | CollectionVinyl | Trade | null;
    openModal: (data: any) => void;
    closeModal: () => void;
};

const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    modalData: null,
    openModal: (data) => set({ isModalOpen: true, modalData: data }),
    closeModal: () => set({ isModalOpen: false, modalData: null })
}));

export default useModalStore;