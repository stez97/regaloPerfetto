import { GiftIdea, GuidedSession, Recipient } from "../types";

export const recommendationService = {
  getRecommendations: async (session: GuidedSession, recipient: Recipient): Promise<GiftIdea[]> => {
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recipient,
          occasion: session.occasion,
          budget: session.budget,
          preferences: session.preferences
        })
      });
      
      if (!response.ok) throw new Error("Errore nel recupero dei consigli");
      
      const data = await response.json();
      return data.ideas;
    } catch (error) {
      console.error("Recommendation error:", error);
      throw error;
    }
  }
};
