import axios from 'axios';
import environments from '@/config/environments';
import { User } from '@/utils/interfaces/User';
import Cookies from 'js-cookie';

class GestaoService {
  private baseUrl: string = environments.url;

  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(`${this.baseUrl}/users`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  private getToken(): string {
    const token = Cookies.get('user_token');
    if (!token) {
      throw new Error('No token found');
    }
    return token;
  }
}

export default new GestaoService();