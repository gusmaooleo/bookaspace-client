import axios from 'axios';
import environments from '@/config/environments';
import { User } from '@/utils/interfaces/User';
import Cookies from 'js-cookie';
import { Audit } from '@/utils/interfaces/Audit';
import { format } from 'date-fns';
class GestaoService {
    private baseUrl: string = environments.url;
    async getUsers(): Promise<User[]> {
        try {
            const response = await axios.get<{ content: User[] }>(`${this.baseUrl}/users`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            console.log(response.data.content);
            return response.data.content;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getAudits(): Promise<Audit[]> {
        try {
            const response = await axios.get<Audit[] >(`${this.baseUrl}/audit/logs`, {
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            const formattedAudits = response.data.map(audit => ({
                ...audit,
                timestamp: format(new Date(audit.timestamp), "dd/MM/yyyy 'às' HH:mm")
            }));

            return formattedAudits;
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