import React from 'react';
import { TabKey, University } from '../types';

interface HeaderProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  selectedUniversity: University | null;
  onBackFromDetail: () => void;
  avatarUrl: string;
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  selectedUniversity,
  onBackFromDetail,
  avatarUrl,
  userName = 'Maya Chen',
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const getSubheaderTitle = () => {
    if (selectedUniversity) return 'University Detail View';
    switch (activeTab) {
      case 'matches':
        return 'Matches';
      case 'profile':
        return 'Strengths & Profile';
      case 'counselor':
        return 'Counselor Chat';
      case 'essays':
        return 'Essay Studio';
      case 'shortlist':
        return 'Shortlist & Tracker';
      default:
        return 'Matches';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e2e8f0]/60">
      <div className="max-w-xl mx-auto h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {selectedUniversity ? (
            <button
              aria-label="Go back"
              onClick={onBackFromDetail}
              className="flex items-center justify-center w-10 h-10 -ml-1 rounded-full text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={() => {
              if (selectedUniversity) onBackFromDetail();
              onTabChange('matches');
            }}
            className="flex items-center gap-2 cursor-pointer select-none min-w-0"
          >
            <img
              alt="UniMatch AI Brand Logo"
              className="h-8 w-auto object-contain shrink-0"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WRVbUlfBrgdOYOmNUYwfaGjjEbTZ-GBYgbm1GwZdn3u1q7lZd3HQGOdtk9PLOnZmNpJnyu2RpS13yxetcx0Pec-IZhCZ2TTdIsLGTHzRH1sIIqa1TWWTEl4MIcjR9mt_9gJgFHWnJsZ-GW16KH6Q_CxCPuJLbBVPdDOfO64Xphw7-nwVA6K5whsegE5ZmD0WUKih790t81V0SZ4LxiVAclxFMC1Pmom-3ojyF1pUucO_FDmGDYbHGUEnA"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[17px] text-on-surface tracking-tight leading-none">
                  UniMatch
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  AI Active
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant font-medium line-clamp-1">
                {getSubheaderTitle()}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button
            aria-label="User Profile"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors active:scale-95"
            title={`${userName} Account`}
          >
            {avatarUrl ? (
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-secondary/20"
                src={avatarUrl}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-secondary text-white font-bold text-[12px] flex items-center justify-center ring-1 ring-secondary/20">
                {userName.charAt(0) || 'U'}
              </div>
            )}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary-container rounded-full ring-2 ring-surface" />
          </button>

          {menuOpen && (
            <div className="absolute top-12 right-0 w-48 bg-surface-container-lowest rounded-2xl shadow-xl border border-[#e2e8f0] p-2 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-[#e2e8f0]">
                <span className="font-bold text-[13px] text-on-surface block truncate">
                  {userName}
                </span>
                <span className="text-[11px] text-on-surface-variant block truncate">
                  Logged in
                </span>
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (selectedUniversity) onBackFromDetail();
                  onTabChange('profile');
                }}
                className="w-full text-left px-3 py-1.5 text-[12px] font-medium text-on-surface hover:bg-surface-container-low rounded-lg transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">person</span>
                <span>View Profile</span>
              </button>
              {onLogout && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-1.5 text-[12px] font-medium text-error hover:bg-error-container/30 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Log Out / Reset</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
