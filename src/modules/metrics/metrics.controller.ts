import {
  Controller,
  Get,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GetSalesCountLast30DaysService } from './services/get-sales-count-last-30-days.service';
import { GetAvailableProductsCountService } from './services/get-available-products-count.service';
import { GetViewsCountLast30DaysService } from './services/get-views-count-last-30-days.service';
import { GetViewsPerDayService } from './services/get-views-per-day.service';
import { GetProductViewsCountService } from './services/get-product-views-count.service';
import { z } from 'zod';

const getProductMetricsParamsSchema = z.object({
  id: z.string().uuid(),
});
interface CurrentUserPayload {
  userId: string;
}

@Controller('/metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(
    private readonly getSalesCountLast30DaysService: GetSalesCountLast30DaysService,
    private readonly getAvailableProductsCountService: GetAvailableProductsCountService,
    private readonly getViewsCountLast30DaysService: GetViewsCountLast30DaysService,
    private readonly getViewsPerDayService: GetViewsPerDayService,
    private readonly getProductViewsCountService: GetProductViewsCountService,
  ) {}

  @Get('/sales-count-30d')
  async getSalesCountLast30Days(@CurrentUser() user: CurrentUserPayload) {
    return this.getSalesCountLast30DaysService.execute(user.userId);
  }

  @Get('/available-count-30d')
  async getAvailableProductsCount(@CurrentUser() user: CurrentUserPayload) {
    return this.getAvailableProductsCountService.execute(user.userId);
  }

  @Get('/views-count-30d')
  async getViewsCountLast30Days(@CurrentUser() user: CurrentUserPayload) {
    return this.getViewsCountLast30DaysService.execute(user.userId);
  }

  @Get('/views-per-day-30d')
  async getViewsPerDay(@CurrentUser() user: CurrentUserPayload) {
    return this.getViewsPerDayService.execute(user.userId);
  }

  @Get('/products/:id/views-count-7d')
  async getProductViewsCount(
    @CurrentUser() user: CurrentUserPayload,
    @Param() params: { id: string },
  ) {
    const paramsResult = getProductMetricsParamsSchema.safeParse(params);
    if (!paramsResult.success) {
      throw new BadRequestException(paramsResult.error.flatten().fieldErrors);
    }

    return this.getProductViewsCountService.execute(
      paramsResult.data.id,
      user.userId,
    );
  }
}
