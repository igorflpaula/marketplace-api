import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/modules/categories/repositories/categories.repository';
import { type CreateProductBodySchema } from '../dtos/create-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async execute(data: CreateProductBodySchema, sellerId: string) {
    const categoryExists = await this.categoriesRepository.findById(
      data.categoryId,
    );

    if (!categoryExists) {
      throw new BadRequestException('Category not found.');
    }

    const product = await this.productsRepository.create(data, sellerId);

    return {
      product,
    };
  }
}
