import React, { useState } from 'react';
import { University, EssaySuggestion } from '../types';
import { ESSAY_SUGGESTIONS } from '../data/mockData';

interface EssayStudioTabProps {
  universities: University[];
  selectedUnivId: string;
  onSelectUnivId: (id: string) => void;
  initialTitle?: string;
  initialEssayContent?: string;
  major?: string;
  onUpdateTitle?: (title: string) => void;
  onUpdateContent?: (content: string) => void;
}

export const EssayStudioTab: React.FC<EssayStudioTabProps> = ({
  universities,
  selectedUnivId,
  onSelectUnivId,
  initialTitle,
  initialEssayContent,
  major,
  onUpdateTitle,
  onUpdateContent,
}) => {
  const [essayType, setEssayType] = useState<'personal' | 'scholarship' | 'diversity' | 'why_major'>('personal');
  const [title, setTitle] = useState(initialTitle || 'From Circuits to Communities: Why Computing Inspires Me');
  const [savedTime, setSavedTime] = useState('Auto-saved just now');
  const [isEditingRaw, setIsEditingRaw] = useState(false);
  const [rawText, setRawText] = useState(
    initialEssayContent ||
      `At 2:00 AM on the eve of the regional VEX Robotics final, our autonomous navigation sequence suffered a catastrophic heap overflow. While my team considered reverting to manual override, I isolated the corrupted pointer in our sensory loop, realizing our odometry readings had saturated the microcontroller’s buffer. That midnight epiphany wasn’t merely about resolving a memory leak; it revealed the breathtaking symmetry between logical elegance and physical motion.

Through two years of mentoring junior coders across inner-city schools, I saw firsthand that access to computational thinking transforms confidence. However, I realized foundational theory must meet scalable systems.

My interest in concurrent algorithmic architecture drives my goal to study Computing at Imperial. In our robotics society, I learned a lot about directing twenty peers under tight development cycles.`
  );

  const [paragraphs, setParagraphs] = useState<string[]>(() => {
    if (initialEssayContent) {
      return initialEssayContent.split('\n\n').filter(Boolean);
    }
    return [
      `At 2:00 AM on the eve of the regional VEX Robotics final, our autonomous navigation sequence suffered a catastrophic heap overflow. While my team considered reverting to manual override, I isolated the corrupted pointer in our sensory loop, realizing our odometry readings had saturated the microcontroller’s buffer. That midnight epiphany wasn’t merely about resolving a memory leak; it revealed the breathtaking symmetry between logical elegance and physical motion.`,
      `Through two years of mentoring junior coders across inner-city schools, I saw firsthand that access to computational thinking transforms confidence. However, I realized foundational theory must meet scalable systems.`,
      `My interest in concurrent algorithmic architecture drives my goal to study Computing at Imperial. In our robotics society, I learned a lot about directing twenty peers under tight development cycles.`,
    ];
  });

  const [activeSuggestion, setActiveSuggestion] = useState<EssaySuggestion | null>(null);
  const [appliedSuggestionIds, setAppliedSuggestionIds] = useState<string[]>([]);
  const [critiqueModalOpen, setCritiqueModalOpen] = useState(false);
  const [rewriteModalOpen, setRewriteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedUniv = universities.find((u) => u.id === selectedUnivId) || universities[1];

  // Dynamic word count calculation
  const fullText = paragraphs.join(' ');
  const wordCount = fullText.trim().split(/\s+/).filter(Boolean).length;
  const maxWords = 750;
  const wordPct = Math.min(Math.round((wordCount / maxWords) * 100), 100);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApplySuggestion = (sugg: EssaySuggestion) => {
    if (sugg.id === 'sugg_1') {
      setParagraphs((prev) => [
        prev[0],
        prev[1],
        prev[2].replace(
          'My interest in concurrent algorithmic architecture drives my goal to study Computing at Imperial.',
          "My interest in concurrent algorithmic architecture drives my goal to join Imperial's Department of Computing, where I hope to conduct undergraduate research alongside faculty at the Imperial Data Science Institute."
        ),
      ]);
      setAppliedSuggestionIds((prev) => [...prev, sugg.id]);
      showToast('Imperial faculty and Data Science Institute citation inserted!');
    } else if (sugg.id === 'sugg_2') {
      setParagraphs((prev) => [
        prev[0],
        prev[1],
        prev[2].replace(
          'I learned a lot',
          'I spearheaded weekly sprint cycles, boosting our autonomous odometry benchmark by 38%'
        ),
      ]);
      setAppliedSuggestionIds((prev) => [...prev, sugg.id]);
      showToast('Quantitative leadership metrics integrated!');
    }
  };

  const handleSaveDraft = () => {
    setSavedTime('Auto-saved just now');
    showToast('Draft encrypted and saved to personal vault.');
  };

  const handleExport = () => {
    const content = `${title}\nTarget: ${selectedUniv.name} (${selectedUniv.criteria[2] || 'UCAS 2025'})\nWord Count: ${wordCount} words\n\n${paragraphs.join('\n\n')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Maya_Chen_Statement_${selectedUniv.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported formatted personal statement text file!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to clear this draft? (A backup remains in history)')) {
      setParagraphs(['']);
      setTitle('Untitled Draft');
      showToast('Draft reset. You can type fresh text.');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white text-[13px] font-semibold py-2 px-4 rounded-xl shadow-lg border border-white/20 animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      <div className="px-4 flex flex-col gap-4 w-full max-w-xl mx-auto pt-2">
        {/* Studio Header & University Linker */}
        <div className="flex flex-col gap-2.5">
          {/* Target University Dropdown */}
          <div className="flex items-center justify-between bg-surface-container-low rounded-2xl p-3 shadow-xs border border-[#e2e8f0]/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-secondary">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_balance
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Target Application
                </span>
                <div className="relative">
                  <select
                    value={selectedUnivId}
                    onChange={(e) => onSelectUnivId(e.target.value)}
                    className="font-bold text-[15px] text-on-surface bg-transparent appearance-none pr-6 cursor-pointer focus:outline-none"
                  >
                    {universities.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined text-outline text-[18px] absolute right-0 top-1 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex items-center">
              <span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold px-2.5 py-1 rounded-full">
                {selectedUniv.id === 'imperial' ? 'UCAS 2025' : selectedUniv.id === 'nus' ? 'MOE 2025' : 'Direct 2025'}
              </span>
            </div>
          </div>

          {/* Essay Type Selector Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'personal', label: 'Personal Statement', hasStar: true },
              { id: 'scholarship', label: 'Scholarship Essay', hasStar: false },
              { id: 'diversity', label: 'Diversity / Challenges', hasStar: false },
              { id: 'why_major', label: 'Why This Major', hasStar: false },
            ].map((tab) => {
              const isActive = essayType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setEssayType(tab.id as any)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-95 flex items-center gap-1.5 shadow-xs ${
                    isActive
                      ? 'bg-secondary text-white'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {tab.hasStar && (
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      stars
                    </span>
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Essay Editor Workspace Card */}
        <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-4 shadow-xs gap-3.5 border border-[#e2e8f0]/80">
          {/* Title Field */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-on-surface-variant font-medium">Draft Title</span>
              <div className="flex items-center gap-1 text-on-tertiary-container bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container" />
                <span className="text-[11px] font-bold">{savedTime}</span>
              </div>
            </div>
            <input
              className="font-bold text-[18px] text-on-surface bg-transparent focus:outline-none w-full pb-1 border-b border-transparent focus:border-secondary transition-colors placeholder:text-outline-variant"
              placeholder="Untitled Personal Statement"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Word Count & Progress Bar */}
          <div className="flex flex-col gap-1.5 bg-surface-container-low p-2.5 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">edit_note</span>
                <span className="text-[12px] text-on-surface font-bold">
                  {wordCount} / {maxWords} words
                </span>
                <span className="text-[10px] font-bold text-on-tertiary-container bg-tertiary-fixed/40 px-1.5 py-0.5 rounded">
                  Optimal Range
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant font-semibold">
                {wordPct}% filled
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-secondary h-full rounded-full transition-all duration-500"
                style={{ width: `${wordPct}%` }}
              />
            </div>
          </div>

          {/* Rich Annotated Editor View */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between pb-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-outline uppercase tracking-wider font-bold">
                  {isEditingRaw ? 'Direct Text Editor' : 'Editor & AI Annotations'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (isEditingRaw) {
                      const updated = rawText.split('\n\n').filter(Boolean);
                      setParagraphs(updated.length > 0 ? updated : [rawText]);
                      if (onUpdateContent) onUpdateContent(rawText);
                      setSavedTime('Auto-saved just now');
                      showToast('Essay updated & admissions rubric recalculated.');
                    } else {
                      setRawText(paragraphs.join('\n\n'));
                    }
                    setIsEditingRaw((prev) => !prev);
                  }}
                  className="px-2 py-0.5 rounded-md bg-surface-container-high hover:bg-surface-container-highest text-secondary text-[11px] font-bold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isEditingRaw ? 'check' : 'edit_document'}
                  </span>
                  <span>{isEditingRaw ? 'Analyze Draft' : 'Paste / Edit Text'}</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-secondary" /> Suggestion
                </span>
                <span className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" /> High Impact
                </span>
              </div>
            </div>

            {/* Annotated Content or Raw Editor */}
            {isEditingRaw ? (
              <div className="flex flex-col gap-2 bg-surface-bright p-3.5 rounded-xl border border-[#e2e8f0]/60">
                <textarea
                  rows={10}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste or edit your essay draft here..."
                  className="w-full bg-transparent text-[14px] leading-relaxed text-on-surface focus:outline-none resize-none font-sans"
                />
                <div className="flex justify-between items-center pt-2 border-t border-[#e2e8f0]/60 text-[11px] text-on-surface-variant">
                  <span>{rawText.trim() ? rawText.trim().split(/\s+/).length : 0} words</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = rawText.split('\n\n').filter(Boolean);
                      setParagraphs(updated.length > 0 ? updated : [rawText]);
                      if (onUpdateContent) onUpdateContent(rawText);
                      setIsEditingRaw(false);
                      setSavedTime('Auto-saved just now');
                      showToast('Essay updated & admissions rubric recalculated.');
                    }}
                    className="py-1 px-3 rounded-lg bg-secondary text-white font-bold text-[12px] hover:bg-secondary/90 transition-colors shadow-xs"
                  >
                    Done Editing & Analyze
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-[14px] text-on-surface leading-relaxed flex flex-col gap-3 bg-surface-bright p-3.5 rounded-xl border border-[#e2e8f0]/60">
                {paragraphs.map((para, pIdx) => {
                  // For the first paragraph
                  if (pIdx === 0 && para.includes('isolated the corrupted pointer')) {
                    return (
                      <p key={pIdx}>
                        At 2:00 AM on the eve of the regional VEX Robotics final, our autonomous navigation sequence suffered a catastrophic heap overflow.{' '}
                        <span
                          onClick={() =>
                            setActiveSuggestion({
                              id: 'voice_1',
                              type: 'suggestion',
                              title: 'Sensory Lead',
                              tag: 'High Voice',
                              description: 'Sensory hook establishing technical poise under real tournament pressure.',
                              text: 'While my team considered reverting to manual override, I isolated the corrupted pointer in our sensory loop',
                            })
                          }
                          className="bg-secondary-fixed/50 text-on-secondary-fixed font-semibold px-1 py-0.5 rounded cursor-pointer transition-colors hover:bg-secondary-fixed"
                          title="AI Voice: Highly vivid sensory opening"
                        >
                          While my team considered reverting to manual override, I isolated the corrupted pointer in our sensory loop
                        </span>
                        , realizing our odometry readings had saturated the microcontroller’s buffer. That midnight epiphany wasn’t merely about resolving a memory leak; it revealed the breathtaking symmetry between logical elegance and physical motion.
                      </p>
                    );
                  }

                  // For paragraph with mentoring
                  if (para.includes('access to computational thinking transforms confidence')) {
                    return (
                      <p key={pIdx}>
                        <span
                          onClick={() =>
                            setActiveSuggestion({
                              id: 'impact_1',
                              type: 'impact',
                              title: 'Academic Resilience & Outreach',
                              tag: 'Standout Strength',
                              description: 'Demonstrates community leadership grounded in foundational computational thinking.',
                              text: 'Through two years of mentoring junior coders across inner-city schools, I saw firsthand that access to computational thinking transforms confidence.',
                            })
                          }
                          className="bg-tertiary-fixed/60 text-on-tertiary-fixed font-semibold px-1 py-0.5 rounded cursor-pointer hover:bg-tertiary-fixed transition-colors"
                          title="AI Impact: Shows deep academic resilience"
                        >
                          Through two years of mentoring junior coders across inner-city schools, I saw firsthand that access to computational thinking transforms confidence.
                        </span>{' '}
                        However, I realized foundational theory must meet scalable systems.
                      </p>
                    );
                  }

                  // For paragraph with concurrent / target university
                  if (para.includes('concurrent algorithmic architecture') || para.includes('robotics society')) {
                    return (
                      <p key={pIdx}>
                        <span
                          onClick={() => setActiveSuggestion(ESSAY_SUGGESTIONS[0])}
                          className={`border-b font-medium px-1 py-0.5 rounded cursor-pointer transition-colors ${
                            appliedSuggestionIds.includes('sugg_1')
                              ? 'bg-tertiary-fixed/30 text-on-surface border-tertiary-fixed-dim'
                              : 'bg-secondary-fixed/60 text-on-secondary-fixed border-secondary hover:bg-secondary-fixed'
                          }`}
                          title={`AI Suggestion: Paragraph ${pIdx + 1} needs stronger tie-in to target faculty`}
                        >
                          {para.includes("Imperial's Department of Computing")
                            ? "My interest in concurrent algorithmic architecture drives my goal to join Imperial's Department of Computing, where I hope to conduct undergraduate research alongside faculty at the Imperial Data Science Institute."
                            : 'My interest in concurrent algorithmic architecture drives my goal to study Computing at my target institution.'}
                        </span>{' '}
                        In our robotics society,{' '}
                        <span
                          onClick={() => setActiveSuggestion(ESSAY_SUGGESTIONS[1])}
                          className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${
                            appliedSuggestionIds.includes('sugg_2')
                              ? 'bg-tertiary-fixed/30 font-medium'
                              : 'bg-secondary-fixed/40 text-on-surface hover:bg-secondary-fixed'
                          }`}
                          title="AI Suggestion: Replace 'I learned a lot' with measurable workshop outcomes"
                        >
                          {para.includes('spearheaded weekly sprint cycles')
                            ? 'I spearheaded weekly sprint cycles, boosting our autonomous odometry benchmark by 38%'
                            : 'I learned a lot'}
                        </span>{' '}
                        about directing twenty peers under tight development cycles.
                      </p>
                    );
                  }

                  // Default custom paragraph
                  return (
                    <p key={pIdx}>
                      {para}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Active Annotation Inspection Box */}
            {activeSuggestion && (
              <div className="bg-surface-container-high/60 rounded-xl p-3 flex flex-col gap-2 border border-secondary/30 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                    {activeSuggestion.title}
                  </span>
                  <button
                    onClick={() => setActiveSuggestion(null)}
                    className="text-[11px] text-on-surface-variant hover:text-on-surface"
                  >
                    Dismiss
                  </button>
                </div>
                <p className="text-[12px] text-on-surface-variant leading-snug">
                  {activeSuggestion.description}
                </p>
                {activeSuggestion.actionLabel && (
                  <button
                    onClick={() => {
                      handleApplySuggestion(activeSuggestion);
                      setActiveSuggestion(null);
                    }}
                    className="self-end py-1 px-3 rounded-lg bg-secondary text-white text-[11px] font-semibold hover:bg-secondary/90 transition-colors shadow-xs"
                  >
                    Apply Suggestion
                  </button>
                )}
              </div>
            )}

            {/* Privacy Guarantee */}
            <div className="flex items-center gap-2 bg-surface-container-high/60 px-3 py-2 rounded-xl mt-1">
              <span
                className="material-symbols-outlined text-secondary text-[18px] shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield
              </span>
              <span className="text-[11px] text-on-surface-variant leading-tight">
                <strong className="font-semibold text-on-surface">100% Private & Confidential:</strong> Essays are stored in your encrypted vault and never used to train public models or submitted automatically.
              </span>
            </div>
          </div>
        </div>

        {/* AI Real-Time Feedback Diagnostic Panel */}
        <div className="flex flex-col bg-surface-container-lowest rounded-2xl p-4 shadow-xs gap-3.5 border border-[#e2e8f0]/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-[16px] text-on-surface">Admissions Intelligence</h2>
                <span className="text-[11px] text-on-surface-variant">Holistic UCAS Rubric Analysis</span>
              </div>
            </div>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[12px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Strong Tier
            </span>
          </div>

          {/* Metric Rings Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2.5 p-2.5 bg-surface-container-low rounded-xl">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-surface-container-highest"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <circle
                    className="text-on-tertiary-container"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeDasharray="125.6"
                    strokeDashoffset="2.5"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
                <span className="absolute text-[13px] font-bold text-on-surface">98</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-on-surface-variant">Grammar & Polish</span>
                <span className="font-bold text-[15px] text-on-surface">98/100</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-surface-container-low rounded-xl">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-surface-container-highest"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <circle
                    className="text-secondary"
                    cx="24"
                    cy="24"
                    fill="transparent"
                    r="20"
                    stroke="currentColor"
                    strokeDasharray="125.6"
                    strokeDashoffset="10"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
                <span className="absolute text-[13px] font-bold text-on-surface">92</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] text-on-surface-variant">Personal Voice</span>
                <span className="font-bold text-[15px] text-on-surface">Authentic</span>
              </div>
            </div>
          </div>

          {/* Authenticity Commentary */}
          <div className="bg-surface-container-high/40 rounded-xl p-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-secondary">
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                forum
              </span>
              <span className="text-[12px] font-bold">Narrative Voice Assessment</span>
            </div>
            <p className="text-[13px] text-on-surface leading-normal">
              “Strong personal narrative. Your opening about debugging your high school robotics tournament code feels genuine and grounded rather than theatrical.”
            </p>
          </div>

          {/* Standout Strengths */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-outline uppercase tracking-wider font-bold">
              Standout Strengths
            </span>
            <div className="flex flex-wrap gap-1.5">
              <div className="inline-flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface text-[12px] font-semibold">
                <span className="material-symbols-outlined text-on-tertiary-container text-[14px]">check_circle</span>
                Analytical Rigor
              </div>
              <div className="inline-flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface text-[12px] font-semibold">
                <span className="material-symbols-outlined text-on-tertiary-container text-[14px]">check_circle</span>
                Resilience through Failure
              </div>
              <div className="inline-flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface text-[12px] font-semibold">
                <span className="material-symbols-outlined text-on-tertiary-container text-[14px]">check_circle</span>
                Community Mentorship
              </div>
            </div>
          </div>

          {/* High-Impact Refinements */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] text-outline uppercase tracking-wider font-bold">
              High-Impact Refinements ({ESSAY_SUGGESTIONS.length})
            </span>

            {/* Suggestion Card 1 */}
            <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5 border border-[#e2e8f0]/80">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">lightbulb</span>
                  Paragraph 3 • Target College Alignment
                </span>
                <span className="text-[11px] text-on-surface-variant font-semibold">+4% Match</span>
              </div>
              <p className="text-[12px] text-on-surface leading-snug">
                Connect your algorithmic interest more explicitly to <strong className="font-semibold text-secondary">Imperial's DoC Computing Society</strong> and specific labs (e.g. <span className="font-semibold text-on-surface">Imperial Data Science Institute</span>).
              </p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleApplySuggestion(ESSAY_SUGGESTIONS[0])}
                  className="bg-surface-container-highest hover:bg-surface-variant text-on-surface text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[13px]">add_link</span>
                  {appliedSuggestionIds.includes('sugg_1') ? 'Citation Inserted' : 'Insert Imperial Citation'}
                </button>
              </div>
            </div>

            {/* Suggestion Card 2 */}
            <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5 border border-[#e2e8f0]/80">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  Paragraph 4 • Show, Don't Tell
                </span>
                <span className="text-[11px] text-on-surface-variant font-semibold">Clarity</span>
              </div>
              <p className="text-[12px] text-on-surface leading-snug">
                Replace passive phrasing <em className="text-on-surface-variant font-serif">“I learned a lot”</em> with specific metrics from the workshop you organized (e.g., number of students mentored, completion rate).
              </p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleApplySuggestion(ESSAY_SUGGESTIONS[1])}
                  className="bg-surface-container-highest hover:bg-surface-variant text-on-surface text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[13px]">auto_fix_high</span>
                  {appliedSuggestionIds.includes('sugg_2') ? 'Rewrite Applied' : 'Review Contextual Rewrite'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Studio Control Actions */}
        <div className="flex flex-col gap-2.5">
          {/* Primary AI Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* AI Critique Button */}
            <button
              onClick={() => setCritiqueModalOpen(true)}
              className="flex items-center justify-center gap-2 h-12 rounded-xl bg-surface-container-high text-on-surface font-bold text-[13px] shadow-xs hover:bg-surface-container-highest transition-all active:scale-[0.98] border border-[#e2e8f0]"
            >
              <span className="material-symbols-outlined text-secondary text-[20px]">psychology_alt</span>
              <span>AI Critique (No Rewrite)</span>
            </button>
            {/* Improve Draft Button */}
            <button
              onClick={() => setRewriteModalOpen(true)}
              className="flex items-center justify-center gap-2 h-12 rounded-xl bg-secondary text-white font-bold text-[13px] shadow-md hover:bg-secondary-container transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
              <span>Improve Draft (Preserve Voice)</span>
            </button>
          </div>

          {/* Secondary Utility Row */}
          <div className="flex items-center justify-between pt-1 px-1">
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant hover:text-on-surface transition-colors py-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
              <span>Save Draft</span>
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant hover:text-on-surface transition-colors py-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
                <span>Export PDF/Doc</span>
              </button>
              <button
                aria-label="Delete Draft"
                onClick={handleDelete}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-error hover:text-on-error-container transition-colors py-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">delete_outline</span>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Critique Modal */}
      {critiqueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-3.5 border border-[#e2e8f0]">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">psychology_alt</span>
                <h3 className="font-bold text-[16px] text-on-surface">Admissions Rubric Critique</h3>
              </div>
              <button
                onClick={() => setCritiqueModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-2.5 text-[13px] text-on-surface leading-relaxed">
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="font-bold text-secondary block">1. Hook & Authenticity (9.4 / 10)</span>
                Opening directly with the 2:00 AM VEX robotics memory leak establishes credible computational grounding without falling into the "Ever since I was five" cliché.
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="font-bold text-secondary block">2. Institutional Alignment (8.8 / 10)</span>
                Linking distributed concurrent systems to Imperial Computing demonstrates genuine syllabus familiarity.
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="font-bold text-secondary block">3. Quantitative Metrics (8.6 / 10)</span>
                Highlighting the workshop student reach reinforces high personal initiative.
              </div>
            </div>
            <button
              onClick={() => setCritiqueModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-secondary text-white font-semibold text-[13px]"
            >
              Close Rubric
            </button>
          </div>
        </div>
      )}

      {/* Improve Draft Modal */}
      {rewriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-3.5 border border-[#e2e8f0]">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">auto_fix_high</span>
                <h3 className="font-bold text-[16px] text-on-surface">Voice-Preserving Enhancement</h3>
              </div>
              <button
                onClick={() => setRewriteModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-[12px] text-on-surface-variant leading-relaxed">
              We identified 2 optimizations to strengthen your UCAS match score while strictly preserving your authentic first-person narrative voice.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1.5 border border-[#e2e8f0]">
              <span className="text-[11px] font-bold text-secondary uppercase">Proposed Enhancement</span>
              <p className="text-[12px] text-on-surface italic">
                “My interest in concurrent algorithmic architecture and real-time distributed computation drives my goal to join Imperial's Department of Computing. Spearheading twelve weekly sprint cycles for our twenty-member society, I boosted our autonomous odometry benchmark by 38%.”
              </p>
            </div>
            <div className="flex justify-between items-center gap-2 pt-1">
              <button
                onClick={() => setRewriteModalOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-[#e2e8f0] text-on-surface-variant font-semibold text-[12px]"
              >
                Keep Current
              </button>
              <button
                onClick={() => {
                  handleApplySuggestion(ESSAY_SUGGESTIONS[0]);
                  handleApplySuggestion(ESSAY_SUGGESTIONS[1]);
                  setRewriteModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-secondary text-white font-semibold text-[12px] shadow-sm hover:bg-secondary/90"
              >
                Accept All Enhancements
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
