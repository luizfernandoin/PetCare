import { getClinicById, getClinicsByProfessionalId } from '@/services/clinic';
import { getProfile } from '@/services/user';
import { useAuthStore } from '@/stores/authStore'
import { USER_ROLE } from '@petcare/shared/enums';
import { ReactNode, useEffect } from 'react'

interface props {
  children: ReactNode
}

export default function AuthenticationManagerWrapper({ children }: props) {
  const { login, logout, setLoading, setClinic } = useAuthStore();

  const refreshUser = async () => {

    const profile = await getProfile();
    if (profile) {
      const role = profile.role
      const token = localStorage.getItem('token');

      login({ ...profile, role: role }, token!);
      if (role === USER_ROLE.PROFESSIONAL) {
        const clinics = await getClinicsByProfessionalId(profile.id)


        if (clinics[0]) {
          console.log("clinics[0]", clinics[0]);
          
          const clinicFound = await getClinicById(clinics[0].clinicId)
          if (clinicFound.data) {
            console.log("clinicFound.data", clinicFound.data);
            
            setClinic({
              id: clinicFound.data.id,
              name: clinicFound.data.name,
              phone: clinicFound.data.phone,
              location: {
                street: "",
                number: "",
                city: "",
                state: "",
                country: "",
                postalcode: ""
              }

            })

          }
        }

      }
    }
    else {
      logout();
    }
  }

  useEffect(() => {
    setLoading(true);
    refreshUser()
  }, [])

  return (<> {children} </>)
}