import { create } from "zustand";

interface ImageStore {
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  removeImageUrl: (index: number) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  imageUrls: [],
  setImageUrls: (urls) =>
    set((state) => ({ imageUrls: [...state.imageUrls, ...urls] })),
  removeImageUrl: (index) =>
    set((state) => ({
      imageUrls: state.imageUrls.filter((_, i) => i !== index),
    })),
}));
