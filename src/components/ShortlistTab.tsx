import React, { useState } from 'react';
import { University } from '../types';

interface ShortlistTabProps {
  universities: University[];
  bookmarkedIds: string[];
  onToggleBookmark: (univId: string) => void;
  onSelectUniversity: (univ: University) => void;
  onOpenCompareModal: () => void;
  comparedUniversities: University[];
  onToggleCompare: (univ: University) => void;
}

export const ShortlistTab: React.FC<ShortlistTabProps> = ({
  universities,
  bookmarkedIds,
  onToggleBookmark,
  onSelectUniversity,
  onOpenCompareModal,
  comparedUniversities,
  onToggleCompare,
}) => {
  const [filterStage, setFilterStage] = useState<'all' | 'researching' | 'drafting' | 'submitted'>('all');

  const bookmarkedUniversities = universities.filter((u) => bookmarkedIds.includes(u.id));

  const displayedUniversities = bookmarkedUniversities.filter((u) => {
    if (filterStage === 'all') return true;
    return (u.applicationStage || 'researching') === filterStage;
  });

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-2 max-w-xl mx-auto">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-surface-container-high flex items-center justify-center text-secondary shadow-xs">
            <span className="material-symbols-outlined text-[24px]">checklist</span>
          </div>
          <div>
            <h2 className="font-bold text-[16px] text-on-surface">Application Shortlist & Deadlines</h2>
            <p className="text-[12px] text-on-surface-variant">
              {bookmarkedUniversities.length} {bookmarkedUniversities.length === 1 ? 'program' : 'programs'} tracked
            </p>
          </div>
        </div>
        {bookmarkedUniversities.length >= 2 && (
          <button
            onClick={onOpenCompareModal}
            className="py-1.5 px-3 rounded-xl bg-secondary text-white text-[12px] font-bold flex items-center gap-1 shadow-xs hover:bg-secondary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
            <span>Compare</span>
          </button>
        )}
      </div>

      {/* Stage filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        {[
          { key: 'all', label: 'All Tracked' },
          { key: 'researching', label: 'Researching' },
          { key: 'drafting', label: 'Drafting Essays' },
          { key: 'submitted', label: 'Submitted' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStage(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-95 shrink-0 shadow-xs ${
              filterStage === tab.key
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Shortlist Items */}
      <div className="flex flex-col gap-3">
        {displayedUniversities.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-8 text-center flex flex-col items-center gap-3 border border-[#e2e8f0]">
            <span className="material-symbols-outlined text-[40px] text-outline">bookmark_border</span>
            <h3 className="font-bold text-[16px] text-on-surface">No Universities in this Stage</h3>
            <p className="text-[13px] text-on-surface-variant max-w-xs">
              Bookmark target institutions from the Matches discovery feed to monitor deadlines and admission requirements here.
            </p>
          </div>
        ) : (
          displayedUniversities.map((univ) => {
            const isCompared = comparedUniversities.some((u) => u.id === univ.id);

            return (
              <div
                key={univ.id}
                className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={univ.image}
                      alt={univ.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-[#e2e8f0]"
                    />
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-bold text-[15px] text-on-surface truncate">
                        {univ.name}
                      </h3>
                      <span className="text-[12px] text-secondary font-semibold truncate">
                        {univ.degreeMatch}
                      </span>
                      <span className="text-[11px] text-on-surface-variant mt-0.5">
                        {univ.location} • {univ.globalRank}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onToggleBookmark(univ.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-surface-container transition-colors"
                    title="Remove from shortlist"
                  >
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      bookmark
                    </span>
                  </button>
                </div>

                {/* Deadlines and Stage Bar */}
                <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[16px]">schedule</span>
                    <span className="text-on-surface-variant font-medium">Deadline:</span>
                    <span className="font-bold text-on-surface">{univ.deadlineDate}</span>
                  </div>
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-bold text-[11px] px-2 py-0.5 rounded-full">
                    {univ.applicationStage === 'drafting' ? 'Drafting Essays' : 'Researching'}
                  </span>
                </div>

                {/* Quick actions */}
                <div className="flex items-center justify-between pt-1 border-t border-[#e2e8f0]/60">
                  <label className="flex items-center gap-1.5 text-[12px] text-on-surface cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => onToggleCompare(univ)}
                      className="w-3.5 h-3.5 accent-secondary rounded"
                    />
                    <span className="font-medium">Compare</span>
                  </label>
                  <button
                    onClick={() => onSelectUniversity(univ)}
                    className="py-1.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-[12px] font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View Detail</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
