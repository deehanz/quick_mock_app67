import React, { useState } from 'react';
import { TabKey, University, StudentProfile, Trait, UserSession } from './types';
import { INITIAL_PROFILE, UNIVERSITIES, getUniversitiesForMajor } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginOnboarding } from './components/LoginOnboarding';
import { MatchesTab } from './components/MatchesTab';
import { ProfileTab } from './components/ProfileTab';
import { CounselorTab } from './components/CounselorTab';
import { EssayStudioTab } from './components/EssayStudioTab';
import { ShortlistTab } from './components/ShortlistTab';
import { UniversityDetailModal } from './components/UniversityDetailModal';
import { UniversityCompareModal } from './components/UniversityCompareModal';
import { SyncBreakdownModal } from './components/SyncBreakdownModal';
import { SharpenPrecisionModal } from './components/SharpenPrecisionModal';
import { FineTuneAttributesModal } from './components/FineTuneAttributesModal';
import { PromptLogModal } from './components/PromptLogModal';

export default function App() {
  // Authentication & Onboarding state: Starts UN-LOGGED IN and NOT progressed
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const [activeTab, setActiveTab] = useState<TabKey>('matches');
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [universities, setUniversities] = useState<University[]>(UNIVERSITIES);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [comparedUniversities, setComparedUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  // Modals state
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [breakdownModalOpen, setBreakdownModalOpen] = useState(false);
  const [sharpenModalOpen, setSharpenModalOpen] = useState(false);
  const [fineTuneModalOpen, setFineTuneModalOpen] = useState(false);
  const [promptLogModalOpen, setPromptLogModalOpen] = useState(false);
  const [selectedUnivForEssay, setSelectedUnivForEssay] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Handle completion of onboarding wizard
  const handleOnboardingComplete = (session: UserSession) => {
    setUserSession(session);
    setIsLoggedIn(true);

    // Curate focused universities based on the user's selected major
    const majorUnivs = getUniversitiesForMajor(session.major);
    setUniversities(majorUnivs);

    // Personalize student profile with the user's inputs
    setProfile((prev) => ({
      ...prev,
      name: session.name,
      status: session.curriculum,
      trajectories: [
        {
          id: 'user_major',
          number: '01',
          title: session.major,
          synergy: '98% Strategic Synergy • Primary Focus',
        },
        ...prev.trajectories.slice(1),
      ],
    }));

    setSelectedUnivForEssay(session.targetUniversityId);
    setBookmarkedIds([session.targetUniversityId]);
    setActiveTab('matches');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserSession(null);
    setSelectedUniversity(null);
    setUniversities(UNIVERSITIES);
    setActiveTab('matches');
  };

  // Switch major inside the workspace
  const handleSwitchMajor = (majorTitle: string) => {
    const updatedUnivs = getUniversitiesForMajor(majorTitle);
    setUniversities(updatedUnivs);
    if (updatedUnivs.length > 0) {
      setSelectedUnivForEssay(updatedUnivs[0].id);
      setBookmarkedIds([updatedUnivs[0].id]);
    }
    setUserSession((prev) => (prev ? { ...prev, major: majorTitle } : null));
    setActiveTab('matches');
  };

  // Bookmark toggle
  const handleToggleBookmark = (univId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(univId) ? prev.filter((id) => id !== univId) : [...prev, univId]
    );
  };

  // Compare toggle
  const handleToggleCompare = (univ: University) => {
    setComparedUniversities((prev) => {
      const exists = prev.some((u) => u.id === univ.id);
      if (exists) {
        return prev.filter((u) => u.id !== univ.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 universities simultaneously.');
        return prev;
      }
      return [...prev, univ];
    });
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveTraits = (updatedTraits: Trait[]) => {
    setProfile((prev) => ({ ...prev, traits: updatedTraits }));
  };

  const handleSharpenComplete = () => {
    setUniversities((prev) =>
      prev.map((u) => ({
        ...u,
        syncScore: Math.min(u.syncScore + 2, 99),
      }))
    );
  };

  // If user is not logged in, render the clean login & setup wizard
  if (!isLoggedIn) {
    return (
      <LoginOnboarding
        onComplete={handleOnboardingComplete}
      />
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSelectedUniversity(null);
          setActiveTab(tab);
        }}
        selectedUniversity={selectedUniversity}
        onBackFromDetail={() => setSelectedUniversity(null)}
        avatarUrl={profile.avatar}
        userName={profile.name}
        onLogout={handleLogout}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-primary text-white text-[12px] font-semibold shadow-xl border border-white/10 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[16px]">info</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-xl mx-auto pt-16 flex flex-col">
        {selectedUniversity ? (
          <UniversityDetailModal
            university={selectedUniversity}
            onBack={() => setSelectedUniversity(null)}
            isBookmarked={bookmarkedIds.includes(selectedUniversity.id)}
            onToggleBookmark={handleToggleBookmark}
            isCompared={comparedUniversities.some((u) => u.id === selectedUniversity.id)}
            onToggleCompare={handleToggleCompare}
          />
        ) : (
          <>
            {activeTab === 'matches' && (
              <MatchesTab
                universities={universities}
                onSelectUniversity={(u) => setSelectedUniversity(u)}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
                comparedUniversities={comparedUniversities}
                onToggleCompare={handleToggleCompare}
                onOpenCompareModal={() => setCompareModalOpen(true)}
                onOpenBreakdownModal={() => setBreakdownModalOpen(true)}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileTab
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onOpenSharpenModal={() => setSharpenModalOpen(true)}
                onOpenFineTuneModal={() => setFineTuneModalOpen(true)}
                onOpenPromptLogModal={() => setPromptLogModalOpen(true)}
                onSelectMajorTrajectory={handleSwitchMajor}
              />
            )}

            {activeTab === 'counselor' && (
              <CounselorTab
                profile={profile}
                universities={universities}
                onSelectUniversity={(u) => setSelectedUniversity(u)}
              />
            )}

            {activeTab === 'essays' && (
              <EssayStudioTab
                universities={universities}
                selectedUnivId={selectedUnivForEssay}
                onSelectUnivId={setSelectedUnivForEssay}
                initialTitle={userSession?.essayTitle}
                initialEssayContent={userSession?.essayContent}
                major={userSession?.major}
                onUpdateContent={(content) => {
                  setUserSession((prev) => (prev ? { ...prev, essayContent: content } : null));
                }}
              />
            )}

            {activeTab === 'shortlist' && (
              <ShortlistTab
                universities={universities}
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
                onSelectUniversity={(u) => setSelectedUniversity(u)}
                onOpenCompareModal={() => setCompareModalOpen(true)}
                comparedUniversities={comparedUniversities}
                onToggleCompare={handleToggleCompare}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      {!selectedUniversity && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSelectedUniversity(null);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          shortlistCount={bookmarkedIds.length}
        />
      )}

      {/* Compare Modal */}
      <UniversityCompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        universities={comparedUniversities}
        onSelectUniversity={(univ) => {
          setCompareModalOpen(false);
          setSelectedUniversity(univ);
        }}
      />

      {/* Sync Breakdown Modal */}
      <SyncBreakdownModal
        isOpen={breakdownModalOpen}
        onClose={() => setBreakdownModalOpen(false)}
      />

      {/* Sharpen Precision Diagnostic Modal */}
      <SharpenPrecisionModal
        isOpen={sharpenModalOpen}
        onClose={() => setSharpenModalOpen(false)}
        onComplete={handleSharpenComplete}
      />

      {/* Fine-Tune Cognitive Attributes Modal */}
      <FineTuneAttributesModal
        isOpen={fineTuneModalOpen}
        onClose={() => setFineTuneModalOpen(false)}
        traits={profile.traits}
        onSaveTraits={handleSaveTraits}
      />

      {/* Prompt Log Explainability Modal */}
      <PromptLogModal
        isOpen={promptLogModalOpen}
        onClose={() => setPromptLogModalOpen(false)}
      />
    </div>
  );
}
