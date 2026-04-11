import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Heart, Trash2, ChevronRight, Gift } from "lucide-react";
import { shortlistService } from "../services/shortlistService";
import { GiftIdea } from "../types";

export default function Shortlist() {
  const navigate = useNavigate();
  const [items, setItems] = useState<GiftIdea[]>([]);

  useEffect(() => {
    setItems(shortlistService.getAll());
  }, []);

  const handleRemove = (id: string) => {
    shortlistService.remove(id);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fdfcfb] overflow-y-auto pb-12">
      <Header title="La tua Shortlist" />
      
      <div className="p-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Heart size={32} className="text-gray-200" />
            </div>
            <h2 className="text-xl font-serif font-bold mb-2">Ancora nulla qui</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-[240px]">
              Salva le idee che ti piacciono di più per confrontarle e scegliere con calma.
            </p>
            <Button variant="outline" onClick={() => navigate("/home")}>
              Inizia a cercare
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-gray-400 mb-2">
              Hai salvato {items.length} {items.length === 1 ? "idea" : "idee"}.
            </p>
            
            <AnimatePresence>
              {items.map((idea) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                >
                  <Card 
                    className="p-4 flex gap-4 relative"
                    onClick={() => navigate(`/idea/${idea.id}`, { state: { idea } })}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={`https://picsum.photos/seed/${idea.id}/200/200`} 
                        alt={idea.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 pr-8">
                      <h4 className="font-bold text-sm mb-1 truncate">{idea.title}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2">{idea.summary}</p>
                      <span className="text-xs font-bold">{idea.priceRange}</span>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(idea.id);
                      }}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div className="absolute bottom-4 right-4">
                      <ChevronRight size={18} className="text-gray-200" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
