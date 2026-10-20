import React from 'react';

interface SyncBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyncBreakdownModal: React.FC<SyncBreakdownModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-[#e2e8f0]">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-on-surface">AI Match Synthesis Breakdown</h3>
              <p className="text-[12px] text-on-surface-variant">How Maya's fit scores are computed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 text-body-sm text-on-surface">
          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
                Academic Sync: 94%
              </span>
              <span className="text-[11px] font-semibold text-tertiary-container bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
                Very Strong
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Synthesized from Maya's <strong>3.92/4.0 GPA</strong>, <strong>IB Predicted 41/45</strong>, and top-tier performance in <strong>Math AA HL & Physics HL</strong>. Directly satisfies admission benchmarks at NUS, Imperial, and Toronto.
            </p>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Budget Sync: High
              </span>
              <span className="text-[11px] font-semibold text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full">
                Matches Guardrails
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              Target budget is <strong>$25,000 – $40,000 USD/yr</strong>. NUS with MOE Tuition Grant (~$13,400) and Georgia Tech out-of-state rate ($33,800) sit comfortably in range. Imperial and Toronto qualify through pre-vetted full-ride scholarships (Lester B. Pearson & President’s).
            </p>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[13px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary-container" />
                Regional & Urban Sync: 98%
              </span>
              <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-full">
                Optimal
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              100% of curated programs offer English instruction in tier-1 global tech clusters (Singapore, London, Toronto, Atlanta).
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-secondary text-white font-semibold text-[14px] hover:bg-secondary/90 transition-colors shadow-sm"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
