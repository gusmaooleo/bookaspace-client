import environments from "@/config/environments";
import { UserLogin } from "@/utils/interfaces/UserLogin";
import { User } from "@/utils/interfaces/User";
import Cookies from 'js-cookie';
import axios from "axios";

interface CreateUserData {
  usernameUser: string;
  login: string;
  password: string;
  roles: { id: number }[];
}

interface UpdateUserData {
  id: number,
  usernameUser: string;
  login: string;
  roles: { id: number, authority: string }[];
}


class UserService {
  /**
   * Serviço de login, envia a requisição, resgata o token e carrega as informações do usuário no localstorage.
   * @param loginCredentials 
   * @returns 
   */

  async logService(loginCredentials: UserLogin, isTemp: boolean): Promise<any> {
    try {
      const payload = await axios.post(`${environments.url}/oauth2/token`, {
        "username": loginCredentials.login,
        "password": loginCredentials.password,
        "grant_type": "password"
      }, {
        headers: {
          "Authorization": `Basic ${this.getOABasic()}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      const token = payload.data["access_token"];
      const userData = await this.getMe(token);
      const expiration = payload.data['expires_in'] / (24 * 60 * 60);
      this.loadDataSession(token, userData, expiration, isTemp);
      return userData;
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Resgata as informações do usuário.
   * @param token 
   * @returns 
   */
  async getMe(token: string): Promise<User | any> {
    try {
      const payload = await axios.get(`${environments.url}/users/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      return payload.data;
    } catch (error) {
      console.error(error)
    }
  }
  
  async getAll(): Promise<User[] | any> {
    try {
      const payload = await axios.get<{ content: User[] }>(`${environments.url}/users`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("user_token")}`
        }
      })
      return payload.data.content;
    } catch (error) {
      console.error(error)
    }
  }
  
  async getById(id: number): Promise<User | any> {
    try {
      const payload = await axios.get(`${environments.url}/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("user_token")}`
        }
      })
      return payload.data;
    } catch (error) {
      console.error(error)
    }
  }

  loadDataSession(token: string, userData: User, expiration: number, isTemp: boolean) {
    if (isTemp) {
      Cookies.set('user_token', token, { expires: expiration, path: '/'})
    } else {
      Cookies.set('user_token', token, { path: '/'})
    }
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  async createUser(userData: CreateUserData): Promise<User | any> {
    try {
      const response = await axios.post(`${environments.url}/users`, userData, {
        headers: {
          "Authorization": `Bearer ${this.getToken()}`,
          "Content-Type": "application/json"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      console.error(error)
    }
  }

  async updateUser(userId: number, userData: UpdateUserData): Promise<User | any> {
    try {
      const token = this.getToken();
      const response = await axios.put(`${environments.url}/users/${userId}`, userData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      console.error(error)
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      const token = this.getToken();
      await axios.delete(`${environments.url}/users/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      console.error(error)
    }
  }


  private getToken(): string {
    const token = Cookies.get('user_token');
    if (!token) {
      throw new Error('No token found');
    }
    return token;
  }

  logOut() {
    Cookies.remove('user_token', { path: '/' });
    localStorage.removeItem('user_data');
    window.location.reload();
  }


  getOABasic(): string {
    return Buffer
      .from(`${environments.username}:${environments.password}`, 'utf-8')
      .toString('base64');
  }
}

export default UserService;