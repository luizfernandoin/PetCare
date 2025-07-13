import { Route, Routes } from 'react-router'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'

export default function Router() {
  return (
      <Routes>
        <Route path="/auth/signin" element={<Signin/>} />
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="*" element={<h1>Pagina não encontrada</h1>} />
      </Routes>
  )
}