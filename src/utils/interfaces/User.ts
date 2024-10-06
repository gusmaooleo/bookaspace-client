export interface User {
  _id: number,
  login: string,
  username: string,
  role: 'TEATCHER' | 'ADMIN' | 'MANAGER',
}