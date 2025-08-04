import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { type CreateProductBodySchema } from '../dtos/create-product.dto';
import { type ListProductsQuerySchema } from '../dtos/list-products.dto';
import { type EditProductBodySchema } from '../dtos/edit-product.dto';

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

  async findMany(query: ListProductsQuerySchema, sellerId?: string) {
    const { page, status, q } = query;
    const perPage = 20;

    const where = {
      ...(sellerId && { sellerId }),
      ...(status && { status }),
      ...(q && {
        OR: [{ title: { contains: q } }, { description: { contains: q } }],
      }),
    };

    const [products, totalCount] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          seller: {
            select: { id: true, name: true },
          },
          category: {
            select: { id: true, name: true, slug: true },
          },
          attachments: {
            select: { id: true, url: true },
            take: 1,
          },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage),
    };
  }

  async findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        category: true,
        attachments: true,
      },
    });
  }

  async update(productId: string, data: EditProductBodySchema) {
    const { attachmentsIds, ...productData } = data;

    return this.prisma.product.update({
      where: { id: productId },
      data: {
        ...productData,
        ...(attachmentsIds && {
          attachments: {
            set: attachmentsIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }
}
