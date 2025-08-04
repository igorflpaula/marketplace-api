import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class ListCategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute() {
    const categories = await this.categoriesRepository.findAll();
    return { categories };
  }
}
