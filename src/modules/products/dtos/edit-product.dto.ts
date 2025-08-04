import { z } from 'zod';

export const editProductParamsSchema = z.object({
  id: z.string().uuid(),
});

export const editProductBodySchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  priceInCents: z.number().int().positive().optional(),
  categoryId: z.string().uuid().optional(),
  attachmentsIds: z.array(z.string().uuid()).optional(),
});

export type EditProductParamsSchema = z.infer<typeof editProductParamsSchema>;
export type EditProductBodySchema = z.infer<typeof editProductBodySchema>;
