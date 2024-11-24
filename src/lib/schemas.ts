import { z } from "zod";

export const addNewPostSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(50).max(2500),
  price: z.string().min(2),
  location: z.string().min(2).max(50),
});

export const signUpSchema = z
  .object({
    email: z.string().email().max(100),
    password: z
      .string()
      .min(6)
      .max(30)
      .regex(/[a-zA-Z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string().min(6).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6).max(30),
});
