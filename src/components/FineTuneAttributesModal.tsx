import React, { useState } from 'react';
import { Trait } from '../types';

interface FineTuneAttributesModalProps {
  isOpen: boolean;
  onClose: () => void;
  traits: Trait[];
  onSaveTraits: (updatedTraits: Trait[]) => void;
}

export const FineTuneAttributesModal: React.FC<FineTuneAttributesModalProps> = ({
  isOpen,
  onClose,
  traits,
  onSaveTraits,
}) => {
  const [localTraits, setLocalTraits] = useState<Trait[]>(traits);

  if (!isOpen) return null;

  const handleSliderChange = (id: string, newScore: number) => {
    setLocalTraits((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          let label = `${newScore}% • Moderate`;
          if (newScore >= 90) label = `${newScore}% • Very High`;
          else if (newScore >= 80) label = `${newScore}% • High`;
          else if (newScore >= 70) label = `${newScore}% • Mod-High`;
          return {
            ...t,
            score: newScore,
            scoreLabel: label,
          };
        }
        return t;
      })
    );
  };

  const handleSave = () => {
    onSaveTraits(localTraits);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-[#e2e8f0] max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-on-surface">Fine-Tune Cognitive Profile</h3>
              <p className="text-[12px] text-on-surface-variant">Adjust weights to re-align institution fit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {localTraits.map((trait) => (
            <div key={trait.id} className="bg-surface-container-low p-3.5 rounded-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">{trait.icon}</span>
                  <span className="font-semibold text-[13px] text-on-surface">{trait.name}</span>
                </div>
                <span className="font-bold text-[12px] text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full">
                  {trait.score}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={trait.score}
                onChange={(e) => handleSliderChange(trait.id, parseInt(e.target.value, 10))}
                className="w-full accent-secondary cursor-pointer h-1.5 bg-surface-container-highest rounded-lg"
              />
              <p className="text-[11px] text-on-surface-variant line-clamp-1">{trait.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => setLocalTraits(traits)}
            className="py-2.5 px-4 rounded-xl border border-[#e2e8f0] text-on-surface-variant font-semibold text-[13px] hover:bg-surface-container"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-secondary text-white font-semibold text-[13px] hover:bg-secondary/90 transition-colors shadow-sm"
          >
            Save & Recalculate Trajectories
          </button>
        </div>
      </div>
    </div>
  );
};
