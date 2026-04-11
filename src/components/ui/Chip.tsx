import React from "react";
import { motion } from "motion/react";

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, selected = false, onClick, className = "" }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
        selected 
          ? "bg-[#1a1a1a] text-white border-[#1a1a1a]" 
          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
      } ${className}`}
    >
      {label}
    </motion.button>
  );
};
