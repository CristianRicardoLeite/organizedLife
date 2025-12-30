import { ReactNode, useEffect, useState } from 'react'
import { authService } from '../services/authService'
import type { LoginDto, RegisterDto, User } from '../types'
import { AuthContext } from './AuthContextDefinition'

// 🔓 DEVELOPMENT MODE: Bypass authentication
const DEV_MODE = true
const MOCK_USER: User = {
  id: 1,
  name: 'Developer User',
  email: 'dev@organizedlife.com',
  createdAt: new Date().toISOString(),
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔓 Bypass: Auto-login in development mode
    if (DEV_MODE) {
      setUser(MOCK_USER)
      localStorage.setItem('user', JSON.stringify(MOCK_USER))
      localStorage.setItem('token', 'dev-mock-token')
      setLoading(false)
      return
    }

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (data: LoginDto) => {
    // 🔓 Bypass: Mock login in development mode
    if (DEV_MODE) {
      const mockUser: User = {
        id: 1,
        name: data.email.split('@')[0],
        email: data.email,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('token', 'dev-mock-token')
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      return
    }

    const response = await authService.login(data)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    setUser(response.user)
  }

  const register = async (data: RegisterDto) => {
    // 🔓 Bypass: Mock register in development mode
    if (DEV_MODE) {
      const mockUser: User = {
        id: 1,
        name: data.name,
        email: data.email,
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem('token', 'dev-mock-token')
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      return
    }

    const response = await authService.register(data)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    setUser(response.user)
  }

  const logout = () => {
    // 🔓 Bypass: In dev mode, just clear and reset to mock user
    if (DEV_MODE) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      // Auto re-login after logout in dev mode
      setTimeout(() => {
        setUser(MOCK_USER)
        localStorage.setItem('user', JSON.stringify(MOCK_USER))
        localStorage.setItem('token', 'dev-mock-token')
      }, 100)
      return
    }

    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
