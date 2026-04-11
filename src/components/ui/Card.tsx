import React from "react";
import { motion } from "motion/react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick, hover = true }) => {
  return (
    <motion.div
      whileHover={hover && onClick ? { y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" } : {}}
      onClick={onClick}
      className={`bg-white rounded-[24px] border border-gray-100 overflow-hidden ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};
