import { Injectable } from '@nestjs/common';
import { CrudCategoriesService } from '../services/crudCategories.service';
import { BaseCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CrudCategoriesUseCase {
  constructor(private readonly _crudCategoriesService: CrudCategoriesService) {}
  async create(body: BaseCategoryDto) {
    return await this._crudCategoriesService.create(body);
  }

  async findOneByParams(id: number) {
    return await this._crudCategoriesService.findOneByParams({ id });
  }
}
