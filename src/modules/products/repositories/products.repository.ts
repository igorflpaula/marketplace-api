import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { type CreateProductBodySchema } from '../dtos/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductBodySchema, sellerId: string) {
    const { attachmentsIds, ...productData } = data;

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          ...productData,
          sellerId,
        },
      });

      if (attachmentsIds && attachmentsIds.length > 0) {
        await tx.attachment.updateMany({
          where: {
            id: {
              in: attachmentsIds,
            },
          },
          data: {
            productId: product.id,
          },
        });
      }

      return product;
    });
  }
}
