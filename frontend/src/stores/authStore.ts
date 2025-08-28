import { AuthRole } from '@/types/auth'
import { PetShop } from '@/types/Petshop'
import { User } from '@/types/User'
import { create } from 'zustand'


type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  role: AuthRole
  isLoading: boolean

  clinic: PetShop | null

  setUser: (user: User) => void
  setToken: (token: string) => void
  setRole: (role: AuthRole) => void
  setLoading: (loading: boolean) => void
  setClinic: (clinic: PetShop) => void
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  role: "NOT_LOGGED",
  isLoading: true,
  clinic: null,

  setUser: (user) =>
    set({ user, isAuthenticated: true }),

  setToken: (token) =>
    set({ token, isAuthenticated: true }),

  setRole: (role) =>
    set({ role }),

  setLoading: (loading) =>
    set({ isLoading: loading }),

  setClinic: (clinic) =>
    set({ clinic }),

  login: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
      role: user.role,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      role: "NOT_LOGGED",
      isLoading: false,
      clinic: null,
    }),
}))
