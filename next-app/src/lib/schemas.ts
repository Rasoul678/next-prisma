import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z.string({}).email({ message: "Invalid email address." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .trim(),
});

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long.",
    })
    .trim(),
  email: z.string({}).email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
