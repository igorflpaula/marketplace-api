import { Controller, Get } from '@nestjs/common';
import { ListCategoriesService } from './services/list-categories.service';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly listCategoriesService: ListCategoriesService) {}

  @Get()
  async findAll() {
    return this.listCategoriesService.execute();
  }
}
