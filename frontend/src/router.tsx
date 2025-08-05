import { Route, Routes } from 'react-router'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { SidebarLayoutWrapper } from '@/components/template/SidebarLayoutWrapper'
import { NotFound } from './pages/not-found'
import Dashboard from './pages/dashboard'
import { Pets } from './pages/pets'
import Services from './pages/services'
import Appointments from './pages/appointments'
import Calendar from './pages/calendar'
import { PrivateRouteWrapper } from './components/template/private-route-wrapper'
import { Home } from './pages/home'
import { Presentation } from './pages/presentation'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Presentation />} />

      <Route element={<PrivateRouteWrapper roles={['NAO_LOGADO']} />}>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route>

      <Route element={<SidebarLayoutWrapper />}>
        <Route element={<PrivateRouteWrapper roles={['CLIENTE']} />}>
          <Route path='/pets' element={<Pets />} />
        </Route>
        <Route element={<PrivateRouteWrapper roles={['PROFISSIONAL']} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/services' element={<Services />} />
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/calendar' element={<Calendar />} />
        </Route>
        <Route element={<PrivateRouteWrapper roles={['CLIENTE','PROFISSIONAL']} />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}