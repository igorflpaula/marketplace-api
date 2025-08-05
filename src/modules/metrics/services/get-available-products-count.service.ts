import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repositories/metrics.repository';

@Injectable()
export class GetAvailableProductsCountService {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(sellerId: string) {
    const amount =
      await this.metricsRepository.countAvailableProductsInLast30Days(sellerId);
    return { amount };
  }
}
