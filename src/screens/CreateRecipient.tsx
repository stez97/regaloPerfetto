import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { recipientService } from "../services/recipientService";
import { Relationship, AgeRange } from "../types";

const relationships: Relationship[] = [
  "Partner", "Amico / Amica", "Fratello / Sorella", "Mamma / Papà", "Collega", "Altro"
];

const ageRanges: AgeRange[] = [
  "18-24", "25-34", "35-44", "45-60", "60+"
];

const suggestedInterests = [
  "Tecnologia", "Cucina", "Viaggi", "Sport", "Musica", "Arte", "Lettura", 
  "Giardinaggio", "Moda", "Gaming", "Cinema", "Benessere", "Fai da te", "Fotografia"
];

export default function CreateRecipient() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<Relationship | "">("");
  const [ageRange, setAgeRange] = useState<AgeRange | "">("");
  const [interests, setInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else if (interests.length < 7) {
      setInterests([...interests, interest]);
    }
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim()) && interests.length < 7) {
      setInterests([...interests, customInterest.trim()]);
      setCustomInterest("");
    }
  };

  const handleSave = () => {
    if (name && relationship && ageRange && interests.length >= 3) {
      const newRecipient = recipientService.create({
        name,
        relationship: relationship as Relationship,
        ageRange: ageRange as AgeRange,
        interests
      });
      navigate(`/guided-session/${newRecipient.id}`);
    }
  };

  const isValid = name && relationship && ageRange && interests.length >= 3;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-12">
      <Header title="Nuovo Destinatario" />
      
      <div className="p-6 space-y-8">
        {/* Name */}
        <section>
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
            Come si chiama?
          </label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Esempio: Giulia"
            className="w-full text-2xl font-serif font-bold border-b-2 border-gray-100 focus:border-[#1a1a1a] outline-none py-2 transition-colors"
          />
        </section>

        {/* Relationship */}
        <section>
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
            Che rapporto avete?
          </label>
          <div className="flex flex-wrap gap-2">
            {relationships.map((r) => (
              <Chip 
                key={r} 
                label={r} 
                selected={relationship === r}
                onClick={() => setRelationship(r)}
              />
            ))}
          </div>
        </section>

        {/* Age Range */}
        <section>
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
            Quanti anni ha?
          </label>
          <div className="flex flex-wrap gap-2">
            {ageRanges.map((a) => (
              <Chip 
                key={a} 
                label={a} 
                selected={ageRange === a}
                onClick={() => setAgeRange(a)}
              />
            ))}
          </div>
        </section>

        {/* Interests */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-400 uppercase tracking-widest">
              Cosa le piace?
            </label>
            <span className="text-xs text-gray-400">{interests.length}/7</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Seleziona almeno 3 interessi per continuare.</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestedInterests.map((i) => (
              <Chip 
                key={i} 
                label={i} 
                selected={interests.includes(i)}
                onClick={() => toggleInterest(i)}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text"
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="Aggiungi altro..."
              className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-[#1a1a1a]"
              onKeyDown={(e) => e.key === "Enter" && addCustomInterest()}
            />
            <Button size="sm" variant="outline" onClick={addCustomInterest}>
              Aggiungi
            </Button>
          </div>
        </section>
      </div>

      <div className="p-6 mt-auto">
        <Button 
          fullWidth 
          size="lg" 
          disabled={!isValid}
          onClick={handleSave}
        >
          Continua
        </Button>
      </div>
    </div>
  );
}
