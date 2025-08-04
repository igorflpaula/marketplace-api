import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CategoriesModule } from '../categories/categories.module'; // Importa o módulo de categorias
import { ProductsController } from './products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductService } from './services/create-product.service';
import { AttachmentsModule } from '../attachments/attachments.module';

@Module({
  imports: [CategoriesModule, AttachmentsModule],
  controllers: [ProductsController],
  providers: [PrismaService, ProductsRepository, CreateProductService],
})
export class ProductsModule {}
