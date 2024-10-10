import { NOT_FOUND_RESPONSE } from './../../shared/constants/response.constant';
import { Categories } from './../../shared/entities/categories.entity';
import { CategoryFiltersModel } from './../models/projects.model';
import { CategoryRepository } from './../../shared/repositories/category.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CrudCategoriesService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(body: BaseCategoryDto): Promise<{ rowId: string }> {
    return (await this.categoryRepo.insert(body)).identifiers[0]?.id;
  }
  async findOneByParams(params: CategoryFiltersModel): Promise<Categories> {
    const row = await this.categoryRepo.findOne({ where: { ...params } });
    if (!row) {
      throw new NotFoundException(NOT_FOUND_RESPONSE);
    }
    return row;
  }
}
