import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/Button";
import { storage } from "../services/storageService";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Trova regali che contano",
    description: "Dimentica i regali banali. Scopri idee pensate appositamente per chi ami.",
    image: "https://picsum.photos/seed/gift1/800/1200"
  },
  {
    title: "Lasciati guidare",
    description: "Poche domande mirate per capire i gusti e le passioni del destinatario.",
    image: "https://picsum.photos/seed/gift2/800/1200"
  },
  {
    title: "Scegli con fiducia",
    description: "Salva le migliori idee e trova il prodotto perfetto in pochi click.",
    image: "https://picsum.photos/seed/gift3/800/1200"
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      storage.set("onboarding_completed", true);
      onComplete();
      navigate("/home");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-32 left-0 right-0 p-8 text-white">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-serif font-bold mb-4"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-white/80 font-light leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 bg-white safe-area-bottom">
        <div className="flex gap-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-[#1a1a1a]" : "w-2 bg-gray-200"
              }`} 
            />
          ))}
        </div>
        
        <Button fullWidth size="lg" onClick={handleNext}>
          {currentSlide === slides.length - 1 ? "Inizia ora" : "Continua"}
        </Button>
      </div>
    </div>
  );
}
