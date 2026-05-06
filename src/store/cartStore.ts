import { create } from 'zustand'
import type { Product } from '../data/products'

export type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }
      }
      return { items: [...state.items, { ...product, quantity: 1 }] }
    }),

  removeFromCart: (productId) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== productId) })),

  increaseQuantity: (productId) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === productId ? { ...i, quantity: i.quantity + 1 } : i)),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}))

