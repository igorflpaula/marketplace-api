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

  async countViewsInLast30Days(sellerId: string): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.prisma.view.count({
      where: {
        product: {
          sellerId: sellerId,
        },
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });
  }

  async getViewsPerDayInLast30Days(sellerId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.prisma.view.groupBy({
      by: ['createdAt'],
      where: {
        product: {
          sellerId,
        },
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const viewsPerDay = result.reduce(
      (acc, curr) => {
        const date = curr.createdAt.toISOString().split('T')[0]; // Pega apenas a data 'YYYY-MM-DD'
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += curr._count.id;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(viewsPerDay).map(([date, count]) => ({
      date,
      count,
    }));
  }

  async countViewsForProductInLast7Days(productId: string): Promise<number> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return this.prisma.view.count({
      where: {
        productId: productId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });
  }
}
