import { Roles } from "./Roles";
import { SpaceRequest } from "./SpaceRequest";

export interface User {
  id: number,
  username: string,
  login: string,
  role: Roles[],
  requests: SpaceRequest[],
  approvalHistories: any[],
}