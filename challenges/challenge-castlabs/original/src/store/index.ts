import { create } from "zustand";

interface RefetchState {
  refetch: boolean;
  setRefetch: (value: boolean) => void;
}

export const useRefetchStore = create<RefetchState>((set) => ({
  refetch: false,
  setRefetch: (value: boolean) => set({ refetch: value }),
}));
