import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CategoriesModule } from '../categories/categories.module'; // Importa o módulo de categorias
import { ProductsController } from './products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductService } from './services/create-product.service';
import { AttachmentsModule } from '../attachments/attachments.module';
import { ListAllProductsService } from './services/list-all-products.service';
import { GetProductDetailsService } from './services/get-product-details.service';
import { EditProductService } from './services/edit-product.service';
import { ListSellerProductsService } from './services/list-seller-products.service';
@Module({
  imports: [CategoriesModule, AttachmentsModule],
  controllers: [ProductsController],
  providers: [
    PrismaService,
    ProductsRepository,
    CreateProductService,
    ListAllProductsService,
    GetProductDetailsService,
    EditProductService,
    ListSellerProductsService,
  ],
})
export class ProductsModule {}
