import { Recipient } from "../types";
import { storage } from "./storageService";

const RECIPIENTS_KEY = "recipients";

export const recipientService = {
  async getAll(): Promise<Recipient[]> {
    return (await storage.get<Recipient[]>(RECIPIENTS_KEY)) ?? [];
  },

  async getById(id: string): Promise<Recipient | undefined> {
    const recipients = await recipientService.getAll();
    return recipients.find((recipient) => recipient.id === id);
  },

  async create(recipient: Omit<Recipient, "id" | "createdAt">): Promise<Recipient> {
    const newRecipient: Recipient = {
      ...recipient,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
    };

    const recipients = await recipientService.getAll();
    await storage.set(RECIPIENTS_KEY, [newRecipient, ...recipients]);
    return newRecipient;
  },

  async delete(id: string): Promise<void> {
    const recipients = await recipientService.getAll();
    await storage.set(
      RECIPIENTS_KEY,
      recipients.filter((recipient) => recipient.id !== id),
    );
  },
};
