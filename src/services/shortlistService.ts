import { GiftIdea } from "../types";
import { storage } from "./storageService";

const SHORTLIST_KEY = "shortlist";

export const shortlistService = {
  getAll: (): GiftIdea[] => {
    return storage.get<GiftIdea[]>(SHORTLIST_KEY) || [];
  },
  
  add: (idea: GiftIdea): void => {
    const shortlist = shortlistService.getAll();
    if (!shortlist.find(i => i.id === idea.id)) {
      storage.set(SHORTLIST_KEY, [idea, ...shortlist]);
    }
  },
  
  remove: (id: string): void => {
    const shortlist = shortlistService.getAll().filter(i => i.id !== id);
    storage.set(SHORTLIST_KEY, shortlist);
  },
  
  isSaved: (id: string): boolean => {
    return !!shortlistService.getAll().find(i => i.id === id);
  }
};
