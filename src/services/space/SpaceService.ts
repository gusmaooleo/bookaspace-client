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
  private filterObjects: FilterObjects = {
    spaceCapacityObject: [],
    spaceNameObject: [],
    typeObject: [],
  };

  async createNewSpace(space: Space): Promise<Space> {
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
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });
      return payload.data.content;
    } catch (error) {
      throw error;
    }
  }

  async getSpaceById(id: string): Promise<Space> {
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
      throw error;
    }
  }

  async filterSpaceByCapacity(capacity: string): Promise<Space[]> {
    try {
      const payload = await axios.get<{ content?: Space[] }>(
        `${environments.url}/physicalspaces/capacity/${capacity}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        }
      );
      return payload.data.content || [];
    } catch (error) {
      throw error;
    }
  }

  async filterSpaceByName(name: string): Promise<Space[]> {
    try {
      const payload = await axios.get<{ content?: Space[] }>(
        `${environments.url}/physicalspaces/name/${name}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        }
      );
      return payload.data.content || [];
    } catch (error) {
      throw error;
    }
  }

  async filterSpaceByType(name: string): Promise<Space[]> {
    try {
      const payload = await axios.get<{ content?: Space[] }>(
        `${environments.url}/physicalspaces/type/${name}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        }
      );
      return payload.data.content || [];
    } catch (error) {
      throw error;
    }
  }

  // deve ser do lado do servidor, tudo em apenas uma query
  async spaceFilter(filterParams: SpaceFilterModel) {
    let allSpacesCompare = await this.getSpaces();

    if (
      filterParams["spaceCapacity"] !== "null" &&
      filterParams["spaceCapacity"].length > 0
    ) {
      this.filterObjects["spaceCapacityObject"] =
        await this.filterSpaceByCapacity(filterParams["spaceCapacity"]);
    } else {
      this.filterObjects["spaceCapacityObject"] = allSpacesCompare;
    }

    if (filterParams["spaceName"].length > 0) {
      this.filterObjects["spaceNameObject"] = await this.filterSpaceByName(
        filterParams["spaceName"]
      );
    } else {
      this.filterObjects["spaceNameObject"] = allSpacesCompare;
    }
    if (filterParams["type"].length > 0) {
      this.filterObjects["typeObject"] = await this.filterSpaceByType(
        filterParams["type"]
      );
    } else {
      this.filterObjects["typeObject"] = allSpacesCompare;
    }

    const { spaceCapacityObject, spaceNameObject, typeObject } =
      this.filterObjects;

    const spaceNameIds = new Set(spaceNameObject.map((space) => space.id));
    const typeObjectIds = new Set(typeObject.map((space) => space.id));

    const commonSpaces = spaceCapacityObject.filter(
      (space) => spaceNameIds.has(space.id) && typeObjectIds.has(space.id)
    );

    return commonSpaces;
  }
}

export default SpaceService;
