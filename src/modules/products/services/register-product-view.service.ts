import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { ViewsRepository } from 'src/modules/views/repositories/views.repository';

@Injectable()
export class RegisterProductViewService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly viewsRepository: ViewsRepository,
  ) {}

  async execute(productId: string, viewerId: string) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (product.sellerId === viewerId) {
      throw new ForbiddenException('You cannot view your own product.');
    }

    const existingView = await this.viewsRepository.findByProductAndViewer(
      productId,
      viewerId,
    );

    if (existingView) {
      throw new BadRequestException('You have already viewed this product.');
    }

    await this.viewsRepository.create(productId, viewerId);
  }
}
