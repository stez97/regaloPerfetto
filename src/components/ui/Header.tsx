import React from "react";
import { ChevronLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = true, showSettings = false, onBack }) => {
  const navigate = useNavigate();
  
  return (
    <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {showBack && (
          <button 
            onClick={onBack || (() => navigate(-1))}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {title && <h1 className="text-xl font-serif font-bold">{title}</h1>}
      </div>
      
      {showSettings && (
        <button 
          onClick={() => navigate("/settings")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <Settings size={20} />
        </button>
      )}
    </header>
  );
};
