import React from 'react';
import { University } from '../types';

interface UniversityDetailModalProps {
  university: University;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (univId: string) => void;
  isCompared: boolean;
  onToggleCompare: (univ: University) => void;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onBack,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
}) => {
  return (
    <div className="flex flex-col w-full pb-24 animate-in fade-in duration-200">
      {/* Campus Hero Section */}
      <div className="relative w-full px-4 pt-3">
        <div className="relative overflow-hidden rounded-2xl shadow-md h-56 w-full">
          <img
            className="w-full h-full object-cover"
            alt={`${university.name} campus architecture`}
            src={university.heroImage || university.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent flex flex-col justify-end p-4 text-white">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="bg-surface-container-lowest/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 text-white">
                <span className="material-symbols-outlined text-[13px] text-tertiary-fixed-dim">workspace_premium</span>
                {university.qsRank || university.globalRank}
              </span>
              <span className="bg-surface-container-lowest/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase text-white flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">location_on</span>
                {university.campusArea || university.location}
              </span>
            </div>
            <h2 className="font-bold text-[24px] sm:text-[28px] leading-tight text-white drop-shadow-xs">
              {university.name}
            </h2>
            <p className="text-[13px] text-white/90 font-medium">
              {university.faculty}
            </p>
          </div>
        </div>
      </div>

      {/* Match Score & AI Executive Fit Banner */}
      <div className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex flex-col gap-3 border border-[#e2e8f0]/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-surface-container-high"
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
                    stroke="#009668"
                    strokeDasharray="125.6"
                    strokeDashoffset={125.6 - (125.6 * university.syncScore) / 100}
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
                <span className="absolute font-bold text-[14px] text-on-surface">
                  {university.syncScore}<span className="text-[10px]">%</span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[14px] text-on-surface">Overall Compatibility</span>
                  <span
                    className="material-symbols-outlined text-[16px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  {university.matchLabel} for Maya
                </span>
              </div>
            </div>

            <button
              aria-label="Save to shortlist"
              onClick={() => onToggleBookmark(university.id)}
              className={`w-10 h-10 rounded-full bg-surface-container flex items-center justify-center transition-all active:scale-95 ${
                isBookmarked ? 'text-secondary bg-secondary-fixed' : 'text-on-surface hover:text-secondary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
          </div>

          {/* Fit Breakdown Indicators */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-surface-container-low rounded-xl p-2.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-on-surface-variant font-medium">Academic Fit</span>
                <span className="text-[12px] text-on-surface font-bold">{university.breakdown.academic}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-on-tertiary-container h-full rounded-full transition-all duration-500"
                  style={{ width: `${university.breakdown.academic}%` }}
                />
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-2.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-on-surface-variant font-medium">Career Path</span>
                <span className="text-[12px] text-on-surface font-bold">{university.breakdown.career}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: `${university.breakdown.career}%` }}
                />
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-2.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-on-surface-variant font-medium">Budget & Aid</span>
                <span className="text-[12px] text-on-surface font-bold">{university.breakdown.budget}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-secondary-container h-full rounded-full transition-all duration-500"
                  style={{ width: `${university.breakdown.budget}%` }}
                />
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-2.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-on-surface-variant font-medium">Campus Life</span>
                <span className="text-[12px] text-on-surface font-bold">{university.breakdown.campus}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-outline h-full rounded-full transition-all duration-500"
                  style={{ width: `${university.breakdown.campus}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Interactive Actions */}
      <div className="px-4 mt-3 flex items-center gap-2">
        <a
          className="flex-1 h-12 bg-primary-container text-white rounded-xl flex items-center justify-center gap-2 font-semibold text-[14px] shadow-sm active:scale-[0.98] transition-all hover:bg-black"
          href={university.officialPortal}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-[19px] text-tertiary-fixed-dim">open_in_new</span>
          <span>Official Admissions Portal</span>
        </a>
        <button
          onClick={() => onToggleCompare(university)}
          className={`h-12 px-4 rounded-xl flex items-center gap-2 font-semibold text-[13px] shadow-xs active:scale-95 transition-all border ${
            isCompared
              ? 'bg-secondary text-white border-secondary'
              : 'bg-surface-container-lowest text-on-surface border-[#e2e8f0] hover:bg-surface-container-low'
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: isCompared ? "'FILL' 1" : "'FILL' 0" }}
          >
            {isCompared ? 'check_box' : 'check_box_outline_blank'}
          </span>
          <span>Compare</span>
        </button>
      </div>

      {/* Personalized AI Recommendation Insight */}
      <div className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80">
          <div className="flex items-center gap-2 mb-2 text-secondary">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              neurology
            </span>
            <h3 className="font-bold text-[16px] text-on-surface">Why AI Recommends {university.name}</h3>
          </div>
          <p className="text-[13px] text-on-surface-variant leading-relaxed">
            {university.fitIntelligence.join(' ')}
          </p>
          <div className="mt-3 pt-2 bg-surface-container-low rounded-xl p-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-on-tertiary-container text-[18px]">verified_user</span>
            <span className="text-[11px] text-on-surface-variant font-medium">
              Information verified from official institutional admissions criteria
            </span>
          </div>
        </div>
      </div>

      {/* Curated Degree Match */}
      <div className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Curated Degree Match
            </span>
            <span className="text-[12px] text-on-surface-variant flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[15px]">school</span>
              {university.duration}
            </span>
          </div>
          <h3 className="font-bold text-[17px] text-on-surface mb-0.5">
            {university.degreeMatch}
          </h3>
          <p className="text-[13px] text-on-surface-variant mb-3">
            {university.department}
          </p>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] text-on-surface font-semibold">Available Specialization Tracks:</span>
            <div className="flex flex-wrap gap-1.5 mt-0.5">
              {university.specializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="bg-surface-container px-2.5 py-1 rounded-full text-[12px] text-on-surface font-medium flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[14px] text-secondary">{spec.icon}</span>
                  {spec.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admission Requirements & Timelines */}
      <div className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-secondary text-[20px]">fact_check</span>
            <h3 className="font-bold text-[16px] text-on-surface">Admission Requirements</h3>
          </div>
          <div className="space-y-2.5">
            <div className="bg-surface-container-low p-3 rounded-xl flex items-start gap-2.5">
              <span className="material-symbols-outlined text-on-surface text-[18px] mt-0.5">event</span>
              <div>
                <span className="text-[12px] text-on-surface font-bold block">Application Window</span>
                <span className="text-[12px] text-on-surface-variant">{university.applicationWindow}</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl flex items-start gap-2.5">
              <span className="material-symbols-outlined text-on-surface text-[18px] mt-0.5">grade</span>
              <div>
                <span className="text-[12px] text-on-surface font-bold block">Academic Benchmarks</span>
                <span className="text-[12px] text-on-surface-variant">{university.academicBenchmarks}</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-3 rounded-xl flex items-start gap-2.5">
              <span className="material-symbols-outlined text-on-surface text-[18px] mt-0.5">translate</span>
              <div>
                <span className="text-[12px] text-on-surface font-bold block">English Language Proficiency</span>
                <span className="text-[12px] text-on-surface-variant">{university.englishProficiency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tuition & Financial Aid */}
      <div className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-tertiary-container text-[20px]">account_balance_wallet</span>
              <h3 className="font-bold text-[16px] text-on-surface">Tuition & Financial Aid</h3>
            </div>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full text-[11px] font-bold">
              Subsidies Available
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-surface-container-low rounded-xl p-3">
              <span className="text-[11px] text-on-surface-variant block font-medium">
                {university.moeGrantTuition ? 'With MOE Grant' : 'Est. Subsidized'}
              </span>
              <span className="font-bold text-[16px] text-on-surface block mt-0.5">
                {university.moeGrantTuition ? 'S$17,800' : university.netTuition}
              </span>
              <span className="text-[11px] text-on-surface-variant">
                {university.moeGrantTuition ? '~US$13,400 / year' : `${university.tuitionUnit}`}
              </span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-3">
              <span className="text-[11px] text-on-surface-variant block font-medium">Non-Subsidized</span>
              <span className="font-bold text-[16px] text-on-surface block mt-0.5">
                {university.nonSubsidizedTuition ? 'S$39,800' : 'Full Rate'}
              </span>
              <span className="text-[11px] text-on-surface-variant">
                {university.nonSubsidizedTuition ? '~US$29,900 / year' : 'Annual Base'}
              </span>
            </div>
          </div>

          {university.prequalifiedScholarships.length > 0 && (
            <div>
              <h4 className="text-[12px] text-on-surface font-bold mb-1.5">Pre-qualified Scholarships:</h4>
              <div className="space-y-1.5">
                {university.prequalifiedScholarships.map((sch, i) => (
                  <div key={i} className="p-2.5 bg-surface-container-low rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-on-surface font-semibold">{sch.title}</span>
                      <span className="text-[11px] text-on-tertiary-container font-bold bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
                        {sch.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5 leading-snug">
                      {sch.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Balanced Admission Analysis */}
      <div className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-secondary text-[20px]">balance</span>
            <h3 className="font-bold text-[16px] text-on-surface">Balanced Admission Analysis</h3>
          </div>

          <div className="mb-3">
            <span className="text-[11px] text-on-tertiary-container font-bold uppercase tracking-wider flex items-center gap-1 mb-1.5">
              <span className="material-symbols-outlined text-[15px]">thumb_up</span> Strategic Advantages
            </span>
            <ul className="space-y-1.5 pl-0.5">
              {university.advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-on-tertiary-container text-[16px] mt-0.5 shrink-0">check_circle</span>
                  <span className="text-[12px] text-on-surface leading-snug">{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-[#e2e8f0]/60">
            <span className="text-[11px] text-[#2f2ebe] font-bold uppercase tracking-wider flex items-center gap-1 mb-1.5">
              <span className="material-symbols-outlined text-[15px]">warning</span> Trade-offs & Challenges
            </span>
            <ul className="space-y-1.5 pl-0.5">
              {university.tradeoffs.map((tro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5 shrink-0">info</span>
                  <span className="text-[12px] text-on-surface-variant leading-snug">{tro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Campus Location Map */}
      <div className="px-4 mt-3">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-on-surface text-[20px]">explore</span>
              <h3 className="font-bold text-[16px] text-on-surface">Campus Location</h3>
            </div>
            <span className="text-[11px] text-on-surface-variant font-medium">
              {university.campusArea || university.location}
            </span>
          </div>
          <div
            className="w-full h-40 bg-cover bg-center rounded-xl shadow-inner overflow-hidden border border-[#e2e8f0]"
            style={{
              backgroundImage: `url(${
                university.mapImage ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuA7jLbee5zM63_tWyNVYXTNAEXU3qanJhJVdxfDuLLcM1kU_Gu_HZfBg0EvXKHnBeXKvuQ5NyjfA_BkLkh6EwaaTj5gehRBLV2QB4YK__xqGgRM42v6XF6BCZeGXKvLBLNMa8qitYzTF4lkMemJ0k78XLV8tfm0a7LMK-w1eMgz693gt2lksR3HEQCPU84kdoPEq0snvn000Qh97qL3u6AmHGKnXcXyPcJRbEdOpn1djuWnUOk_EsHP'
              })`,
            }}
          />
        </div>
      </div>

      {/* Official Institutional Sources */}
      <div className="px-4 mt-3 mb-6">
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80">
          <h3 className="font-bold text-[16px] text-on-surface mb-2.5">Official Institutional Sources</h3>
          <div className="space-y-1.5">
            <a
              className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl text-on-surface hover:bg-surface-container transition-colors"
              href={university.officialPortal}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">school</span>
                <span className="text-[13px] font-semibold">{university.name} Undergraduate Admissions</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">arrow_forward</span>
            </a>
            <a
              className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl text-on-surface hover:bg-surface-container transition-colors"
              href={university.officialPortal}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">laptop_mac</span>
                <span className="text-[13px] font-semibold">{university.department}</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
