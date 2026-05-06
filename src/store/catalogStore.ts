import { create } from 'zustand'

export type CatalogCategory = 'all' | 'consoles' | 'cartridges' | 'controllers'

type CatalogState = {
  searchQuery: string
  activeCategory: CatalogCategory
  setSearchQuery: (q: string) => void
  setActiveCategory: (c: CatalogCategory) => void
  clearFilters: () => void
}

export const useCatalogStore = create<CatalogState>((set) => ({
  searchQuery: '',
  activeCategory: 'all',
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveCategory: (c) => set({ activeCategory: c }),
  clearFilters: () => set({ searchQuery: '', activeCategory: 'all' }),
}))

