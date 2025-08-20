import { Navigate } from 'react-router'
import { useAuthStore } from '@/stores/authStore'
import { AuthRole } from '@/types/auth';
import { Outlet } from 'react-router';

interface props {
  //children: ReactNode,
  roles?: AuthRole[]
}

export function PrivateRouteWrapper({ roles }: props) {
  const { role, isLoading } = useAuthStore();
  console.log(role, isLoading);
  
  if (isLoading) {
    return <div className="p-4 text-center text-gray-600">Carregando...</div>;
  }
  
  if (roles && !roles.includes(role)) {
    console.log( "[ROLE NÃO permitida] - role user " + role + " - roles activeteds " + roles);
    return <Navigate to="/" />
  }

  console.log( "[ROLE permitida] -role user " + role + " - roles activeteds " + roles);
  return <Outlet />
}
