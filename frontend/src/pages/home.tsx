import { useAuthStore } from '@/stores/authStore'

export function Home() {
  const { user, role } = useAuthStore()
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Bem vindo {user?.nome}</h1>
      <p>Sua função é {role}</p>
    </div>
  )
}
