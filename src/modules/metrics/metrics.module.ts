import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MetricsController } from './metrics.controller';
import { MetricsRepository } from './repositories/metrics.repository';
import { GetSalesCountLast30DaysService } from './services/get-sales-count-last-30-days.service';
import { GetAvailableProductsCountService } from './services/get-available-products-count.service';

@Module({
  providers: [
    PrismaService,
    MetricsRepository,
    GetSalesCountLast30DaysService,
    GetAvailableProductsCountService,
  ],
  controllers: [MetricsController],
})
export class MetricsModule {}
