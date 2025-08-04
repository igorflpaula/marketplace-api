import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ViewsRepository } from './repositories/views.repository';

@Module({
  providers: [PrismaService, ViewsRepository],
  exports: [ViewsRepository],
})
export class ViewsModule {}
