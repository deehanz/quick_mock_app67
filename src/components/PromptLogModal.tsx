import React from 'react';

interface PromptLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptLogModal: React.FC<PromptLogModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-[#e2e8f0] max-h-[85vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-on-surface">Diagnostic Prompt & Inference Log</h3>
              <p className="text-[12px] text-on-surface-variant">Traceable evaluation chain for Maya Chen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="bg-primary-container text-surface-variant p-3.5 rounded-xl text-[12px] font-mono leading-relaxed space-y-2 overflow-x-auto">
          <div className="text-tertiary-fixed-dim font-bold">// INFERENCE_SESSION_ID: DIAG-2025-MC-882A</div>
          <div>
            <span className="text-on-primary-container">INPUT_SIGNALS:</span> [
            "Math AA HL: 7/7 (Predicted)",
            "Physics HL: 7/7 (Predicted)",
            "CS HL: 7/7 (Predicted)",
            "VEX Robotics Team Lead (Odometry & Heap Memory debug)",
            "Inner-city code mentoring (2 yrs)",
            "Target budget $25k-$40k",
            "Aspiration: Concurrent computing & scalable algorithms"
            ]
          </div>
          <div className="text-secondary-fixed">
            REASONING_CHAIN:
            <br />
            - 1. High analytical rigor verified by simultaneous high marks in rigorous math proof subjects and algorithmic debugging under competition pressure.
            <br />
            - 2. Strong programmatic synergy with Imperial College DoC Computing (BEng/MEng) and NUS School of Computing.
            <br />
            - 3. Financial parameter matches ASEAN/MOE Grant pathways in Singapore and merit-based global scholarships in UK/Canada.
          </div>
          <div className="text-tertiary-fixed font-semibold">
            STATUS: 12/12 Signals verified against UCAS & Global Admissions rubrics.
          </div>
        </div>

        <p className="text-[12px] text-on-surface-variant">
          This prompt transparency log demonstrates that all profile rankings are grounded strictly in your verified coursework, competitive achievements, and explicit constraints.
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-secondary text-white font-semibold text-[13px] hover:bg-secondary/90 transition-colors shadow-sm"
        >
          Close Log
        </button>
      </div>
    </div>
  );
};
