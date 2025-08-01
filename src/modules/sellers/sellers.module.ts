import { Module } from '@nestjs/common';
import { SellersController } from './sellers.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { SellersRepository } from './repositories/sellers.repository';
import { CreateSellerService } from './services/create-seller.service';

@Module({
  controllers: [SellersController],
  providers: [PrismaService, SellersRepository, CreateSellerService],
})
export class SellersModule {}
