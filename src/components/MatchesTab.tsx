import React, { useState, useMemo } from 'react';
import { University } from '../types';

interface MatchesTabProps {
  universities: University[];
  onSelectUniversity: (univ: University) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (univId: string) => void;
  comparedUniversities: University[];
  onToggleCompare: (univ: University) => void;
  onOpenCompareModal: () => void;
  onOpenBreakdownModal: () => void;
}

export const MatchesTab: React.FC<MatchesTabProps> = ({
  universities,
  onSelectUniversity,
  bookmarkedIds,
  onToggleBookmark,
  comparedUniversities,
  onToggleCompare,
  onOpenCompareModal,
  onOpenBreakdownModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'strong' | 'target' | 'reach' | 'scholarship' | 'budget'>('all');

  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      // Search filter
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.degreeMatch.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter
      if (activeFilter === 'strong') return u.syncScore >= 90;
      if (activeFilter === 'target') return u.matchType === 'good';
      if (activeFilter === 'reach') return u.matchType === 'reach';
      if (activeFilter === 'scholarship')
        return (
          u.scholarshipNotice?.toLowerCase().includes('scholarship') ||
          u.scholarshipNotice?.toLowerCase().includes('grant')
        );
      if (activeFilter === 'budget') {
        const tuitionNum = parseInt(u.netTuition.replace(/[^0-9]/g, ''), 10) || 0;
        return tuitionNum <= 25000;
      }
      return true;
    });
  }, [universities, searchQuery, activeFilter]);

  const compareCount = comparedUniversities.length;

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Search & Instant Filter Bar */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-2.5">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-12 pl-11 pr-11 bg-surface-container-lowest text-on-surface rounded-full text-[14px] placeholder-outline shadow-xs border border-[#e2e8f0]/80 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
            placeholder="Search institutions, majors, or cities..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-11 text-outline hover:text-on-surface p-1"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          ) : null}
          <button
            aria-label="AI Search Filter"
            onClick={() => setActiveFilter('strong')}
            className="absolute right-2.5 w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary hover:bg-secondary-fixed-dim transition-colors"
            title="Show Strong Matches"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          </button>
        </div>

        {/* Filter Pills (Horizontal scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 shadow-xs transition-all flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <span>All Fits</span>
            <span
              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                activeFilter === 'all' ? 'bg-white/20' : 'bg-surface-container-highest'
              }`}
            >
              {universities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('strong')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-all flex items-center gap-1 shadow-xs ${
              activeFilter === 'strong'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <span
              className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span>Strong Match (90%+)</span>
          </button>

          <button
            onClick={() => setActiveFilter('target')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-all shadow-xs ${
              activeFilter === 'target'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Target
          </button>

          <button
            onClick={() => setActiveFilter('reach')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-all shadow-xs ${
              activeFilter === 'reach'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Reach / Ambitious
          </button>

          <button
            onClick={() => setActiveFilter('scholarship')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-all shadow-xs ${
              activeFilter === 'scholarship'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Full Scholarship
          </button>

          <button
            onClick={() => setActiveFilter('budget')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold shrink-0 transition-all shadow-xs ${
              activeFilter === 'budget'
                ? 'bg-primary text-white'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Under $25k/yr
          </button>
        </div>
      </div>

      {/* AI Personalized Context Banner */}
      <div className="px-4 my-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container via-surface-container-highest to-surface-container-high p-4 shadow-sm text-on-surface border border-[#e2e8f0]/80">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0 shadow-xs text-white">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-[16px] text-on-surface">Hi Maya</span>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                  CS & AI Focus
                </span>
              </div>
              <p className="text-[13px] text-on-surface-variant leading-relaxed">
                Based on your high <span className="font-semibold text-on-surface">Analytical Thinking</span> and top-percentile <span className="font-semibold text-on-surface">Math indicators</span>, we curated top-fit universities across UK, US, and Singapore.
              </p>
            </div>
          </div>

          {/* Quick AI Diagnostic metrics */}
          <div className="mt-3 pt-2.5 flex items-center justify-between gap-2 bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
              <span className="text-[12px] text-on-surface font-semibold">Academic Sync: 94%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-[12px] text-on-surface font-semibold">Budget Sync: High</span>
            </div>
            <button
              onClick={onOpenBreakdownModal}
              className="text-[11px] text-secondary font-bold flex items-center hover:opacity-80 transition-opacity active:scale-95"
            >
              Breakdown
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section Header */}
      <div className="px-4 mt-2 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[16px] text-on-surface">Curated Recommendations</span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
            {filteredUniversities.length} Found
          </span>
        </div>
        <div className="flex items-center gap-1 text-on-surface-variant text-[12px] font-semibold">
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Ranked by Fit</span>
        </div>
      </div>

      {/* Recommendations Stream */}
      <div className="flex flex-col gap-4 px-4 mt-1">
        {filteredUniversities.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-8 text-center flex flex-col items-center gap-3 border border-[#e2e8f0]">
            <span className="material-symbols-outlined text-[36px] text-on-surface-variant">search_off</span>
            <p className="font-bold text-[15px] text-on-surface">No institutions match the current criteria</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-secondary text-white text-[12px] font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredUniversities.map((univ) => {
            const isBookmarked = bookmarkedIds.includes(univ.id);
            const isCompared = comparedUniversities.some((u) => u.id === univ.id);

            // Ring progress math (stroke-dasharray 125.6)
            const strokeOffset = 125.6 - (125.6 * univ.syncScore) / 100;
            const strokeColor =
              univ.syncScore >= 90
                ? '#10b981'
                : univ.syncScore >= 85
                ? '#4648d4'
                : '#f59e0b';

            return (
              <article
                key={univ.id}
                className="bg-surface-container-lowest rounded-2xl shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col border border-[#e2e8f0]/80"
              >
                {/* Image Hero & Match Badge Overlay */}
                <div className="relative w-full h-36 bg-surface-container overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt={`${univ.name} campus`}
                    src={univ.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

                  {/* Top Action Row */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-xs">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: strokeColor }}
                      />
                      <span className="text-[11px] text-on-surface font-bold tracking-wide uppercase">
                        {univ.matchLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        aria-label={`Save ${univ.name}`}
                        onClick={() => onToggleBookmark(univ.id)}
                        className={`w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center transition-colors shadow-xs active:scale-95 ${
                          isBookmarked ? 'text-secondary' : 'text-on-surface hover:text-secondary'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          bookmark
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Floating Compare Pill */}
                  <label className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-lowest/95 backdrop-blur-md text-on-surface cursor-pointer shadow-xs select-none hover:bg-white transition-colors">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => onToggleCompare(univ)}
                      className="w-3.5 h-3.5 accent-secondary rounded cursor-pointer"
                    />
                    <span className="text-[11px] font-semibold">Compare</span>
                  </label>
                </div>

                {/* Main Content Block */}
                <div className="p-4 flex flex-col gap-3">
                  {/* Identity & Match Score Radial */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h2 className="font-bold text-[16px] text-on-surface leading-tight truncate">
                          {univ.name}
                        </h2>
                        <span
                          className="material-symbols-outlined text-secondary text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          title="Verified Official Institution"
                        >
                          verified
                        </span>
                      </div>
                      <p className="text-[13px] text-secondary font-semibold mt-0.5">
                        {univ.degreeMatch}
                      </p>
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-[12px] font-medium mt-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span>{univ.location}</span>
                        </div>
                        <span className="text-outline-variant">•</span>
                        <span className="px-1.5 py-0.2 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold rounded">
                          {univ.qsRank}
                        </span>
                        <span className="text-outline-variant">•</span>
                        <span className="font-bold text-[11px]" style={{ color: strokeColor }}>
                          {univ.globalRank}
                        </span>
                      </div>
                    </div>

                    {/* Circular Radial Match Meter */}
                    <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                        <circle
                          className="text-surface-container"
                          cx="24"
                          cy="24"
                          fill="none"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          fill="none"
                          r="20"
                          stroke={strokeColor}
                          strokeDasharray="125.6"
                          strokeDashoffset={strokeOffset}
                          strokeLinecap="round"
                          strokeWidth="4"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[14px] font-bold text-on-surface leading-none">
                          {univ.syncScore}<span className="text-[10px] font-normal">%</span>
                        </span>
                        <span
                          className="text-[9px] uppercase font-bold tracking-tight"
                          style={{ color: strokeColor }}
                        >
                          Sync
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financial & Entry Bar */}
                  <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-on-surface-variant font-medium">Est. Net Tuition:</span>
                      <span className="text-[14px] text-on-surface font-bold">
                        {univ.netTuition}
                        <span className="text-[11px] font-normal text-on-surface-variant"> {univ.tuitionUnit}</span>
                      </span>
                    </div>
                    {univ.scholarshipNotice && (
                      <div className="flex items-center gap-1.5 text-on-tertiary-container text-[11px] font-medium bg-tertiary-fixed/30 px-2 py-0.5 rounded-md self-start">
                        <span className="material-symbols-outlined text-[14px]">redeem</span>
                        <span>{univ.scholarshipNotice}</span>
                      </div>
                    )}
                  </div>

                  {/* AI Reality Check (if present) */}
                  {univ.realityCheck && (
                    <div className="bg-amber-50 rounded-xl p-2.5 flex items-start gap-2 text-amber-900 border border-amber-200/60">
                      <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0 mt-0.5">info</span>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-tight text-amber-800">
                          AI Admissions Reality Check
                        </span>
                        <p className="text-[12px] text-amber-950 mt-0.5 leading-snug">
                          {univ.realityCheck}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* AI Fit Reasons */}
                  <div className="flex flex-col gap-1 bg-surface-container-lowest rounded-xl">
                    <span className="text-[11px] text-on-surface font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-secondary text-[14px]">bolt</span>
                      UniMatch AI Fit Intelligence
                    </span>
                    <div className="space-y-1.5">
                      {univ.fitIntelligence.map((reason, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-surface-container-low/70 rounded-lg p-2 text-on-surface"
                        >
                          <span
                            className="material-symbols-outlined text-[16px] mt-0.5 shrink-0"
                            style={{ color: strokeColor, fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <p className="text-[12px] leading-snug">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Criteria & Benchmarks */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    {univ.criteria.map((crit, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-surface-container text-[11px] text-on-surface font-medium"
                      >
                        {crit}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onSelectUniversity(univ)}
                      className="h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>View Full Profile</span>
                    </button>
                    <a
                      className="h-11 px-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
                      href={univ.officialPortal}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>Official Portal</span>
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Floating Comparison Dock */}
      <div
        className={`fixed bottom-20 left-4 right-4 max-w-xl mx-auto z-40 transition-all duration-300 transform ${
          compareCount > 0
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-primary text-white rounded-2xl shadow-xl p-3 px-4 flex items-center justify-between backdrop-blur-lg border border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white shrink-0 text-[12px] font-bold">
              {compareCount}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold leading-none truncate">
                {compareCount} {compareCount === 1 ? 'University' : 'Universities'} Selected
              </span>
              <span className="text-[11px] text-surface-container-highest mt-0.5 truncate max-w-[200px]">
                {comparedUniversities.map((u) => u.name.split(' ')[0]).join(', ')}
              </span>
            </div>
          </div>
          <button
            onClick={onOpenCompareModal}
            className="h-9 px-4 rounded-xl bg-secondary hover:bg-secondary-container text-white text-[12px] font-bold flex items-center gap-1.5 transition-colors shadow-sm active:scale-95 shrink-0"
          >
            <span>Compare Now</span>
            <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
          </button>
        </div>
      </div>
    </div>
  );
};
