import { Route, Routes } from 'react-router'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { SidebarLayoutWrapper } from '@/components/template/SidebarLayoutWrapper'
import {Storybook} from './pages/storybook'
import { NotFound } from './pages/not-found'

export default function Router() {
  return (
    <Routes>
      <Route element={<SidebarLayoutWrapper />}>
          <Route path="/storybook" element={<Storybook />} />
          <Route path="*" element={<NotFound/>} />
      </Route>

      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/signup" element={<Signup />} />
    </Routes>
  )
}