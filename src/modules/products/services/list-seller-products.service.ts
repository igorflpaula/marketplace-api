import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { type ListProductsQuerySchema } from '../dtos/list-products.dto';

@Injectable()
export class ListSellerProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(sellerId: string, query: ListProductsQuerySchema) {
    return this.productsRepository.findMany(query, sellerId);
  }
}
