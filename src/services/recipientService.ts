import { Recipient } from "../types";
import { storage } from "./storageService";

const RECIPIENTS_KEY = "recipients";

export const recipientService = {
  getAll: (): Recipient[] => {
    return storage.get<Recipient[]>(RECIPIENTS_KEY) || [];
  },
  
  getById: (id: string): Recipient | undefined => {
    return recipientService.getAll().find(r => r.id === id);
  },
  
  create: (recipient: Omit<Recipient, "id" | "createdAt">): Recipient => {
    const newRecipient: Recipient = {
      ...recipient,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now()
    };
    
    const recipients = recipientService.getAll();
    storage.set(RECIPIENTS_KEY, [newRecipient, ...recipients]);
    return newRecipient;
  },
  
  delete: (id: string): void => {
    const recipients = recipientService.getAll().filter(r => r.id !== id);
    storage.set(RECIPIENTS_KEY, recipients);
  }
};
