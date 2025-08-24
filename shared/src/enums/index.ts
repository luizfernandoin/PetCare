enum USER_ROLE {
  CLIENT = "CLIENT",
  PROFESSIONAL = "PROFESSIONAL",
}

enum APPOINTMENT_STATUS {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

enum PET_SIZE {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

enum SERVICE_TYPE {
  CONSULTATION = "CONSULTATION",       // Consulta veterinária
  VACCINATION = "VACCINATION",         // Aplicação de vacinas
  EXAM = "EXAM",                       // Exames laboratoriais ou clínicos
  GROOMING = "GROOMING",               // Banho e tosa
  TRAINING = "TRAINING",               // Adestramento
  BOARDING = "BOARDING",               // Hospedagem
  MICROCHIPPING = "MICROCHIPPING",     // Implantação de microchip
  NUTRITION = "NUTRITION",             // Consulta nutricional
  SURGERY = "SURGERY",                 // Procedimentos cirúrgicos
  DENTAL_CARE = "DENTAL_CARE",         // Limpeza e cuidados dentários
  BEHAVIORAL_THERAPY = "BEHAVIORAL_THERAPY", // Terapia comportamental
  OTHER = "OTHER",                     // Outro tipo de serviço
}

export {
  USER_ROLE,
  APPOINTMENT_STATUS,
  PET_SIZE,
  SERVICE_TYPE
}
