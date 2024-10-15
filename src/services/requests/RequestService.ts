import { SpaceRequest } from '../../utils/interfaces/SpaceRequest';
import environments from '@/config/environments';
import Cookies from 'js-cookie';
import axios from 'axios';
import { RequestFilterModel } from '@/utils/interfaces/RequestFilterModel';

interface FilterObjects {
  orderByObject: SpaceRequest[];
  statusObject: SpaceRequest[];
}

class RequestService {
  private filterObjects: FilterObjects = {
    orderByObject: [],
    statusObject: [],
  };

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

  async sendRequest(spaceRequest: SpaceRequest): Promise<SpaceRequest> {
    try {
      const payload = await axios.post(`${environments.url}/requests`, spaceRequest, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`
        }
      })
      return payload.data;
    } catch (error) {
      throw error;
    }
  }
  
  async putRequest(spaceRequest: SpaceRequest): Promise<SpaceRequest> {
    try {
      const payload = await axios.put(`${environments.url}/requests/${spaceRequest.id}`, spaceRequest, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`
        }
      })
      return payload.data;
    } catch (error) {
      throw error;
    }
  }
  
  async getRequestById(id: string): Promise<SpaceRequest> {
    try {
      const payload = await axios.get(`${environments.url}/requests/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`
        }
      })
      return payload.data;
    } catch (error) {
      throw error;
    }
  }
  
  async filterRequestByStatus(status: string): Promise<SpaceRequest[]> {
    try {
      const payload = await axios.get<{ content: SpaceRequest[] }>(`${environments.url}/requests/status/${status}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`
        }
      })
      return payload.data.content;
    } catch (error) {
      throw error;
    }
  }


  async requestFilter(requestFilter: RequestFilterModel) {
    const allRequestsCompare = await this.getAllRequests();

    if (requestFilter["status"].length > 0) {
      this.filterObjects["statusObject"] = await this.filterRequestByStatus(
        requestFilter["status"]
      );
    } else {
      this.filterObjects["statusObject"] = allRequestsCompare;
    }

    const { statusObject } = this.filterObjects;

    const statusIds = new Set(statusObject.map((request) => request.id));

    const commonSpaces = allRequestsCompare.filter(
      (request) => statusIds.has(request.id)
    );

    return requestFilter.orderBy === 'asc' ? commonSpaces : commonSpaces.reverse();
  }
}


export default RequestService;