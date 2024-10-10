export interface UserBaseModel {
  id?: string;
  identification?: string;
  fullName?: string;
  avatarUrl?: string;
  username?: string;
  phone?: string;
  email?: string;
  password?: string;
  createdAt?: Date;

  deletedAt?: Date;
  confirmationPassword?: string;
}

export interface UserFiltersModel {
  where?: UserWhereModel;
  relations?: 'roles';
}

export interface UserWhereModel {
  id?: string;
  identification?: string;
  email?: string;
}
