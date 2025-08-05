import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

export function Presentation() {
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>Pagina Apresentação</h1>
      <p>Rota publica para todos os tipos de usuarios</p>
      <div className='flex gap-4'>
        <Button><Link to={"/auth/signin"}>Entrar</Link></Button>
        <Button><Link to={"/dashboard"}>Dashboard</Link></Button>
        <Button><Link to={"/pets"}>Pets</Link></Button>
      </div>
    </div>
  )
}
