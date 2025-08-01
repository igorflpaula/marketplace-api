import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthenticateSellerService } from './services/authenticate-seller.service';
import { SellersRepository } from '../sellers/repositories/sellers.repository';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService) {
        const secret = config.get<string>('JWT_SECRET');

        return {
          secret: secret,
          signOptions: {
            expiresIn: '7d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenticateSellerService, SellersRepository, PrismaService],
})
export class AuthModule {}
