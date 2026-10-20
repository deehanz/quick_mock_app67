import React, { useState } from 'react';
import { StudentProfile, University } from '../types';

interface CounselorTabProps {
  profile: StudentProfile;
  universities: University[];
  onSelectUniversity: (univ: University) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedUnivId?: string;
}

export const CounselorTab: React.FC<CounselorTabProps> = ({
  profile,
  universities,
  onSelectUniversity,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello Maya! I've loaded your profile (3.92 GPA, predicted 41/45 IB, with Math AA HL & Physics HL). With your strong algorithmic and analytical focus, you are in prime shape for Imperial Computing (DoC) and NUS School of Computing. What strategic admission or scholarship questions can I assist you with today?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const presetQuestions = [
    'How do my chances at Imperial compare to NUS?',
    'Will my $25k-$40k budget cover London living costs?',
    'Should I prepare for the TMUA or STEP tests?',
    'What are the service bond requirements for Singapore MOE?',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let targetUnivId: string | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('imperial') || lower.includes('tmua') || lower.includes('step')) {
        reply = `For Imperial College Computing (G400), your predicted 7 in Math AA HL meets the prerequisite. The key differentiator is the TMUA (Test of Mathematics for University Admission). Scoring in the top 15% on TMUA combined with your autonomous robotics experience makes your application a Tier-1 candidate. For finance, keep in mind London living expenses exceed £15,000/yr, so applying for the President's Undergraduate Scholarship is crucial.`;
        targetUnivId = 'imperial';
      } else if (lower.includes('nus') || lower.includes('singapore') || lower.includes('moe')) {
        reply = `NUS School of Computing is your highest compatibility match (96% Sync). Tuition under the Singapore MOE Tuition Grant drops to ~US$13,400/yr, comfortably beneath your $40,000 ceiling. The trade-off is a 3-year post-graduation employment bond within Singaporean entities—which tech graduates typically celebrate due to Singapore's high mean starting tech salaries (S$5,400/month).`;
        targetUnivId = 'nus';
      } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('living')) {
        reply = `Under your $25,000–$40,000 USD/year target: NUS with MOE grant is ~US$13,400 tuition plus ~US$10,000 living, fitting perfectly at ~$23,400 total. Georgia Tech is ~$33,800 tuition. For Imperial (£39,100) and Toronto (CAD $60,500), winning full-ride merit awards like the Lester B. Pearson or President's award is required to stay within budget.`;
      } else {
        reply = `That is an excellent consideration for your admissions portfolio. Given your high analytical reasoning (94%) and programming contest profile, admissions committees will look for concrete evidence of how you tackle unsolved problems. Ensure your personal statement emphasizes real technical constraints (like your memory leak fix) rather than generic enthusiasm.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedUnivId: targetUnivId,
        },
      ]);
      setIsTyping(false);
    }, 750);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-2 max-w-xl mx-auto">
      {/* Counselor Profile Header */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-[#e2e8f0]/80 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-[16px] text-on-surface">UniMatch AI Strategic Counselor</h2>
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
            </div>
            <p className="text-[12px] text-on-surface-variant">Advising Maya Chen (Class of ’25 • IB 41)</p>
          </div>
        </div>
        <span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold px-2 py-0.5 rounded-full">
          24/7 Active
        </span>
      </div>

      {/* Preset question pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface text-[12px] font-medium border border-[#e2e8f0] transition-colors active:scale-95 text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div className="flex flex-col gap-3 min-h-[360px] max-h-[55vh] overflow-y-auto no-scrollbar p-1 mb-3">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          const suggestedUniv = m.suggestedUnivId
            ? universities.find((u) => u.id === m.suggestedUnivId)
            : null;

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 max-w-[88%] ${
                isUser ? 'self-end' : 'self-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-secondary text-white rounded-tr-xs'
                    : 'bg-surface-container-lowest text-on-surface border border-[#e2e8f0]/80 rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>

              {suggestedUniv && (
                <div
                  onClick={() => onSelectUniversity(suggestedUniv)}
                  className="bg-surface-container-low hover:bg-surface-container rounded-xl p-2.5 border border-secondary/30 flex items-center justify-between gap-3 cursor-pointer transition-colors w-full mt-1"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={suggestedUniv.image}
                      alt={suggestedUniv.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-[12px] text-on-surface truncate">
                        {suggestedUniv.name}
                      </span>
                      <span className="text-[11px] text-secondary font-semibold">
                        {suggestedUniv.syncScore}% Compatibility
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-secondary flex items-center">
                    Inspect
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </span>
                </div>
              )}

              <span className="text-[10px] text-outline px-1">{m.timestamp}</span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-2 rounded-full self-start text-[12px] text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce delay-200" />
            <span>Counselor analyzing admission rubrics...</span>
          </div>
        )}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 bg-surface-container-lowest rounded-full p-1.5 shadow-sm border border-[#e2e8f0]">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about essays, tests, scholarships, or universities..."
          className="flex-1 bg-transparent px-4 text-[13px] text-on-surface focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputVal.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            inputVal.trim()
              ? 'bg-secondary text-white hover:bg-secondary/90 shadow-xs'
              : 'bg-surface-container text-outline opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
        </button>
      </div>
    </div>
  );
};
