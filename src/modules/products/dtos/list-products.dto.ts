import { z } from 'zod';
import { ProductStatus } from '@prisma/client';

export const listProductsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  status: z.nativeEnum(ProductStatus).optional(),
  q: z.string().optional(),
});

export type ListProductsQuerySchema = z.infer<typeof listProductsQuerySchema>;
