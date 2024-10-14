import UserService from '@/services/user/UserService';
import { User } from '@/utils/interfaces/User';
import { create } from 'zustand';

interface UserState {
  users: User[]
  getUsers: () => Promise<void>
}

const userService = new UserService();

const userStore = create<UserState>((set) => ({
  users: [],
  getUsers: async () => {
    try {
      const response = await userService.getAll()
      set({ users: response })
    } catch (error) {
      throw error;
    }
  }
}))

export default userStore;