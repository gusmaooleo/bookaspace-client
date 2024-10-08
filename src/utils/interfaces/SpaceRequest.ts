import { Space } from "./Space";
import { User } from "./User";

export interface SpaceRequest {
  _id: number,
  requester: User,
  requester_name?: string,
  manager?: User,
  action_time?: string,
  reason?: string,
  space: Space,
  title: string,
  openRequestDate: string,
  startDate: string,
  endDate: string,
  periodText?: string, 
  description: string,
  status: 'PENDING' | 'APPROVED' | 'REPROVED' | 'OUT_DEADLINE',
}