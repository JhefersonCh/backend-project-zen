export interface TokenPayloadModel {
  sub?: string;
  email?: string;
  identification?: string;
}

export interface UserAuthModel {
  id: string;
  email: string;
  roleCode?: string;
}
