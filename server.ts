import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Recommendation Engine
  app.post("/api/recommendations", (req, res) => {
    const { recipient, occasion, budget, preferences } = req.body;
    
    // Simulate thinking time
    setTimeout(() => {
      // Robust mock logic based on interests and occasion
      const interests = recipient.interests || [];
      const budgetMax = budget.max || 100;
      
      // Sample data generation based on interests
      const ideas = generateMockIdeas(recipient, occasion, budgetMax, preferences);
      
      res.json({ ideas });
    }, 1500);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

function generateMockIdeas(recipient: any, occasion: string, budgetMax: number, preferences: any) {
  // This is a simplified version of the logic described in the prompt
  // In a real app, this would be a more complex engine or an LLM call
  
  const allPossibleIdeas = [
    {
      id: "1",
      title: "Set per la cura della pelle Premium",
      summary: "Un set completo di prodotti naturali per una pelle radiosa.",
      reasoning: `Perfetto per ${recipient.name} perché ama il benessere e la cura di sé. Si adatta all'occasione ${occasion} come regalo rilassante.`,
      priceRange: "40€ - 60€",
      tags: ["elegante", "utile"],
      isTopPick: true,
      products: [
        { name: "Siero alla Vitamina C", price: "25€", merchant: "BioBeauty" },
        { name: "Crema Notte Idratante", price: "30€", merchant: "BioBeauty" }
      ]
    },
    {
      id: "2",
      title: "Esperienza di Degustazione Vini",
      summary: "Un tour guidato in una cantina locale con degustazione di 5 vini.",
      reasoning: "Un'idea originale per chi ama scoprire nuovi sapori e vivere esperienze indimenticabili.",
      priceRange: "80€ - 120€",
      tags: ["originale", "emotivo"],
      isTopPick: false,
      products: [
        { name: "Voucher Degustazione per 2", price: "90€", merchant: "Cantine Toscane" }
      ]
    },
    {
      id: "3",
      title: "Smartwatch di Ultima Generazione",
      summary: "Monitora salute, sport e notifiche con stile.",
      reasoning: "Ideale per una persona attiva che ama la tecnologia e vuole restare sempre connessa.",
      priceRange: "150€ - 250€",
      tags: ["pratico", "tecnologico"],
      isTopPick: false,
      products: [
        { name: "TechWatch Pro", price: "199€", merchant: "TechStore" }
      ]
    },
    {
      id: "4",
      title: "Libro d'Arte in Edizione Limitata",
      summary: "Una raccolta fotografica delle opere più belle del Rinascimento.",
      reasoning: "Un regalo colto e raffinato per chi apprezza la bellezza e la storia dell'arte.",
      priceRange: "35€ - 50€",
      tags: ["elegante", "culturale"],
      isTopPick: false,
      products: [
        { name: "Rinascimento: La Grande Bellezza", price: "45€", merchant: "Libreria Storica" }
      ]
    },
    {
      id: "5",
      title: "Kit per il Giardinaggio Urbano",
      summary: "Tutto il necessario per coltivare erbe aromatiche sul balcone.",
      reasoning: "Un pensiero dolce e sostenibile per chi vuole un tocco di verde in casa.",
      priceRange: "20€ - 35€",
      tags: ["utile", "sostenibile"],
      isTopPick: false,
      products: [
        { name: "Set Semi e Vasi Bio", price: "28€", merchant: "GreenLife" }
      ]
    }
  ];

  // Filter by budget (simplified)
  return allPossibleIdeas.filter(idea => {
    const minPrice = parseInt(idea.priceRange.split("€")[0]);
    return minPrice <= budgetMax;
  }).slice(0, 5);
}

startServer();
