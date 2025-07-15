import { Route, Routes } from 'react-router'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { SidebarLayoutWrapper } from '@/components/template/SidebarLayoutWrapper'
import {Storybook} from './pages/storybook'
import { NotFound } from './pages/not-found'
import Dashboard from './pages/dashboard'
import Services from './pages/services'

export default function Router() {
  return (
    <Routes>
      <Route element={<SidebarLayoutWrapper />}>
          <Route path="/storybook" element={<Storybook />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<NotFound/>} />
          <Route path='/services' element={<Services />} />
      </Route>

      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  )
}