import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Heart, ChevronRight, Gift, Sparkles } from "lucide-react";
import { recommendationService } from "../services/recommendationService";
import { shortlistService } from "../services/shortlistService";
import { GiftIdea, Recipient, GuidedSession } from "../types";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipient, session } = location.state as { recipient: Recipient, session: GuidedSession } || {};
  
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<GiftIdea[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!recipient || !session) {
      navigate("/home");
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await recommendationService.getRecommendations(session, recipient);
        setIdeas(results);
        setSavedIds(shortlistService.getAll().map(i => i.id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [recipient, session, navigate]);

  const toggleSave = (e: React.MouseEvent, idea: GiftIdea) => {
    e.stopPropagation();
    if (savedIds.includes(idea.id)) {
      shortlistService.remove(idea.id);
      setSavedIds(savedIds.filter(id => id !== idea.id));
    } else {
      shortlistService.add(idea);
      setSavedIds([...savedIds, idea.id]);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-12 text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 bg-[#f5f2ed] rounded-3xl flex items-center justify-center mb-8"
        >
          <Sparkles size={40} className="text-[#d4af37]" />
        </motion.div>
        <h2 className="text-2xl font-serif font-bold mb-4">Analizziamo i gusti di {recipient?.name}...</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Stiamo cercando tra migliaia di opzioni per trovare le 5 idee più adatte alla tua occasione.
        </p>
      </div>
    );
  }

  const topPick = ideas.find(i => i.isTopPick) || ideas[0];
  const otherIdeas = ideas.filter(i => i.id !== topPick?.id);

  return (
    <div className="flex-1 flex flex-col bg-[#fdfcfb] overflow-y-auto pb-12">
      <Header title="Idee per te" />
      
      <div className="p-6 space-y-8">
        {/* Top Pick */}
        {topPick && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#d4af37]" />
              <span className="text-xs font-medium text-[#d4af37] uppercase tracking-widest">La nostra scelta</span>
            </div>
            <Card 
              className="relative overflow-hidden border-none shadow-xl"
              onClick={() => navigate(`/idea/${topPick.id}`, { state: { idea: topPick } })}
            >
              <div className="aspect-[4/5] relative">
                <img 
                  src={`https://picsum.photos/seed/${topPick.id}/800/1000`} 
                  alt={topPick.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <button 
                  onClick={(e) => toggleSave(e, topPick)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
                >
                  <Heart size={24} fill={savedIds.includes(topPick.id) ? "white" : "none"} />
                </button>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex gap-2 mb-3">
                    {topPick.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2">{topPick.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 mb-4">{topPick.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{topPick.priceRange}</span>
                    <div className="flex items-center gap-1 text-sm font-bold">
                      Dettagli <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Other Ideas */}
        <section>
          <h2 className="text-lg font-serif font-bold mb-4">Altre proposte</h2>
          <div className="space-y-4">
            {otherIdeas.map((idea) => (
              <Card 
                key={idea.id} 
                className="p-4 flex gap-4"
                onClick={() => navigate(`/idea/${idea.id}`, { state: { idea } })}
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${idea.id}/300/300`} 
                    alt={idea.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm leading-tight mb-1">{idea.title}</h4>
                      <button 
                        onClick={(e) => toggleSave(e, idea)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Heart size={18} fill={savedIds.includes(idea.id) ? "currentColor" : "none"} className={savedIds.includes(idea.id) ? "text-red-500" : ""} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{idea.summary}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">{idea.priceRange}</span>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6">
        <Button 
          variant="outline" 
          fullWidth 
          onClick={() => navigate("/create-recipient")}
        >
          Nuova ricerca
        </Button>
      </div>
    </div>
  );
}
