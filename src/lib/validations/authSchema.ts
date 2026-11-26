
import { z } from "zod";
import { isValidCpf, normalizeCpf } from "./cpf";

export const loginSchema = z.object({
  cpf: z.string()
    .refine(isValidCpf, "Informe um CPF válido."),

  password: z.string()
    .min(1, "Informe sua senha."),
});

export const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Informe seu nome completo.")
    .refine(
      (value) => value.trim().split(/\s+/).length >= 2,
      "Informe nome e sobrenome."
    ),

  email: z.string()
    .trim()
    .email("Informe um e-mail válido."),

  cpf: z.string()
    .refine(isValidCpf, "Informe um CPF válido."),

  password: z.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres."),

  confirmPassword: z.string(),

  role: z.enum(["parent", "child"]),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  }
);

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;

export function toRegisterPayload(data: RegisterFormData) {
  const nameParts = data.name.trim().split(/\s+/);

  const firstName = nameParts.shift()!;

  const lastName = nameParts.join(" ");

  return {
    firstName,
    lastName,
    email: data.email.trim().toLowerCase(),
    cpf: normalizeCpf(data.cpf),
    password: data.password,
    role: data.role,
  };
}
