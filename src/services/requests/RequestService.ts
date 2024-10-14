import axios from 'axios';
import { SpaceRequest } from '../../utils/interfaces/SpaceRequest';
import environments from '@/config/environments';
import Cookies from 'js-cookie';



class RequestService {
  async getAllRequests(): Promise<SpaceRequest[]> {
    try {
      const payload = await axios.get<{ content: SpaceRequest[] }>(`${environments.url}/requests`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`
        }
      })

      return payload.data.content;
    } catch (error) {
      throw error;
    }
  }


}


export default RequestService;