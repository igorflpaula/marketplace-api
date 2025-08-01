import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { SellersRepository } from '../repositories/sellers.repository';
import { CreateSellerBodySchema } from '../dtos/create-seller.dto';

@Injectable()
export class CreateSellerService {
  constructor(private readonly sellersRepository: SellersRepository) {}

  async execute(data: CreateSellerBodySchema) {
    const emailInUse = await this.sellersRepository.findByEmail(data.email);
    if (emailInUse) {
      throw new ConflictException('This e-mail is already in use.');
    }

    const phoneInUse = await this.sellersRepository.findByPhone(data.phone);
    if (phoneInUse) {
      throw new ConflictException('This phone number is already in use.');
    }

    const hashedPassword = await hash(data.password, 8);

    const seller = await this.sellersRepository.create(data, hashedPassword);

    return {
      seller,
    };
  }
}
