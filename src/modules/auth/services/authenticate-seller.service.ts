import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { SellersRepository } from 'src/modules/sellers/repositories/sellers.repository';
import { type AuthenticateBodySchema } from '../dtos/authenticate-seller.dto';

@Injectable()
export class AuthenticateSellerService {
  constructor(
    private readonly sellersRepository: SellersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: AuthenticateBodySchema) {
    const seller = await this.sellersRepository.findByEmail(email);

    if (!seller) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, seller.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: seller.id,
    });

    return {
      accessToken,
    };
  }
}
