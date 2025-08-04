import { z } from 'zod';

export const updateSellerProfileBodySchema = z
  .object({
    name: z.string().min(3).optional(),
    phone: z.string().min(10).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: 'Current password is required to set a new password.',
      path: ['password'],
    },
  );

export type UpdateSellerProfileBodySchema = z.infer<
  typeof updateSellerProfileBodySchema
>;
