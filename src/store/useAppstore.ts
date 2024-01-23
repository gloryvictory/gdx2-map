import { create } from 'zustand'

const useAppStore = create((set) => ({
  isTableInfoChecked: true,
  toggleTableInfoChecked: () => set((state: { isTableInfoChecked: boolean; }) => ({ isTableInfoChecked: !state.isTableInfoChecked  })),
  // removeAllBears: () => set({ bears: 0 }),
}))
export default useAppStore;
