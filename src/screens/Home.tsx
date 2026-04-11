import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Plus, Heart, User, ChevronRight, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { recipientService } from "../services/recipientService";
import { shortlistService } from "../services/shortlistService";
import { Recipient, GiftIdea } from "../types";

export default function Home() {
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [shortlist, setShortlist] = useState<GiftIdea[]>([]);

  useEffect(() => {
    setRecipients(recipientService.getAll());
    setShortlist(shortlistService.getAll());
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#fdfcfb] overflow-y-auto pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center">
            <Gift size={20} className="text-[#d4af37]" />
          </div>
          <button 
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm"
          >
            <User size={20} />
          </button>
        </div>
        <h1 className="text-3xl font-serif font-bold leading-tight">
          Ciao, <br />
          <span className="text-gray-400">troviamo il regalo perfetto.</span>
        </h1>
      </header>

      {/* Main CTA */}
      <section className="px-6 mb-10">
        <Card className="p-6 bg-[#1a1a1a] text-white border-none relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-serif font-bold mb-2">Nuova Ricerca</h3>
            <p className="text-white/60 text-sm mb-6 max-w-[200px]">
              Inizia una sessione guidata per trovare idee uniche.
            </p>
            <Button 
              variant="secondary" 
              className="bg-[#d4af37] text-[#1a1a1a] border-none"
              onClick={() => navigate("/create-recipient")}
            >
              Trova un regalo
            </Button>
          </div>
          <Gift 
            size={120} 
            className="absolute -right-4 -bottom-4 text-white/5 rotate-12" 
          />
        </Card>
      </section>

      {/* Recent Recipients */}
      <section className="px-6 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-serif font-bold">Destinatari recenti</h2>
          {recipients.length > 0 && (
            <button className="text-sm text-gray-400 flex items-center gap-1">
              Vedi tutti <ChevronRight size={14} />
            </button>
          )}
        </div>
        
        {recipients.length === 0 ? (
          <Card className="p-8 flex flex-col items-center justify-center border-dashed border-2 bg-transparent">
            <User size={32} className="text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm text-center">
              Non hai ancora aggiunto nessun destinatario.
            </p>
          </Card>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            {recipients.map((r) => (
              <motion.div 
                key={r.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/guided-session/${r.id}`)}
                className="flex-shrink-0 w-32 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#f5f2ed] flex items-center justify-center mb-2 border border-gray-100 shadow-sm">
                  <span className="text-2xl font-serif font-bold text-[#1a1a1a]">
                    {r.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-center truncate w-full">{r.name}</span>
                <span className="text-xs text-gray-400">{r.relationship}</span>
              </motion.div>
            ))}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create-recipient")}
              className="flex-shrink-0 w-32 flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-2">
                <Plus size={24} className="text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-400">Aggiungi</span>
            </motion.button>
          </div>
        )}
      </section>

      {/* Shortlist Preview */}
      <section className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-serif font-bold">La tua Shortlist</h2>
          <button 
            onClick={() => navigate("/shortlist")}
            className="text-sm text-gray-400 flex items-center gap-1"
          >
            Vedi tutti <ChevronRight size={14} />
          </button>
        </div>

        {shortlist.length === 0 ? (
          <Card className="p-8 flex flex-col items-center justify-center border-dashed border-2 bg-transparent">
            <Heart size={32} className="text-gray-300 mb-3" />
            <p className="text-gray-400 text-sm text-center">
              Salva le tue idee preferite per vederle qui.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {shortlist.slice(0, 2).map((idea) => (
              <Card 
                key={idea.id} 
                className="p-4 flex gap-4 items-center"
                onClick={() => navigate(`/idea/${idea.id}`)}
              >
                <div className="w-16 h-16 bg-[#f5f2ed] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Gift size={24} className="text-[#1a1a1a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{idea.title}</h4>
                  <p className="text-xs text-gray-400">{idea.priceRange}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Nav Placeholder */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-gray-100 px-8 py-4 flex justify-between items-center z-50">
        <button onClick={() => navigate("/home")} className="text-[#1a1a1a]">
          <HomeIcon size={24} />
        </button>
        <button onClick={() => navigate("/shortlist")} className="text-gray-300 hover:text-[#1a1a1a]">
          <Heart size={24} />
        </button>
        <button onClick={() => navigate("/settings")} className="text-gray-300 hover:text-[#1a1a1a]">
          <User size={24} />
        </button>
      </nav>
    </div>
  );
}

function HomeIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
