export interface CategoryFiltersModel {
  id?: number;
  title?: string;
  description?: string;
}

export interface ProjectModel {
  id?: number;
  title: string;
  description: string;
  finishDate?: Date;
  categoryIds: number[];
}
