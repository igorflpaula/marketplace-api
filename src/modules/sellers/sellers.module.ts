import { Module } from '@nestjs/common';
import { SellersController } from './sellers.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { SellersRepository } from './repositories/sellers.repository';
import { CreateSellerService } from './services/create-seller.service';
import { GetSellerProfileService } from './services/get-seller-profile.service';
import { UpdateSellerProfileService } from './services/update-seller-profile.service';

@Module({
  controllers: [SellersController],
  providers: [
    PrismaService,
    SellersRepository,
    CreateSellerService,
    GetSellerProfileService,
    UpdateSellerProfileService,
  ],
})
export class SellersModule {}
