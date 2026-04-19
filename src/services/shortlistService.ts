import { GiftIdea } from "../types";
import { storage } from "./storageService";

const SHORTLIST_KEY = "shortlist";

export const shortlistService = {
  async getAll(): Promise<GiftIdea[]> {
    return (await storage.get<GiftIdea[]>(SHORTLIST_KEY)) ?? [];
  },

  async add(idea: GiftIdea): Promise<void> {
    const shortlist = await shortlistService.getAll();

    if (!shortlist.some((item) => item.id === idea.id)) {
      await storage.set(SHORTLIST_KEY, [idea, ...shortlist]);
    }
  },

  async remove(id: string): Promise<void> {
    const shortlist = await shortlistService.getAll();
    await storage.set(
      SHORTLIST_KEY,
      shortlist.filter((item) => item.id !== id),
    );
  },

  async isSaved(id: string): Promise<boolean> {
    const shortlist = await shortlistService.getAll();
    return shortlist.some((item) => item.id === id);
  },
};
