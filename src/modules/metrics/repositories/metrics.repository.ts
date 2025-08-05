import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class MetricsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async countSoldProductsInLast30Days(sellerId: string): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.prisma.product.count({
      where: {
        sellerId,
        status: ProductStatus.SOLD,
        updatedAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    return result;
  }

  async countAvailableProductsInLast30Days(sellerId: string): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.prisma.product.count({
      where: {
        sellerId,
        status: ProductStatus.AVAILABLE,
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });
  }
}
