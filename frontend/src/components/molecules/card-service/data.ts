import imageBath from "/src/assets/icons/bath.svg"
import imageVaccination from "/src/assets/icons/vaccination.svg"
import imageGrooming from "/src/assets/icons/grooming.svg"
import { SERVICE_TYPE } from "@petcare/shared/enums"

interface typeServiceData {
  icon: string,
  className: string
}

export const serviceData: Record<SERVICE_TYPE, typeServiceData> = {
  "BEHAVIORAL_THERAPY": {
    icon: imageBath,
    className: "bg-[#DDC8EF] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "GROOMING": {
    icon: imageGrooming,
    className: "bg-[#CCEBEF] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "VACCINATION": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "BOARDING": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "EXAM": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "OTHER": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "TRAINING": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "CONSULTATION": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "DENTAL_CARE": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "NUTRITION": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "MICROCHIPPING": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "SURGERY": {
    icon: imageVaccination,
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  }
}