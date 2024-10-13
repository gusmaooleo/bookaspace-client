import environments from "@/config/environments";
import { Space } from "@/utils/interfaces/Space";
import Cookies from "js-cookie";
import axios from "axios";


class SpaceService {
  async createNewSpace(space: Space): Promise<Space> {
    try {
      const payload = await axios.post(`${environments.url}/physicalspaces`, space, {
        headers: {
          "Authorization": `Bearer ${Cookies.get('user_token')}`
        }
      })
      console.log(payload.data);
      return payload.data;
    } catch (error) {
      throw error;
    }
  }

  async getSpaces(): Promise<Space[]> {
    try {
      const payload = await axios.get(`${environments.url}/physicalspaces`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get('user_token')}`,
        }
      })
      return payload.data.content;
    } catch (error) {
      throw error;
    }
  }

}

export default SpaceService;