import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './repositories/categories.repository';
import { ListCategoriesService } from './services/list-categories.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesRepository, ListCategoriesService],
  exports: [CategoriesRepository],
})
export class CategoriesModule {}
