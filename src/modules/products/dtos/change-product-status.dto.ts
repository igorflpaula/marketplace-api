import { z } from 'zod';
import { ProductStatus } from '@prisma/client';

export const changeProductStatusParamsSchema = z.object({
  id: z.string().uuid(),
});

export const changeProductStatusBodySchema = z.object({
  status: z.nativeEnum(ProductStatus),
});

export type ChangeProductStatusParamsSchema = z.infer<
  typeof changeProductStatusParamsSchema
>;
export type ChangeProductStatusBodySchema = z.infer<
  typeof changeProductStatusBodySchema
>;
