export interface MemberFiltersModel {
  where?: MemberWhereModel;
  relations?: 'roles';
}

export interface MemberWhereModel {
  projectId?: number;
  projectRoleId?: number;
}

export interface TasksFiltersModel {
  where?: TasksWhereModel;
  relations?: 'status';
}

export interface TasksWhereModel {
  projectId?: number;
  memberId?: number;
  statusId?: number;
  id?: number;
}
