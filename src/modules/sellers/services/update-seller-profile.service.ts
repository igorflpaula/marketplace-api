import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SellersRepository } from '../repositories/sellers.repository';
import { compare, hash } from 'bcrypt';
import { type UpdateSellerProfileBodySchema } from '../dtos/update-seller-profile.dto';

@Injectable()
export class UpdateSellerProfileService {
  constructor(private readonly sellersRepository: SellersRepository) {}

  async execute(sellerId: string, data: UpdateSellerProfileBodySchema) {
    const sellerToUpdate = await this.sellersRepository.findById(sellerId);

    if (!sellerToUpdate) {
      throw new UnauthorizedException();
    }

    if (data.phone) {
      const phoneInUse = await this.sellersRepository.findByPhone(data.phone);
      if (phoneInUse && phoneInUse.id !== sellerId) {
        throw new ConflictException('This phone number is already in use.');
      }
    }

    if (data.email) {
      const emailInUse = await this.sellersRepository.findByEmail(data.email);
      if (emailInUse && emailInUse.id !== sellerId) {
        throw new ConflictException('This e-mail is already in use.');
      }
    }

    if (data.newPassword && data.password) {
      const passwordsMatch = await compare(
        data.password,
        sellerToUpdate.password,
      );

      if (!passwordsMatch) {
        throw new UnauthorizedException('Invalid current password.');
      }

      const hashedNewPassword = await hash(data.newPassword, 8);
      data.password = hashedNewPassword;
      delete data.newPassword;
    } else {
      delete data.password;
      delete data.newPassword;
    }

    await this.sellersRepository.update(sellerId, data);
  }
}
