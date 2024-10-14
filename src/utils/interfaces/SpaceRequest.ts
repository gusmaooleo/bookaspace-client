export interface SpaceRequest {
  id: number,
  userId?: number,
  title: string,
  dateTimeStart: string,
  approvalHistory?: any,
  dateTimeEnd: string,
  dateCreationRequest: string,
  needs: string,
  physicalSpaceId: number,
  status: 'PENDING' | 'APPROVED' | 'REPROVED' | 'OUT_DEADLINE',
}