export interface UpdateRequest {
  id?: number,
  dateTime: string,
  decision: boolean,
  observation: string,
  userId?: number,
  requestId: number,
}