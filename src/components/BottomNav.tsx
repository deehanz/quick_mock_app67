import React from 'react';
import { TabKey } from '../types';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  shortlistCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  shortlistCount,
}) => {
  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'matches', label: 'Matches', icon: 'auto_awesome' },
    { key: 'profile', label: 'Profile', icon: 'psychology' },
    { key: 'counselor', label: 'Counselor', icon: 'smart_toy' },
    { key: 'essays', label: 'Essays', icon: 'edit_document' },
    { key: 'shortlist', label: 'Shortlist', icon: 'checklist' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-[#e2e8f0]/80 shadow-[0_-8px_24px_-4px_rgba(15,23,42,0.06)]">
      <div className="max-w-xl mx-auto flex justify-around items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all relative ${
                isActive
                  ? 'text-secondary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {tab.icon}
                </span>
                {tab.key === 'shortlist' && shortlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {shortlistCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-tight tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-secondary absolute bottom-1.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
