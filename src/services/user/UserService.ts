import environments from "@/config/environments";
import { UserLogin } from "@/utils/interfaces/UserLogin";
import { User } from "@/utils/interfaces/User";
import Cookies from 'js-cookie';
import axios from "axios";

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
      throw error;
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
      throw error;
    }
  }
  
  async getAll(): Promise<User[]> {
    try {
      const payload = await axios.get<{ content: User[] }>(`${environments.url}/users`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("user_token")}`
        }
      })
      return payload.data.content;
    } catch (error) {
      throw error;
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