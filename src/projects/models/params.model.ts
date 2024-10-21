export interface MemberFiltersModel {
  where?: MemberWhereModel;
  relations?: 'roles';
}

export interface MemberWhereModel {
  projectId?: number;
  projectRoleId?: number;
}
