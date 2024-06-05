import { create } from 'zustand';

type SampleStore = {
  isWelcomeBottomSheetOpen: boolean;
  openWelcomeBottomSheet: () => void;
  closeWelcomeBottomSheet: () => void;
};

export const useSampleStore = create<SampleStore>((set) => ({
  isWelcomeBottomSheetOpen: false,
  openWelcomeBottomSheet: () => set({ isWelcomeBottomSheetOpen: true }),
  closeWelcomeBottomSheet: () => set({ isWelcomeBottomSheetOpen: false }),
}));
