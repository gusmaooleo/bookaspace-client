import { Roles } from "./Roles";
import { SpaceRequest } from "./SpaceRequest";

export interface User {
  id: number,
  usernameUser: string,
  login: string,
  roles: Roles[],
  roleName?: string;
  requests: SpaceRequest[],
  approvalHistories: any[],
}