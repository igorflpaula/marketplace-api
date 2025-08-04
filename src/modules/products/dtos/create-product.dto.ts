import { z } from 'zod';

export const createProductBodySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  priceInCents: z.number().int().positive(),
  categoryId: z.string().uuid(),
});

export type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;
