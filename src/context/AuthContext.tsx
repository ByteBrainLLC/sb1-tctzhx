import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  subscriptionTier: 'Basic' | 'Pro' | 'Advanced'
}

interface AuthContextType {
  user: User | null
  loginWithOAuth: (provider: string) => Promise<void>
  logout: () => void
  updateUserProfile: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const loginWithOAuth = async (provider: string) => {
    // In a real app, you would authenticate with the chosen provider
    console.log(`Logging in with ${provider}`)
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      subscriptionTier: 'Pro'
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateUserProfile = async (data: any) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, loginWithOAuth, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}