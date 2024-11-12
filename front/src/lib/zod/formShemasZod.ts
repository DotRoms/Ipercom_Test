import { z } from "zod";
import { emailRegex, passwordRegex } from "../../utils/regex";

export const signupSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: "Le prénom est requis" })
            .min(2, {
                message: "Le prénom doit contenir au moins 2 caractères",
            }),
        email: z
            .string()
            .regex(emailRegex, { message: "Veuillez entrer un email valide" }),
        password: z.string().regex(passwordRegex, {
            message:
                "Le mot de passe doit contenir au moins 8 caractères [1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial]",
        }),
        confirmPassword: z
            .string()
            .regex(passwordRegex, { message: "Veuillez confirmer votre mot de passe" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Les mots de passe ne correspondent pas",
    });

    export const loginSchema = z.object({
        email: z
            .string()
            .regex(emailRegex, { message: "Veuillez entrer un email valide" }),
        password: z.string({ message: "Veuillez entrer un mot de passe" }),
    });

    export const taskSchema = z.object({
        title: z.string().min(2, { message: "Saisir un minimum de 2 caractères" }),
    });