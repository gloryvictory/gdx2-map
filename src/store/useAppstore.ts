import { create } from 'zustand'


interface IAppStore {
  isTableInfoChecked: boolean
  toggleTableInfoChecked: () => void
}

const useAppStore = create<IAppStore>((set) => ({
  isTableInfoChecked: true,
  toggleTableInfoChecked: () => set((state: { isTableInfoChecked: boolean; }) => ({ isTableInfoChecked: !state.isTableInfoChecked  })),
  // removeAllBears: () => set({ bears: 0 }),
}))
export default useAppStore;
