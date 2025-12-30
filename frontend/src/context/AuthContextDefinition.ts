import { createContext } from 'react'
import { LoginDto, RegisterDto, User } from '../types'

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginDto) => Promise<void>
  register: (data: RegisterDto) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
