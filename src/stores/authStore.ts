import { create } from 'zustand'

interface User {
    id: string
    email: string
    name: string
    role: 'ADMIN' | 'SUPERVISOR' | 'VENDEDOR'
}

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    setUser: (user: User, token: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    login: async (email: string, password: string) => {
        // TODO: Conectar con backend real
        // Por ahora, login mock para desarrollo
        if (email === 'admin@saori.local' && password === 'admin123') {
            const mockUser: User = {
                id: '1',
                email: 'admin@saori.local',
                name: 'Administrador',
                role: 'ADMIN',
            }
            set({ user: mockUser, token: 'mock-token', isAuthenticated: true })
            return true
        }
        return false
    },

    logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
    },

    setUser: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true })
    },
}))
