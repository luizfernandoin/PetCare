import { AuthRole } from '@/types/auth'
import { User } from '@/types/User'
import { create } from 'zustand'

type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  role: AuthRole
  isLoading: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  setRole: (role: AuthRole) => void
  setLoading: (loading: boolean) => void
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  role: "NAO_LOGADO",
  isLoading: true,

  setUser: (user) =>
    set({ user, isAuthenticated: true }),

  setToken: (token) =>
    set({ token, isAuthenticated: true }),

  setRole: (role) =>
    set({ role }),

  setLoading: (loading) =>
    set({ isLoading: loading }),

  login: (user, token) =>
    set({ user, token, isAuthenticated: true, role: user.tipo, isLoading: false }),

  logout: () =>
    set({ user: null, token: null, isAuthenticated: false, role: "NAO_LOGADO", isLoading: false }),
}))