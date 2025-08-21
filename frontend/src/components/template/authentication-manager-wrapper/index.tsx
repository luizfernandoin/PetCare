import { getProfile } from '@/services/user';
import { useAuthStore } from '@/stores/authStore'                               
import { ReactNode, useEffect } from 'react'

interface props {
  children: ReactNode
}

export default function AuthenticationManagerWrapper({children}: props) {
  const { login, logout, setLoading } = useAuthStore();

  const refreshUser = async () => {
    const profile = await getProfile();
    if (profile) {
      const role = profile.role
      const token = localStorage.getItem('token');
      login({ ...profile, role:role }, token!); 
    }
    else {
      logout();
    }
  }

  useEffect(()=>{
    setLoading(true);
    refreshUser()
  },[])

  return (<> {children} </>)
}