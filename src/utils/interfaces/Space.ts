import { User } from "./User";

export interface Space {
  id?: number,
  creator?: User,
  name: string,
  location: string,
  type: 'CLASSROOM' | 'AUDITORIUM' | 'LABORATORY' | "",
  capacity: number,
  resources: string,
  creation?: string,
  status?: 'AVAILABLE' | 'UNAVAILABLE',
}