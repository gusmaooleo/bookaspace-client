import environments from "@/config/environments";
import { Space } from "@/utils/interfaces/Space";
import Cookies from "js-cookie";
import axios from "axios";
import { SpaceFilterModel } from "@/utils/interfaces/SpaceFilterModel";

interface FilterObjects {
  spaceCapacityObject: Space[];
  spaceNameObject: Space[];
  typeObject: Space[];
}

class SpaceService {
  async createNewSpace(space: Space): Promise<Space | any> {
    try {
      const payload = await axios.post(
        `${environments.url}/physicalspaces`,
        space,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        }
      );
      return payload.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getSpaces(): Promise<Space[] | any> {
    try {
      const payload = await axios.get(`${environments.url}/physicalspaces`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      return payload.data.content;
    } catch (error) {
      console.error(error);
    }
  }

  async getSpaceById(id: string): Promise<Space | any> {
    try {
      const payload = await axios.get(
        `${environments.url}/physicalspaces/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        }
      );
      return payload.data;
    } catch (error) {
      console.error(error);
    }
  }

  async spaceFilter(filterParams: SpaceFilterModel) {
    try {
      console.log(filterParams)
      const payload = await axios.get<{ content?: Space[] }>(
        `${environments.url}/physicalspaces`,
        {
          params: filterParams,
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        }
      );

      return payload.data.content || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default SpaceService;
