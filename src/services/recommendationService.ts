import { GiftIdea, GuidedSession, Recipient } from "../types";

const ALL_IDEAS: GiftIdea[] = [
  {
    id: "1",
    title: "Set benessere premium",
    summary: "Una selezione elegante per prendersi cura di sé ogni giorno.",
    reasoning: "",
    priceRange: "40€ - 60€",
    tags: ["elegante", "utile"],
    isTopPick: true,
    products: [
      { name: "Siero vitamina C", price: "25€", merchant: "BioBeauty" },
      { name: "Crema notte idratante", price: "30€", merchant: "BioBeauty" },
    ],
  },
  {
    id: "2",
    title: "Degustazione vini per due",
    summary: "Un'esperienza da vivere insieme in una cantina locale.",
    reasoning: "",
    priceRange: "80€ - 120€",
    tags: ["esperienza", "emotivo"],
    isTopPick: false,
    products: [{ name: "Voucher degustazione", price: "90€", merchant: "Cantine Toscane" }],
  },
  {
    id: "3",
    title: "Smartwatch sportivo",
    summary: "Tecnologia utile per allenamento, salute e notifiche quotidiane.",
    reasoning: "",
    priceRange: "150€ - 250€",
    tags: ["tecnologico", "pratico"],
    isTopPick: false,
    products: [{ name: "TechWatch Pro", price: "199€", merchant: "TechStore" }],
  },
  {
    id: "4",
    title: "Libro d'arte da collezione",
    summary: "Un volume raffinato per chi ama estetica, storia e ispirazione.",
    reasoning: "",
    priceRange: "35€ - 50€",
    tags: ["culturale", "raffinato"],
    isTopPick: false,
    products: [{ name: "Rinascimento illustrato", price: "45€", merchant: "Libreria Storica" }],
  },
  {
    id: "5",
    title: "Kit giardinaggio urbano",
    summary: "Una soluzione semplice e curata per portare il verde in casa.",
    reasoning: "",
    priceRange: "20€ - 35€",
    tags: ["sostenibile", "utile"],
    isTopPick: false,
    products: [{ name: "Set semi e vasi", price: "28€", merchant: "GreenLife" }],
  },
];

function parseMinPrice(priceRange: string): number {
  const [minPrice] = priceRange.split("€");
  return Number.parseInt(minPrice, 10);
}

function buildReasoning(idea: GiftIdea, recipient: Recipient, session: GuidedSession): string {
  const preferenceTone =
    session.preferences.praticoVsEmotivo === "emotivo"
      ? "con un forte valore affettivo"
      : "utile anche nella vita di tutti i giorni";

  const formatTone =
    session.preferences.esperienzaVsOggetto === "esperienza"
      ? "puntando su un momento da vivere"
      : "restando su qualcosa di concreto da scartare";

  return `Pensato per ${recipient.name}: combina ${recipient.interests
    .slice(0, 2)
    .join(" e ")} con l'occasione ${session.occasion}, ${preferenceTone} e ${formatTone}. "${idea.title}" resta coerente con il budget selezionato.`;
}

export const recommendationService = {
  async getRecommendations(
    session: GuidedSession,
    recipient: Recipient,
  ): Promise<GiftIdea[]> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return ALL_IDEAS
      .filter((idea) => parseMinPrice(idea.priceRange) <= session.budget.max)
      .slice(0, 5)
      .map((idea, index) => ({
        ...idea,
        isTopPick: index === 0,
        reasoning: buildReasoning(idea, recipient, session),
      }));
  },
};
