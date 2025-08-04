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
import { ChangeProductStatusService } from './services/change-product-status.service';
import { ViewsModule } from '../views/views.module';
import { RegisterProductViewService } from './services/register-product-view.service';

@Module({
  imports: [CategoriesModule, AttachmentsModule, ViewsModule],
  controllers: [ProductsController],
  providers: [
    PrismaService,
    ProductsRepository,
    CreateProductService,
    ListAllProductsService,
    GetProductDetailsService,
    EditProductService,
    ListSellerProductsService,
    ChangeProductStatusService,
    RegisterProductViewService,
  ],
})
export class ProductsModule {}
