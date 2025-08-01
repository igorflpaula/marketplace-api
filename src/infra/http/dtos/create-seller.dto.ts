import { z } from 'zod';

export const createSellerBodySchema = z
  .object({
    name: z.string().min(3),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type CreateSellerBodySchema = z.infer<typeof createSellerBodySchema>;
