import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().nonempty({ message: "Este campo no puede estar vacío" }).email({ message: "Email inválido" }),
    password: z.string()
        .nonempty({ message: "Este campo no puede estar vacío" })
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .regex(/^[A-Za-z]/, { message: "Debe empezar con una letra" })
        .regex(/[A-Z]/, { message: "Debe tener al menos una mayúscula" })
        .regex(/[a-z]/, { message: "Debe tener al menos una minúscula" })
        .regex(/[0-9]/, { message: "Debe contener un número" })
        .regex(/[#@$!%*?&]/, { message: "Debe tener un caracter especial (@, #, $, !, %, *, ?, &)" }),
});