import React from "react";
import { motion } from "motion/react";
import { Gift } from "lucide-react";

export default function Splash() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#1a1a1a] text-white p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 bg-[#d4af37] rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <Gift size={40} className="text-[#1a1a1a]" />
        </div>
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-2">RegaloPerfetto</h1>
        <p className="text-[#f5f2ed]/60 font-light tracking-widest uppercase text-xs">
          L'arte di sorprendere
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12"
      >
        <div className="w-6 h-6 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </motion.div>
    </div>
  );
}
