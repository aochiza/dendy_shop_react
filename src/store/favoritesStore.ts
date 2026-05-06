import { create } from "zustand";
import type { Product } from "../data/products";

interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  toggleFavorite: (product) => {
    const exists = get().favorites.find((p) => p.id === product.id);

    if (exists) {
      set({
        favorites: get().favorites.filter((p) => p.id !== product.id),
      });
    } else {
      set({
        favorites: [...get().favorites, product],
      });
    }
  },

  isFavorite: (id) => {
    return get().favorites.some((p) => p.id === id);
  },
}));