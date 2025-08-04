import { z } from 'zod';

export const registerProductViewParamsSchema = z.object({
  id: z.string().uuid(),
});

export type RegisterProductViewParamsSchema = z.infer<
  typeof registerProductViewParamsSchema
>;
