import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { recipientService } from "../services/recipientService";
import { Occasion, Recipient } from "../types";

const occasions: Occasion[] = [
  "Compleanno", "Natale", "Anniversario", "San Valentino", 
  "Festa della mamma", "Festa del papà", "Laurea", "Nascita"
];

export default function GuidedSession() {
  const { recipientId } = useParams();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [step, setStep] = useState(1);
  
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [budget, setBudget] = useState({ min: 20, max: 100 });
  const [praticoVsEmotivo, setPraticoVsEmotivo] = useState<"pratico" | "emotivo" | null>(null);
  const [esperienzaVsOggetto, setEsperienzaVsOggetto] = useState<"esperienza" | "oggetto" | null>(null);

  useEffect(() => {
    if (recipientId) {
      const r = recipientService.getById(recipientId);
      if (r) setRecipient(r);
      else navigate("/home");
    }
  }, [recipientId, navigate]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Navigate to results with state
      navigate("/results", { 
        state: { 
          recipient, 
          session: { 
            recipientId, 
            occasion, 
            budget, 
            preferences: { praticoVsEmotivo, esperienzaVsOggetto } 
          } 
        } 
      });
    }
  };

  if (!recipient) return null;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <Header title={`Per ${recipient.name}`} />
      
      {/* Progress Bar */}
      <div className="px-6 py-2">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-[#1a1a1a]"
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 space-y-8 absolute inset-0 overflow-y-auto"
            >
              <section>
                <h2 className="text-2xl font-serif font-bold mb-2">Qual è l'occasione?</h2>
                <p className="text-gray-400 text-sm mb-6">Ci aiuta a dare il giusto tono al regalo.</p>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((o) => (
                    <Chip 
                      key={o} 
                      label={o} 
                      selected={occasion === o}
                      onClick={() => setOccasion(o)}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 space-y-8 absolute inset-0 overflow-y-auto"
            >
              <section>
                <h2 className="text-2xl font-serif font-bold mb-2">Qual è il tuo budget?</h2>
                <p className="text-gray-400 text-sm mb-8">Definisci una fascia di prezzo indicativa.</p>
                
                <div className="space-y-12 pt-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-xs text-gray-400 uppercase tracking-widest">Minimo</span>
                      <div className="text-3xl font-serif font-bold">{budget.min}€</div>
                    </div>
                    <div className="w-12 h-[2px] bg-gray-100 mb-4" />
                    <div className="space-y-1 text-right">
                      <span className="text-xs text-gray-400 uppercase tracking-widest">Massimo</span>
                      <div className="text-3xl font-serif font-bold">{budget.max}€</div>
                    </div>
                  </div>
                  
                  <input 
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={budget.max}
                    onChange={(e) => setBudget({ ...budget, max: parseInt(e.target.value) })}
                    className="w-full accent-[#1a1a1a]"
                  />
                </div>
              </section>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 space-y-10 absolute inset-0 overflow-y-auto"
            >
              <section>
                <h2 className="text-2xl font-serif font-bold mb-2">Ultime preferenze</h2>
                <p className="text-gray-400 text-sm mb-8">Queste domande ci aiutano a raffinare le idee.</p>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                      Tipo di regalo
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setPraticoVsEmotivo("pratico")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          praticoVsEmotivo === "pratico" ? "border-[#1a1a1a] bg-gray-50" : "border-gray-100"
                        }`}
                      >
                        <div className="font-bold mb-1">Pratico</div>
                        <div className="text-xs text-gray-400">Qualcosa di utile nel quotidiano</div>
                      </button>
                      <button 
                        onClick={() => setPraticoVsEmotivo("emotivo")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          praticoVsEmotivo === "emotivo" ? "border-[#1a1a1a] bg-gray-50" : "border-gray-100"
                        }`}
                      >
                        <div className="font-bold mb-1">Emotivo</div>
                        <div className="text-xs text-gray-400">Qualcosa che tocchi il cuore</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                      Formato
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setEsperienzaVsOggetto("oggetto")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          esperienzaVsOggetto === "oggetto" ? "border-[#1a1a1a] bg-gray-50" : "border-gray-100"
                        }`}
                      >
                        <div className="font-bold mb-1">Oggetto</div>
                        <div className="text-xs text-gray-400">Un prodotto fisico da scartare</div>
                      </button>
                      <button 
                        onClick={() => setEsperienzaVsOggetto("esperienza")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          esperienzaVsOggetto === "esperienza" ? "border-[#1a1a1a] bg-gray-50" : "border-gray-100"
                        }`}
                      >
                        <div className="font-bold mb-1">Esperienza</div>
                        <div className="text-xs text-gray-400">Un momento da vivere</div>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-white border-t border-gray-50">
        <Button 
          fullWidth 
          size="lg" 
          onClick={handleNext}
          disabled={(step === 1 && !occasion) || (step === 3 && (!praticoVsEmotivo || !esperienzaVsOggetto))}
        >
          {step === 3 ? "Genera idee" : "Continua"}
        </Button>
      </div>
    </div>
  );
}
