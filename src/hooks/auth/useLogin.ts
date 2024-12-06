import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'

export const useLogin = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()
  
  const handleLogin = async (email: string, password: string) => {
    const token = await login(email, password)
    if (token) {
      navigate('/dashboard')
    }
  }

  return { 
    isLoading, 
    error, 
    login: handleLogin 
  }
}