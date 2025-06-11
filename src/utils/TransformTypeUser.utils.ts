export const userTypeLabels = {
  student: 'Estudiante',
  professor: 'Docente',
  administrative: 'Administrativo',
  generalservices: 'Servicios generales',
} as const;

export type UserType = keyof typeof userTypeLabels;
