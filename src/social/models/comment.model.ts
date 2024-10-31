export interface CommentFiltersModel {
  where?: CommentWhereModel;
}

export interface CommentWhereModel {
  rowTable?: string;
  rowId?: string;
  id?: number;
}
