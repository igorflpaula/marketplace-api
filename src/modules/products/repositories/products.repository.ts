import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { type CreateProductBodySchema } from '../dtos/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductBodySchema, sellerId: string) {
    return this.prisma.product.create({
      data: {
        ...data,
        sellerId,
      },
    });
  }
}
