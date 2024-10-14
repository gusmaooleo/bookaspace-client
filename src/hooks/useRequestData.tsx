import RequestService from '@/services/requests/RequestService';
import { SpaceRequest } from '@/utils/interfaces/SpaceRequest';
import { create } from 'zustand';

interface RequestState {
  requests: SpaceRequest[]
  getRequests: () => Promise<void>
}

const requestService = new RequestService();

const requestStore = create<RequestState>((set) => ({
  requests: [],
  getRequests: async () => {
    try {
      const response = await requestService.getAllRequests();
      set({ requests: response })
    } catch (error) {
      throw error;
    }
  }
}))

export default requestStore;