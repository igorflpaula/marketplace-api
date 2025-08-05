import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MetricsRepository } from '../repositories/metrics.repository';
import { ProductsRepository } from 'src/modules/products/repositories/products.repository';

@Injectable()
export class GetProductViewsCountService {
  constructor(
    private readonly metricsRepository: MetricsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(productId: string, sellerId: string) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.sellerId !== sellerId) {
      throw new ForbiddenException('You cannot view metrics for this product.');
    }

    const amount =
      await this.metricsRepository.countViewsForProductInLast7Days(productId);
    return { amount };
  }
}
