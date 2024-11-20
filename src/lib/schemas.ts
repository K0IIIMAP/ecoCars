import { z } from "zod";

export const addNewPostSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(10).max(500),
  price: z.number().int().min(2),
  location: z.string().min(2).max(50),
  phone: z.string().min(5).max(20),
  username: z.string().min(2).max(50),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
    confirmPassword: z.string().min(6).max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
