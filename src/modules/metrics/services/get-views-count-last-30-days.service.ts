import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repositories/metrics.repository';

@Injectable()
export class GetViewsCountLast30DaysService {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(sellerId: string) {
    const amount =
      await this.metricsRepository.countViewsInLast30Days(sellerId);
    return { amount };
  }
}
