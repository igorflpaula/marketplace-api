import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellersModule } from './modules/sellers/sellers.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { ViewsModule } from './modules/views/views.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SellersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    AttachmentsModule,
    ViewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
