import React, { useState, useMemo } from 'react';
import { University, UserSession } from '../types';
import { getUniversitiesForMajor, UNIVERSITIES_CS_AI } from '../data/mockData';

interface LoginOnboardingProps {
  onComplete: (session: UserSession) => void;
}

export const LoginOnboarding: React.FC<LoginOnboardingProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Login / Profile
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [curriculum, setCurriculum] = useState('High School Senior • IB Diploma');

  // Step 2: Essay
  const [essayTitle, setEssayTitle] = useState('');
  const [essayContent, setEssayContent] = useState('');

  // Step 3: Major
  const [selectedMajor, setSelectedMajor] = useState('Computer Science & Artificial Intelligence');
  const [customMajor, setCustomMajor] = useState('');

  // Step 4: University
  const [targetUniversityId, setTargetUniversityId] = useState<string>('');
  const [lastOpenedPortal, setLastOpenedPortal] = useState<{ name: string; url: string } | null>(null);

  const majorOptions = [
    {
      title: 'Computer Science & Artificial Intelligence',
      badge: '12 Top Institutions',
      icon: 'terminal',
      desc: 'Machine learning, systems architecture, algorithms, and frontier AI research.',
    },
    {
      title: 'Data Science & Quantitative Economics',
      badge: '11 Top Institutions',
      icon: 'query_stats',
      desc: 'Econometrics, statistical finance, big data policy, and mathematical modeling.',
    },
    {
      title: 'Robotics & Hardware Engineering',
      badge: '11 Top Institutions',
      icon: 'precision_manufacturing',
      desc: 'Autonomous vehicles, mechatronics, embedded control, and humanoid robotics.',
    },
    {
      title: 'Computational Biology & Pre-Med',
      badge: '11 Top Institutions',
      icon: 'biotech',
      desc: 'Biomedical engineering, CRISPR genomics, bioinformatics, and clinical translation.',
    },
    {
      title: 'Business & Financial Technology',
      badge: '11 Top Institutions',
      icon: 'payments',
      desc: 'Corporate finance, algorithmic trading, strategic management, and venture capital.',
    },
    {
      title: 'Aerospace & Mechanical Engineering',
      badge: '11 Top Institutions',
      icon: 'rocket_launch',
      desc: 'Spacecraft propulsion, aerodynamics, NASA JPL projects, and orbital mechanics.',
    },
  ];

  const sampleEssay = `At 2:00 AM on the eve of the regional STEM robotics finals, our autonomous navigation sequence suffered a catastrophic heap overflow. While my teammates considered reverting to manual override, I isolated the corrupted pointer in our sensory loop, realizing our odometry readings had saturated the microcontroller’s buffer. That midnight epiphany wasn’t merely about resolving a memory leak; it revealed the breathtaking symmetry between logical elegance and physical motion.

Through two years of mentoring junior coders across inner-city schools, I saw firsthand that access to computational thinking transforms confidence. However, I realized foundational theory must meet scalable systems.

My interest in concurrent algorithmic architecture drives my goal to study at my target university. In our engineering society, I learned a lot about directing twenty peers under tight development cycles.`;

  // Dynamically resolve universities focusing on the selected major
  const activeMajorName = customMajor.trim() || selectedMajor;
  const majorUniversities: University[] = useMemo(() => {
    const list = getUniversitiesForMajor(activeMajorName);
    return list && list.length > 0 ? list : UNIVERSITIES_CS_AI;
  }, [activeMajorName]);

  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;

  // Handle clicking a university: directly selects AND sends the user to the official portal
  const handleSelectAndOpenPortal = (univ: University) => {
    setTargetUniversityId(univ.id);
    setLastOpenedPortal({ name: univ.name, url: univ.officialPortal });
    // Open portal in new window/tab as requested
    window.open(univ.officialPortal, '_blank', 'noopener,noreferrer');
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStep(2);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const handleStep3Next = () => {
    setStep(4);
  };

  const handleFinish = () => {
    const finalMajor = customMajor.trim() || selectedMajor;
    const finalContent = essayContent.trim() || sampleEssay;
    const finalTitle = essayTitle.trim() || 'My Academic Statement & Purpose';
    const chosenUniv = majorUniversities.find((u) => u.id === targetUniversityId) || majorUniversities[0];

    onComplete({
      name: name.trim() || 'Student Scholar',
      email: email.trim() || 'applicant@unimatch.edu',
      curriculum,
      major: finalMajor,
      essayTitle: finalTitle,
      essayContent: finalContent,
      targetUniversityId: chosenUniv.id,
    });
  };

  // Quick fill helper for testing / ease of use
  const loadQuickDemoData = () => {
    setName('Maya Chen');
    setEmail('maya.chen@student.edu');
    setCurriculum('High School Senior • IB Diploma (Predicted 41/45)');
    setEssayTitle('From Circuits to Communities: Why Computing Inspires Me');
    setEssayContent(sampleEssay);
    setSelectedMajor('Computer Science & Artificial Intelligence');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between py-6 px-4">
      {/* Top Branding */}
      <div className="max-w-xl w-full mx-auto flex flex-col items-center text-center pt-2">
        <div className="flex items-center gap-2 mb-1.5">
          <img
            alt="UniMatch AI Brand Logo"
            className="h-9 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1WRVbUlfBrgdOYOmNUYwfaGjjEbTZ-GBYgbm1GwZdn3u1q7lZd3HQGOdtk9PLOnZmNpJnyu2RpS13yxetcx0Pec-IZhCZ2TTdIsLGTHzRH1sIIqa1TWWTEl4MIcjR9mt_9gJgFHWnJsZ-GW16KH6Q_CxCPuJLbBVPdDOfO64Xphw7-nwVA6K5whsegE5ZmD0WUKih790t81V0SZ4LxiVAclxFMC1Pmom-3ojyF1pUucO_FDmGDYbHGUEnA"
          />
          <span className="font-bold text-[22px] text-on-surface tracking-tight">
            UniMatch
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Admissions AI
          </span>
        </div>
        <p className="text-[13px] text-on-surface-variant font-medium max-w-sm">
          Simple 4-Step Personalized Admissions Intelligence & University Portal Gateway
        </p>

        {/* Step Progress Bar */}
        <div className="w-full flex items-center justify-between gap-2 mt-5 mb-3 max-w-md">
          {[
            { num: 1, label: '1. Sign In' },
            { num: 2, label: '2. Paste Essay' },
            { num: 3, label: '3. Select Major' },
            { num: 4, label: '4. Pick University' },
          ].map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all shadow-xs ${
                    isDone
                      ? 'bg-secondary text-white'
                      : isCurrent
                      ? 'bg-primary text-white ring-4 ring-secondary/20 scale-105'
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {isDone ? (
                    <span className="material-symbols-outlined text-[17px]">check</span>
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`text-[11px] font-semibold truncate ${
                    isCurrent ? 'text-secondary font-bold' : isDone ? 'text-on-surface' : 'text-on-surface-variant'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-xl w-full mx-auto my-auto pt-1 pb-4">
        {/* ================= STEP 1: LOGIN ================= */}
        {step === 1 && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-[#e2e8f0] flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  Step 1 of 4 • Student Access
                </span>
                <h2 className="font-bold text-[20px] text-on-surface mt-0.5">
                  Sign in to UniMatch
                </h2>
                <p className="text-[13px] text-on-surface-variant">
                  Enter your details to create your personalized matching session.
                </p>
              </div>
              <button
                type="button"
                onClick={loadQuickDemoData}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-secondary-fixed/50 hover:bg-secondary-fixed text-secondary text-[11px] font-bold flex items-center gap-1 transition-colors"
                title="Fill sample student details for instant testing"
              >
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>Quick Demo</span>
              </button>
            </div>

            <form onSubmit={handleStep1Next} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-on-surface">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-[#e2e8f0] text-on-surface text-[14px] focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-on-surface">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maya.chen@student.edu"
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-[#e2e8f0] text-on-surface text-[14px] focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-on-surface">Current Academic Program</label>
                <select
                  value={curriculum}
                  onChange={(e) => setCurriculum(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-[#e2e8f0] text-on-surface text-[13px] font-medium focus:outline-none focus:border-secondary transition-colors"
                >
                  <option value="High School Senior • IB Diploma">High School Senior • IB Diploma</option>
                  <option value="High School Senior • Cambridge A-Levels">High School Senior • Cambridge A-Levels</option>
                  <option value="High School Senior • AP / US High School">High School Senior • AP / US High School</option>
                  <option value="High School Senior • National Curriculum">High School Senior • National Curriculum</option>
                  <option value="Undergraduate Transfer Student">Undergraduate Transfer Student</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
                >
                  <span>Continue to Paste Essay</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 2: PASTE ESSAY ================= */}
        {step === 2 && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-[#e2e8f0] flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  Step 2 of 4 • Personal Statement
                </span>
                <span className="text-[11px] font-semibold text-on-surface-variant">
                  {wordCount} words
                </span>
              </div>
              <h2 className="font-bold text-[20px] text-on-surface mt-0.5">
                Paste Your Admissions Essay
              </h2>
              <p className="text-[13px] text-on-surface-variant">
                Paste your personal statement, college draft, or outline below.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <input
                type="text"
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
                placeholder="Draft Title (e.g. Why Computing Inspires Me, Personal Statement)"
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-[#e2e8f0] text-on-surface text-[13px] font-semibold focus:outline-none focus:border-secondary"
              />

              <textarea
                rows={9}
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
                placeholder="Paste your admissions essay text here... (Your opening hook, academic projects, leadership experiences, and long-term ambitions)"
                className="w-full p-3.5 rounded-xl bg-surface-bright border border-[#e2e8f0] text-on-surface text-[13px] leading-relaxed focus:outline-none focus:border-secondary resize-none placeholder:text-outline-variant font-sans"
              />

              <div className="flex items-center justify-between text-[12px] pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setEssayContent(sampleEssay);
                    setEssayTitle('From Circuits to Communities: Why Computing Inspires Me');
                  }}
                  className="text-secondary font-bold hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">content_paste</span>
                  Insert Sample Essay (1-Click)
                </button>
                <span className="text-[11px] text-on-surface-variant">Recommended: 400 – 750 words</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-12 px-5 rounded-xl border border-[#e2e8f0] text-on-surface font-semibold text-[13px] hover:bg-surface-container transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStep2Next}
                className="flex-1 h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
              >
                <span>Continue to Select Major</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: CHOOSE MAJOR ================= */}
        {step === 3 && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-[#e2e8f0] flex flex-col gap-4">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                Step 3 of 4 • Field of Study
              </span>
              <h2 className="font-bold text-[20px] text-on-surface mt-0.5">
                Select Your Intended Major
              </h2>
              <p className="text-[13px] text-on-surface-variant">
                Select your focus area so UniMatch recommends universities specializing in that specific field.
              </p>
            </div>

            {/* List of Major Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {majorOptions.map((item) => {
                const isSelected = selectedMajor === item.title && !customMajor.trim();
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      setSelectedMajor(item.title);
                      setCustomMajor('');
                    }}
                    className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      isSelected
                        ? 'border-secondary bg-secondary-fixed/40 ring-2 ring-secondary shadow-xs'
                        : 'border-[#e2e8f0] bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        {item.icon}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container text-on-surface">
                        {item.badge}
                      </span>
                    </div>
                    <span className="font-bold text-[13px] text-on-surface leading-tight mt-1">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-on-surface-variant line-clamp-2 leading-snug">
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Or custom major */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-[12px] font-semibold text-on-surface">
                Or enter custom major/specialization:
              </label>
              <input
                type="text"
                value={customMajor}
                onChange={(e) => setCustomMajor(e.target.value)}
                placeholder="e.g. Cognitive Neuroscience, Materials Science, FinTech..."
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-[#e2e8f0] text-on-surface text-[13px] focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-12 px-5 rounded-xl border border-[#e2e8f0] text-on-surface font-semibold text-[13px] hover:bg-surface-container transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStep3Next}
                className="flex-1 h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99]"
              >
                <span>Choose University for {activeMajorName.split(' ')[0]}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CHOOSE UNIVERSITY (AT LEAST 10 OPTIONS & RANKS & DIRECT PORTAL ON CLICK) ================= */}
        {step === 4 && (
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-[#e2e8f0] flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  Step 4 of 4 • Institutional Fit
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  {majorUniversities.length} Universities for {activeMajorName}
                </span>
              </div>
              <h2 className="font-bold text-[20px] text-on-surface mt-0.5">
                Choose Your Target University
              </h2>
              <p className="text-[13px] text-on-surface-variant">
                Top global institutions focusing specifically on <span className="font-bold text-on-surface">{activeMajorName}</span>.
              </p>
            </div>

            {/* Direct Portal Notice Banner */}
            <div className="p-3 rounded-xl bg-secondary-fixed/30 border border-secondary/20 flex items-center gap-2 text-on-surface text-[12px]">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">open_in_new</span>
              <p className="leading-snug">
                <span className="font-bold text-secondary">Direct Portal Access:</span> Clicking any university below automatically selects it and <span className="font-semibold underline">directly opens its official admissions portal in a new tab</span>.
              </p>
            </div>

            {/* If a portal was just opened, display status */}
            {lastOpenedPortal && (
              <div className="p-2.5 rounded-lg bg-green-50 border border-green-200 flex items-center justify-between gap-2 text-[12px] text-green-900">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                  <span className="truncate font-medium">Opened portal: <strong>{lastOpenedPortal.name}</strong></span>
                </div>
                <a
                  href={lastOpenedPortal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-bold text-[11px] hover:underline shrink-0"
                >
                  Reopen Portal
                </a>
              </div>
            )}

            {/* University List: At least 10 options with ranks */}
            <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto no-scrollbar pr-0.5">
              {majorUniversities.map((univ, index) => {
                const isSelected = targetUniversityId === univ.id;
                return (
                  <div
                    key={univ.id}
                    onClick={() => handleSelectAndOpenPortal(univ)}
                    className={`p-3.5 rounded-xl border flex flex-col gap-2 cursor-pointer transition-all active:scale-[0.99] group ${
                      isSelected
                        ? 'border-secondary bg-secondary-fixed/30 ring-2 ring-secondary shadow-xs'
                        : 'border-[#e2e8f0] bg-surface-container-low hover:bg-surface-container hover:border-secondary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant font-bold text-[11px] flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <img
                          src={univ.image}
                          alt={univ.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 ring-1 ring-[#e2e8f0]"
                        />
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-[14px] text-on-surface truncate group-hover:text-secondary transition-colors">
                            {univ.name}
                          </span>
                          <span className="text-[11px] text-secondary font-semibold truncate">
                            {univ.degreeMatch}
                          </span>
                          <span className="text-[11px] text-on-surface-variant truncate">
                            {univ.location} • {univ.netTuition} {univ.tuitionUnit}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center pt-0.5">
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-secondary bg-secondary text-white'
                              : 'border-outline-variant bg-white group-hover:border-secondary'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                      </div>
                    </div>

                    {/* Rankings & Direct Portal Action Row */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-[#e2e8f0]/60 gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md bg-secondary text-white text-[10px] font-bold flex items-center gap-1 shadow-2xs">
                          <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                          {univ.globalRank}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface text-[10px] font-bold">
                          {univ.qsRank}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-secondary bg-surface-container-highest px-2.5 py-1 rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors">
                        <span>Visit Official Portal</span>
                        <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-12 px-5 rounded-xl border border-[#e2e8f0] text-on-surface font-semibold text-[13px] hover:bg-surface-container transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex-1 h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-[14px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
              >
                <span>Launch Workspace</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer reassurance */}
      <div className="max-w-xl w-full mx-auto text-center pt-2">
        <p className="text-[11px] text-on-surface-variant flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-secondary">shield</span>
          Your academic profile, essay drafts, and shortlisted target universities remain local and secure.
        </p>
      </div>
    </div>
  );
};
