import { Injectable, NotFoundException } from '@nestjs/common';
import { SellersRepository } from '../repositories/sellers.repository';

@Injectable()
export class GetSellerProfileService {
  constructor(private readonly sellersRepository: SellersRepository) {}

  async execute(sellerId: string) {
    const seller = await this.sellersRepository.findById(sellerId);

    if (!seller) {
      throw new NotFoundException('Seller not found.');
    }

    const { password, ...sellerWithoutPassword } = seller;

    return {
      seller: sellerWithoutPassword,
    };
  }
}
