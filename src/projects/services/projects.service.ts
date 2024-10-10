import { CategoryRepository } from './../../shared/repositories/category.repository';
import { Categories } from './../../shared/entities/categories.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  constructor(private readonly _categoriyRepo: CategoryRepository) {}

  async getRelatedData(): Promise<{ categories: Categories[] }> {
    const categories = await this._categoriyRepo.find();
    return { categories };
  }
}
