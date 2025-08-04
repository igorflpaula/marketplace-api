import { z } from 'zod';

export const getProductDetailsParamsSchema = z.object({
  id: z.string().uuid(),
});

export type GetProductDetailsParamsSchema = z.infer<
  typeof getProductDetailsParamsSchema
>;
