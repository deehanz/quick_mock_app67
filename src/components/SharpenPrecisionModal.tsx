import React, { useState } from 'react';

interface SharpenPrecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SharpenPrecisionModal: React.FC<SharpenPrecisionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const questions = [
    {
      title: 'Pedagogical Preference',
      question: 'Which course structure best unleashes your intellectual momentum?',
      options: [
        'Rigorous foundational math theory followed by systems engineering (Imperial / Cambridge style)',
        'Hands-on project sprints and collaborative open-source labs (NUS SoC style)',
        'Flexible cross-disciplinary exploration with double-major tracks (Toronto style)',
      ],
    },
    {
      title: 'Post-Graduation Horizon',
      question: 'Where do you see yourself 2 years after completing your undergraduate degree?',
      options: [
        'High-growth tech unicorn or quant hedge fund in London / Singapore',
        'Direct matriculation to an elite PhD research lab in Artificial Intelligence',
        'Founding a deep-tech startup utilizing venture builder programs like NUS NOC',
      ],
    },
    {
      title: 'Campus Life & Independence',
      question: 'What living and campus environment accelerates your best work?',
      options: [
        'Intimate urban college campus integrated into a dense global capital',
        'Expansive high-tech research campus with collegiate residential colleges',
        'Co-op alternating work terms in industry and campus labs',
      ],
    },
  ];

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: option }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      setTimeout(() => {
        onComplete();
        onClose();
        setIsCompleted(false);
        setCurrentStep(0);
      }, 1400);
    }
  };

  const progressPct = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-[#e2e8f0]">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-on-surface">Micro-Action: Sharpen Precision</h3>
              <p className="text-[12px] text-on-surface-variant">Question {currentStep + 1} of {questions.length}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Progress track */}
        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-secondary h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {isCompleted ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-3 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <h4 className="font-bold text-[18px] text-on-surface">Match Precision Boosted!</h4>
            <p className="text-[13px] text-on-surface-variant max-w-xs">
              +12% accuracy added to your AI Cognitive profile. Recommendation rankings updated.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                {questions[currentStep].title}
              </span>
              <p className="font-semibold text-[15px] text-on-surface mt-1 leading-snug">
                {questions[currentStep].question}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              {questions[currentStep].options.map((option, idx) => {
                const isSelected = answers[currentStep] === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className={`text-left p-3 rounded-xl border text-[13px] leading-relaxed transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-secondary bg-secondary-fixed/40 text-on-surface font-medium shadow-xs'
                        : 'border-[#e2e8f0] bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected
                          ? 'border-secondary bg-secondary text-white'
                          : 'border-outline-variant bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className={`text-[13px] font-semibold text-on-surface-variant py-2 px-3 rounded-lg ${
                  currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-surface-container'
                }`}
              >
                Previous
              </button>
              <button
                disabled={!answers[currentStep]}
                onClick={handleNext}
                className={`py-2 px-5 rounded-xl font-semibold text-[13px] transition-all shadow-sm ${
                  answers[currentStep]
                    ? 'bg-secondary text-white hover:bg-secondary/90 active:scale-95'
                    : 'bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed'
                }`}
              >
                {currentStep === questions.length - 1 ? 'Finish & Recalculate' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
