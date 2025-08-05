import { Injectable } from '@nestjs/common';
import { MetricsRepository } from '../repositories/metrics.repository';

@Injectable()
export class GetViewsPerDayService {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(sellerId: string) {
    const viewsPerDay =
      await this.metricsRepository.getViewsPerDayInLast30Days(sellerId);
    return { viewsPerDay };
  }
}
