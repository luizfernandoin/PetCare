import { BrandingSection } from '@/components/molecules/branding-section'
import { RegistrationUser } from '@/components/molecules/registration-user'


export function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sky-100 to-orange-50">
      <div className="flex w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg">
        <BrandingSection type='signup' />
        <RegistrationUser />
      </div>
    </div>
  )
}
