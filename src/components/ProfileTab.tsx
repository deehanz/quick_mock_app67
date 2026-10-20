import React from 'react';
import { StudentProfile, Trait } from '../types';

interface ProfileTabProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onOpenSharpenModal: () => void;
  onOpenFineTuneModal: () => void;
  onOpenPromptLogModal: () => void;
  onSelectMajorTrajectory: (major: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  onUpdateProfile,
  onOpenSharpenModal,
  onOpenFineTuneModal,
  onOpenPromptLogModal,
  onSelectMajorTrajectory,
}) => {
  return (
    <div className="flex flex-col w-full pb-28">
      {/* Profile & Academic Snapshot Bento */}
      <section className="px-4 pt-3 flex flex-col gap-3">
        {/* Student Profile Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex flex-col gap-3 border border-[#e2e8f0]/80">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  alt={`${profile.name} portrait`}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#e2e8f0]"
                  src={profile.avatar}
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-tertiary-fixed rounded-full flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[11px] text-on-tertiary-fixed font-bold">
                    verified
                  </span>
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="font-bold text-[20px] text-on-surface truncate leading-tight">
                    {profile.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                    {profile.classYear}
                  </span>
                </div>
                <p className="text-[12px] text-on-surface-variant truncate mt-0.5">
                  {profile.status}
                </p>
                <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[15px] shrink-0 text-secondary">
                    location_on
                  </span>
                  <span className="text-[11px] font-medium truncate">
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
            <button
              aria-label="Edit Profile"
              onClick={onOpenFineTuneModal}
              className="shrink-0 w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface transition-transform active:scale-95 hover:bg-surface-container"
              type="button"
              title="Fine-tune profile attributes"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </button>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 gap-2 bg-surface-container-low rounded-xl p-2.5">
            <div className="flex flex-col px-1 py-0.5">
              <span className="text-[11px] text-on-surface-variant font-medium">Academic Index</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-bold text-[18px] text-on-surface">{profile.gpa}</span>
                <span className="text-[11px] text-secondary font-semibold">/ {profile.gpaMax} GPA</span>
              </div>
              <span className="text-[11px] text-on-surface-variant mt-0.5">
                IB Predicted: <strong className="text-on-surface font-semibold">{profile.ibPredicted}</strong> / {profile.ibMax}
              </span>
            </div>
            <div className="flex flex-col px-1 py-0.5 border-l border-[#e2e8f0]/60 pl-2.5">
              <span className="text-[11px] text-on-surface-variant font-medium">Higher Level Focus</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.hlSubjects.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded-md bg-surface-container-highest text-on-surface text-[11px] font-semibold"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scholarship Accelerator Gamified Banner */}
        <div className="bg-gradient-to-r from-secondary-container to-secondary rounded-2xl p-4 text-white shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-[20px] text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] tracking-wider uppercase font-bold text-white/80">
                Micro-Action
              </span>
              <p className="font-bold text-[15px] leading-tight text-white truncate">
                Sharpen Match Precision
              </p>
              <p className="text-[12px] text-white/90 truncate">
                Answer 3 optional questions for +12% accuracy
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSharpenModal}
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-secondary font-bold text-[12px] active:scale-95 shadow-xs transition-transform hover:bg-white"
            type="button"
          >
            Start
          </button>
        </div>
      </section>

      {/* AI Strengths Breakdown */}
      <section className="px-4 pt-5 flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-secondary text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                psychology
              </span>
              <h2 className="font-bold text-[16px] text-on-surface">AI Cognitive Discovery</h2>
            </div>
            <p className="text-[12px] text-on-surface-variant mt-0.5">
              Synthesized from 12 diagnostic assessment signals
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
            Active Archetype
          </span>
        </div>

        {/* Strengths Breakdown Stack */}
        <div className="flex flex-col gap-2">
          {profile.traits.map((trait) => (
            <div
              key={trait.id}
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex flex-col gap-1 border border-[#e2e8f0]/80 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[18px]">{trait.icon}</span>
                  </div>
                  <span className="font-bold text-[14px] text-on-surface">{trait.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                  {trait.scoreLabel}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container mt-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    trait.progressColor?.startsWith('from')
                      ? `bg-gradient-to-r ${trait.progressColor}`
                      : trait.progressColor || 'bg-secondary'
                  } transition-all duration-700`}
                  style={{ width: `${trait.score}%` }}
                />
              </div>
              <p className="text-[12px] text-on-surface-variant mt-1 leading-relaxed">
                {trait.description}
              </p>
            </div>
          ))}
        </div>

        {/* AI Explainability Insight Card */}
        <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden border border-[#e2e8f0]/80">
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-[18px]">neurology</span>
            <span className="text-[11px] uppercase tracking-wider font-bold">
              Why the AI Identified These Strengths
            </span>
          </div>
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            Your responses to the 12-question diagnostic emphasized high motivation when writing algorithms, solving unfamiliar mathematical puzzles, and leading self-directed project development during school STEM electives.
          </p>
          <div className="pt-1 flex items-center justify-between">
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">lock_reset</span>
              Diagnostic dynamic baseline
            </span>
            <button
              onClick={onOpenPromptLogModal}
              className="text-secondary text-[11px] font-bold underline underline-offset-2 hover:opacity-80"
              type="button"
            >
              View Prompt Log
            </button>
          </div>
        </div>

        {/* Fine-Tune CTA */}
        <button
          onClick={onOpenFineTuneModal}
          className="w-full py-3 px-4 rounded-xl bg-surface-container-lowest text-on-surface shadow-xs font-semibold text-[13px] flex items-center justify-center gap-2 active:scale-[0.99] transition-transform border border-[#e2e8f0] hover:bg-surface-container-low"
          type="button"
        >
          <span className="material-symbols-outlined text-secondary text-[18px]">tune</span>
          <span>Retake Assessment or Fine-Tune Attributes</span>
        </button>
        <p className="text-center text-[11px] text-on-surface-variant -mt-1">
          Your profile evolves as you grow. Re-align traits anytime.
        </p>
      </section>

      {/* Recommended Academic Pathways */}
      <section className="px-4 pt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[16px] text-on-surface">Recommended Trajectories</h2>
            <p className="text-[12px] text-on-surface-variant mt-0.5">
              Top major fits based on cognitive alignment
            </p>
          </div>
          <span className="material-symbols-outlined text-secondary text-[20px]">school</span>
        </div>

        {/* Major Chips */}
        <div className="grid grid-cols-1 gap-2">
          {profile.trajectories.map((traj) => (
            <div
              key={traj.id}
              onClick={() => onSelectMajorTrajectory(traj.title)}
              className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-xs flex items-center justify-between gap-3 border border-[#e2e8f0]/80 hover:border-secondary transition-all cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0 font-bold text-[14px]">
                  {traj.number}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[14px] text-on-surface truncate">
                    {traj.title}
                  </span>
                  <span className="text-[12px] text-on-surface-variant truncate">
                    {traj.synergy}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">
                arrow_forward
              </span>
            </div>
          ))}
        </div>

        {/* Interdisciplinary Toggle Banner */}
        <div className="p-3.5 rounded-2xl bg-surface-container-high flex items-center justify-between gap-3 border border-[#e2e8f0]/60">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
              interests
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[13px] text-on-surface">
                Unsure of a single path?
              </span>
              <span className="text-[11px] text-on-surface-variant truncate">
                Explore blended interdisciplinary degrees
              </span>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={profile.exploreBlended}
            onClick={() => onUpdateProfile({ exploreBlended: !profile.exploreBlended })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              profile.exploreBlended ? 'bg-secondary' : 'bg-surface-container-highest'
            }`}
            type="button"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                profile.exploreBlended ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </section>

      {/* Preferences & Constraints */}
      <section className="px-4 pt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[16px] text-on-surface">Parameters & Constraints</h2>
            <p className="text-[12px] text-on-surface-variant mt-0.5">
              Guardrails for AI match scoring
            </p>
          </div>
          <button
            onClick={onOpenFineTuneModal}
            className="text-[12px] text-secondary font-bold hover:underline"
            type="button"
          >
            Modify
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs flex flex-col gap-3.5 border border-[#e2e8f0]/80">
          {/* Budget Pill Cluster */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant font-medium">
                Annual Tuition & Living Target
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                {profile.aidStatus}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-bold text-[18px] text-on-surface">
                {profile.annualTuitionBudget}
              </span>
              <span className="text-[12px] text-on-surface-variant">USD / year</span>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              {profile.aidDescription}
            </p>
          </div>

          {/* Target Regions */}
          <div className="flex flex-col gap-1.5 border-t border-[#e2e8f0]/60 pt-3">
            <span className="text-[11px] text-on-surface-variant font-medium">Target Regions</span>
            <div className="flex flex-wrap gap-1.5">
              {profile.targetRegions.map((region, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface text-[12px] font-medium flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px] text-secondary">public</span>
                  {region}
                </span>
              ))}
            </div>
          </div>

          {/* Campus Style */}
          <div className="flex flex-col gap-1.5 border-t border-[#e2e8f0]/60 pt-3">
            <span className="text-[11px] text-on-surface-variant font-medium">Campus Culture & Environment</span>
            <div className="grid grid-cols-2 gap-2">
              {profile.campusStyle.map((style, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-surface-container-low flex flex-col gap-0.5">
                  <span className="text-[12px] text-on-surface font-semibold">{style.title}</span>
                  <span className="text-[11px] text-on-surface-variant">{style.subtitle}</span>
                </div>
              ))}
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[15px] text-secondary">translate</span>
              <span className="text-[12px]">Primary instructional medium: {profile.instructionalMedium}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
