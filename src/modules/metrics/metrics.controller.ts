import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GetSalesCountLast30DaysService } from './services/get-sales-count-last-30-days.service';
import { GetAvailableProductsCountService } from './services/get-available-products-count.service';

interface CurrentUserPayload {
  userId: string;
}

@Controller('/metrics')
@UseGuards(JwtAuthGuard)
export class MetricsController {
  constructor(
    private readonly getSalesCountLast30DaysService: GetSalesCountLast30DaysService,
    private readonly getAvailableProductsCountService: GetAvailableProductsCountService,
  ) {}

  @Get('/sales-count-30d')
  async getSalesCountLast30Days(@CurrentUser() user: CurrentUserPayload) {
    return this.getSalesCountLast30DaysService.execute(user.userId);
  }

  @Get('/available-count-30d')
  async getAvailableProductsCount(@CurrentUser() user: CurrentUserPayload) {
    return this.getAvailableProductsCountService.execute(user.userId);
  }
}
