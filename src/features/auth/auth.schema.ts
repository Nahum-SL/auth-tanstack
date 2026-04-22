import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginInputValues = z.input<typeof loginSchema>;
export type LoginFormValues = z.output<typeof loginSchema>;