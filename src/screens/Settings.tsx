import React from "react";
import { Header } from "../components/ui/Header";
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Info } from "lucide-react";
import { storage } from "../services/storageService";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm("Sei sicuro di voler resettare tutti i dati?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const menuItems = [
    { icon: User, label: "Profilo", detail: "Gestisci i tuoi dati" },
    { icon: Bell, label: "Notifiche", detail: "Promemoria compleanni" },
    { icon: Shield, label: "Privacy", detail: "Sicurezza e dati" },
    { icon: HelpCircle, label: "Supporto", detail: "Domande frequenti" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#fdfcfb] overflow-y-auto">
      <Header title="Impostazioni" />
      
      <div className="p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-gray-50 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#f5f2ed] flex items-center justify-center border border-gray-100">
            <User size={32} className="text-[#1a1a1a]" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg">Utente Demo</h3>
            <p className="text-xs text-gray-400">stefano.pandini97@gmail.com</p>
          </div>
        </div>

        {/* Menu */}
        <section className="space-y-2">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <item.icon size={20} className="text-gray-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold">{item.label}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{item.detail}</div>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-200" />
            </button>
          ))}
        </section>

        {/* App Info */}
        <section className="p-6 bg-[#f5f2ed] rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-[#1a1a1a]">
            <Info size={18} />
            <h4 className="text-sm font-bold uppercase tracking-widest">Info Prototipo</h4>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Questo è un prototipo funzionale di <strong>RegaloPerfetto</strong>. I dati sono salvati localmente nel tuo browser.
          </p>
          <div className="flex justify-between text-[10px] text-gray-400 font-medium pt-2">
            <span>Versione 1.0.0 (Beta)</span>
            <span>Build 2026.04.11</span>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-4">
          <button 
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold text-sm border border-red-100 rounded-2xl hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Resetta tutti i dati
          </button>
        </section>
      </div>
    </div>
  );
}
