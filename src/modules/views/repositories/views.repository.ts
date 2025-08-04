import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class ViewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByProductAndViewer(productId: string, viewerId: string) {
    return this.prisma.view.findUnique({
      where: {
        productId_viewerId: {
          productId,
          viewerId,
        },
      },
    });
  }

  async create(productId: string, viewerId: string) {
    return this.prisma.view.create({
      data: {
        productId,
        viewerId,
      },
    });
  }
}
