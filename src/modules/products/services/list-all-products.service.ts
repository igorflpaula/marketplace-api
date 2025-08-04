import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { type ListProductsQuerySchema } from '../dtos/list-products.dto';

@Injectable()
export class ListAllProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(query: ListProductsQuerySchema) {
    return this.productsRepository.findMany(query);
  }
}
