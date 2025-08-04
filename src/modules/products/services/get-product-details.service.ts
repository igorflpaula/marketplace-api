import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class GetProductDetailsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(productId: string) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return { product };
  }
}
