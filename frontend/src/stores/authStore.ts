import { User } from '@/types/User'
import { create } from 'zustand'

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({ user, isAuthenticated: true }),

  setToken: (token) =>
    set({ token, isAuthenticated: true }),

  logout: () =>
    set({ user: null, token: null, isAuthenticated: false }),
}))