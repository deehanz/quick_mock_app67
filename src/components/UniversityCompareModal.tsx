import React from 'react';
import { University } from '../types';

interface UniversityCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  universities: University[];
  onSelectUniversity: (univ: University) => void;
}

export const UniversityCompareModal: React.FC<UniversityCompareModalProps> = ({
  isOpen,
  onClose,
  universities,
  onSelectUniversity,
}) => {
  if (!isOpen || universities.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 border border-[#e2e8f0] max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
            </div>
            <div>
              <h3 className="font-bold text-[17px] text-on-surface">Institutional Comparison Matrix</h3>
              <p className="text-[12px] text-on-surface-variant">Side-by-side evaluation against Maya's profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable table container */}
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh] no-scrollbar">
          <div className="min-w-[520px] flex flex-col gap-3">
            {/* University Cards Header Row */}
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `140px repeat(${universities.length}, minmax(0, 1fr))`,
              }}
            >
              <div className="text-[12px] font-bold text-on-surface-variant uppercase tracking-wider self-end pb-2">
                Institution
              </div>
              {universities.map((univ) => (
                <div
                  key={univ.id}
                  className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2 relative border border-[#e2e8f0]"
                >
                  <img
                    src={univ.image}
                    alt={univ.name}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-[14px] text-on-surface leading-tight line-clamp-2">
                      {univ.name}
                    </span>
                    <span className="text-[11px] text-secondary font-semibold mt-0.5">
                      {univ.globalRank}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[12px] font-bold text-tertiary-fixed-dim bg-on-tertiary-fixed px-2 py-0.5 rounded-full">
                      {univ.syncScore}% Sync
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectUniversity(univ);
                      }}
                      className="text-[11px] font-semibold text-secondary hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Matrix comparison rows */}
            {[
              {
                label: 'Degree Match',
                getter: (u: University) => u.degreeMatch,
              },
              {
                label: 'Est. Net Tuition',
                getter: (u: University) => `${u.netTuition} ${u.tuitionUnit}`,
              },
              {
                label: 'Pre-qualified Aid',
                getter: (u: University) =>
                  u.scholarshipNotice ||
                  (u.prequalifiedScholarships.length > 0
                    ? u.prequalifiedScholarships[0].title
                    : 'N/A'),
              },
              {
                label: 'Academic Benchmarks',
                getter: (u: University) => u.academicBenchmarks,
              },
              {
                label: 'Application Window',
                getter: (u: University) => u.applicationWindow,
              },
              {
                label: 'Fit Intelligence Highlight',
                getter: (u: University) => u.fitIntelligence[0] || 'High alignment',
              },
              {
                label: 'Key Strategic Trade-off',
                getter: (u: University) => u.tradeoffs[0] || 'Standard competition pool',
              },
            ].map((row, idx) => (
              <div
                key={idx}
                className="grid gap-3 py-2.5 border-b border-[#e2e8f0] text-[12px]"
                style={{
                  gridTemplateColumns: `140px repeat(${universities.length}, minmax(0, 1fr))`,
                }}
              >
                <span className="font-bold text-on-surface-variant flex items-center">
                  {row.label}
                </span>
                {universities.map((univ) => (
                  <div
                    key={univ.id}
                    className="text-on-surface leading-snug bg-surface-container-lowest/60 p-2 rounded-lg"
                  >
                    {row.getter(univ)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-secondary text-white font-semibold text-[13px] hover:bg-secondary/90 transition-colors shadow-sm"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
