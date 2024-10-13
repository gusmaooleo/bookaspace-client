import SpaceService from '@/services/space/SpaceService';
import { Space } from '@/utils/interfaces/Space';
import { create } from 'zustand';

interface SpaceState {
  spaces: Space[]
  getSpaces: () => Promise<void>
}

const spaceService = new SpaceService();

const spaceStore = create<SpaceState>((set) => ({
  spaces: [],
  getSpaces: async () => {
    try {
      const response = await spaceService.getSpaces();
      set({ spaces: response })
    } catch (error) {
      throw error;
    }
  }
}))

export default spaceStore;