import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class ChangeProductStatusService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(productId: string, sellerId: string, newStatus: ProductStatus) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.sellerId !== sellerId) {
      throw new ForbiddenException(
        'You are not allowed to change the status of this product.',
      );
    }

    if (
      product.status === ProductStatus.SOLD &&
      newStatus === ProductStatus.CANCELLED
    ) {
      throw new BadRequestException(
        'Cannot cancel a product that has already been sold.',
      );
    }

    if (
      product.status === ProductStatus.CANCELLED &&
      newStatus === ProductStatus.SOLD
    ) {
      throw new BadRequestException(
        'Cannot sell a product that has been cancelled.',
      );
    }

    await this.productsRepository.updateStatus(productId, newStatus);
  }
}
