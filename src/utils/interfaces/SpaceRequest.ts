import { User } from "./User";

export interface SpaceRequest {
  id?: number,
  userId?: number,
  username?: string,
  user?: User,
  title: string,
  dateTimeStart: string,
  approvalHistory?: any,
  userAction?: User,
  dateTimeEnd: string,
  dateCreationRequest?: string,
  needs: string,
  physicalSpaceId: number,
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'OUT_DEADLINE',
}