import { create } from 'zustand'

interface ModalSearchState {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

const useModalSearchStore = create<ModalSearchState>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false })
}))

export default useModalSearchStore 