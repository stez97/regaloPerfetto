/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Relationship = 
  | "Partner" 
  | "Amico / Amica" 
  | "Fratello / Sorella" 
  | "Mamma / Papà" 
  | "Collega" 
  | "Altro";

export type AgeRange = 
  | "18-24" 
  | "25-34" 
  | "35-44" 
  | "45-60" 
  | "60+";

export type Occasion = 
  | "Compleanno" 
  | "Natale" 
  | "Anniversario" 
  | "San Valentino" 
  | "Festa della mamma" 
  | "Festa del papà" 
  | "Laurea" 
  | "Nascita";

export interface Recipient {
  id: string;
  name: string;
  relationship: Relationship;
  ageRange: AgeRange;
  interests: string[];
  createdAt: number;
}

export interface Product {
  name: string;
  price: string;
  merchant: string;
  url?: string;
}

export interface GiftIdea {
  id: string;
  title: string;
  summary: string;
  reasoning: string;
  priceRange: string;
  tags: string[];
  isTopPick: boolean;
  products: Product[];
}

export interface GuidedSession {
  recipientId: string;
  occasion: Occasion;
  budget: {
    min: number;
    max: number;
  };
  preferences: {
    praticoVsEmotivo?: "pratico" | "emotivo";
    esperienzaVsOggetto?: "esperienza" | "oggetto";
  };
}

export interface AppState {
  recipients: Recipient[];
  shortlist: GiftIdea[];
  recentSessions: GuidedSession[];
  onboardingCompleted: boolean;
}
