import { z } from 'zod';

export const createSellerBodySchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must have at least 3 characters.' }),
    phone: z
      .string()
      .min(10, { message: 'Phone must have at least 10 characters.' }),
    email: z.string().email({ message: 'Invalid e-mail format.' }),
    password: z
      .string()
      .min(6, { message: 'Password must have at least 6 characters.' }),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match.",
    path: ['passwordConfirmation'],
  });

export type CreateSellerBodySchema = z.infer<typeof createSellerBodySchema>;
