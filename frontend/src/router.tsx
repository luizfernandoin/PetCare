import { Route, Routes } from 'react-router'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { SidebarLayoutWrapper } from '@/components/template/SidebarLayoutWrapper'
import {Storybook} from './pages/storybook'

export default function Router() {
  return (
    <Routes>
      <Route element={<SidebarLayoutWrapper />}>
          <Route path="/storybook" element={<Storybook />} />
          <Route path="*" element={<h1>Pagina não encontrada</h1>} />
      </Route>

      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  )
}