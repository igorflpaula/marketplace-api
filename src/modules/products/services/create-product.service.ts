import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/modules/categories/repositories/categories.repository';
import { type CreateProductBodySchema } from '../dtos/create-product.dto';
import { ProductsRepository } from '../repositories/products.repository';
import { AttachmentsRepository } from 'src/modules/attachments/repositories/attachments.repository';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly attachmentsRepository: AttachmentsRepository,
  ) {}

  async execute(data: CreateProductBodySchema, sellerId: string) {
    const categoryExists = await this.categoriesRepository.findById(
      data.categoryId,
    );
    if (!categoryExists) {
      throw new BadRequestException('Category not found.');
    }

    if (data.attachmentsIds && data.attachmentsIds.length > 0) {
      const attachments = await this.attachmentsRepository.findManyByIds(
        data.attachmentsIds,
      );

      if (attachments.length !== data.attachmentsIds.length) {
        throw new BadRequestException('One or more attachments not found.');
      }
    }

    const product = await this.productsRepository.create(data, sellerId);

    return {
      product,
    };
  }
}
