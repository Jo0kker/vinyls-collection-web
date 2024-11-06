import { create } from 'zustand'

import { CollectionVinyl, Search, Trade } from '@/types'

type ModalState = {
    isModalOpen: boolean;
    modalData: Search | CollectionVinyl | Trade | null;
    collectionType: string;
    onRefresh?: () => void
    openModal: (item: CollectionVinyl | Search | Trade, collectionId: number, refreshCallback?: () => void) => void
    closeModal: () => void;
};

const useModalItemEditStore = create<ModalState>((set) => ({
    isModalOpen: false,
    modalData: null,
    collectionType: '',
    onRefresh: undefined,
    openModal: (item, collectionId, refreshCallback) => set({
        isModalOpen: true,
        modalData: item,
        collectionType: collectionId.toString(),
        onRefresh: refreshCallback
    }),
    closeModal: () => set({
        isModalOpen: false,
        modalData: null,
        collectionType: '',
        onRefresh: undefined
    })
}));

export default useModalItemEditStore;