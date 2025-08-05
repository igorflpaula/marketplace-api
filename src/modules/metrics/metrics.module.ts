import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MetricsController } from './metrics.controller';
import { MetricsRepository } from './repositories/metrics.repository';
import { GetSalesCountLast30DaysService } from './services/get-sales-count-last-30-days.service';
import { GetAvailableProductsCountService } from './services/get-available-products-count.service';
import { GetViewsCountLast30DaysService } from './services/get-views-count-last-30-days.service';
import { GetViewsPerDayService } from './services/get-views-per-day.service';
import { GetProductViewsCountService } from './services/get-product-views-count.service';
import { ProductsRepository } from '../products/repositories/products.repository';

@Module({
  providers: [
    PrismaService,
    MetricsRepository,
    ProductsRepository,
    GetSalesCountLast30DaysService,
    GetAvailableProductsCountService,
    GetViewsCountLast30DaysService,
    GetViewsPerDayService,
    GetProductViewsCountService,
  ],
  controllers: [MetricsController],
})
export class MetricsModule {}
