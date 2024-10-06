import { User } from "./User";

export interface Space {
  _id?: number,
  creator?: User,
  name: string,
  resources?: string,
  capacity?: number,
  creation?: string,
  type: 'CLASSROOM' | 'AUDITORIUM' | 'LABORATORY',
  status?: 'AVAILABLE' | 'UNAVAILABLE',
}