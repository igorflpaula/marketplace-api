import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repositories/metrics.repository';

@Injectable()
export class GetSalesCountLast30DaysService {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(sellerId: string) {
    const amount =
      await this.metricsRepository.countSoldProductsInLast30Days(sellerId);
    return { amount };
  }
}
