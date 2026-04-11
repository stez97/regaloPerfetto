import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Heart, ShoppingBag, Info, CheckCircle2, ExternalLink } from "lucide-react";
import { shortlistService } from "../services/shortlistService";
import { GiftIdea } from "../types";

export default function IdeaDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [idea, setIdea] = useState<GiftIdea | null>(location.state?.idea || null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!idea && id) {
      // In a real app, fetch by ID. Here we'll just redirect if missing
      navigate("/home");
    }
    if (idea) {
      setIsSaved(shortlistService.isSaved(idea.id));
    }
  }, [idea, id, navigate]);

  const toggleSave = () => {
    if (!idea) return;
    if (isSaved) {
      shortlistService.remove(idea.id);
      setIsSaved(false);
    } else {
      shortlistService.add(idea);
      setIsSaved(true);
    }
  };

  if (!idea) return null;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-24">
      <div className="relative h-[40vh]">
        <img 
          src={`https://picsum.photos/seed/${idea.id}/1200/800`} 
          alt={idea.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
        <div className="absolute top-0 left-0 right-0">
          <Header showBack={true} onBack={() => navigate(-1)} />
        </div>
        
        <button 
          onClick={toggleSave}
          className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-[#1a1a1a] z-10"
        >
          <Heart size={28} fill={isSaved ? "#ef4444" : "none"} className={isSaved ? "text-red-500 border-none" : ""} />
        </button>
      </div>

      <div className="px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
          <div className="flex gap-2 mb-4">
            {idea.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-[#f5f2ed] text-[#1a1a1a] text-[10px] uppercase tracking-widest font-bold">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl font-serif font-bold mb-4 leading-tight">{idea.title}</h1>
          <p className="text-gray-500 leading-relaxed mb-8">{idea.summary}</p>
          
          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Info size={18} className="text-[#d4af37]" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Perché questo regalo?</h3>
              </div>
              <div className="bg-[#fdfcfb] p-6 rounded-2xl border border-gray-50 italic text-gray-600 leading-relaxed">
                "{idea.reasoning}"
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag size={18} className="text-[#d4af37]" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Prodotti consigliati</h3>
              </div>
              
              <div className="space-y-4">
                {idea.products.map((product, idx) => (
                  <Card key={idx} className="p-4 flex justify-between items-center border-gray-100">
                    <div>
                      <h4 className="font-bold text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-400">{product.merchant}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm mb-1">{product.price}</div>
                      <button className="text-[#d4af37] flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter">
                        Compra <ExternalLink size={10} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section className="pt-4">
              <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 p-4 rounded-2xl">
                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                <p>Questa idea rispetta il tuo budget di <strong>{idea.priceRange}</strong>.</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-lg border-t border-gray-50 z-50">
        <Button fullWidth size="lg">
          Scegli questo regalo
        </Button>
      </div>
    </div>
  );
}
