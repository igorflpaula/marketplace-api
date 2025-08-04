import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from 'src/modules/categories/repositories/categories.repository';
import { ProductsRepository } from '../repositories/products.repository';
import { AttachmentsRepository } from 'src/modules/attachments/repositories/attachments.repository';
import { type EditProductBodySchema } from '../dtos/edit-product.dto';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class EditProductService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly attachmentsRepository: AttachmentsRepository,
  ) {}

  async execute(
    productId: string,
    sellerId: string,
    data: EditProductBodySchema,
  ) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.sellerId !== sellerId) {
      throw new ForbiddenException('You are not allowed to edit this product.');
    }

    if (product.status === ProductStatus.SOLD) {
      throw new BadRequestException(
        'Cannot edit a product that has already been sold.',
      );
    }

    if (data.categoryId) {
      const categoryExists = await this.categoriesRepository.findById(
        data.categoryId,
      );
      if (!categoryExists) {
        throw new BadRequestException('Category not found.');
      }
    }

    if (data.attachmentsIds && data.attachmentsIds.length > 0) {
      const attachments = await this.attachmentsRepository.findManyByIds(
        data.attachmentsIds,
      );
      if (attachments.length !== data.attachmentsIds.length) {
        throw new BadRequestException('One or more attachments not found.');
      }
    }

    await this.productsRepository.update(productId, data);
  }
}
