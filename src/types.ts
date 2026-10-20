export interface Trait {
  id: string;
  name: string;
  score: number;
  scoreLabel: string;
  icon: string;
  description: string;
  progressColor?: string;
}

export interface Trajectory {
  id: string;
  number: string;
  title: string;
  synergy: string;
}

export interface University {
  id: string;
  name: string;
  faculty: string;
  location: string;
  globalRank: string;
  qsRank: string;
  campusArea: string;
  syncScore: number;
  matchType: 'strong' | 'good' | 'reach';
  matchLabel: string;
  netTuition: string;
  tuitionUnit: string;
  scholarshipNotice?: string;
  scholarshipNoticeType?: 'grant' | 'merit' | 'alert';
  fitIntelligence: string[];
  realityCheck?: string;
  criteria: string[];
  image: string;
  heroImage?: string;
  mapImage?: string;
  officialPortal: string;
  breakdown: {
    academic: number;
    career: number;
    budget: number;
    campus: number;
  };
  degreeMatch: string;
  department: string;
  duration: string;
  specializations: { name: string; icon: string }[];
  applicationWindow: string;
  academicBenchmarks: string;
  englishProficiency: string;
  moeGrantTuition?: string;
  nonSubsidizedTuition?: string;
  prequalifiedScholarships: {
    title: string;
    tag: string;
    desc: string;
  }[];
  advantages: string[];
  tradeoffs: string[];
  deadlineDate: string;
  applicationStage?: 'researching' | 'drafting' | 'submitted' | 'decision';
}

export interface StudentProfile {
  name: string;
  avatar: string;
  classYear: string;
  status: string;
  location: string;
  gpa: number;
  gpaMax: number;
  ibPredicted: number;
  ibMax: number;
  hlSubjects: string[];
  traits: Trait[];
  trajectories: Trajectory[];
  annualTuitionBudget: string;
  aidStatus: string;
  aidDescription: string;
  targetRegions: string[];
  campusStyle: { title: string; subtitle: string }[];
  instructionalMedium: string;
  exploreBlended: boolean;
}

export interface EssaySuggestion {
  id: string;
  type: 'suggestion' | 'impact';
  text: string;
  title: string;
  description: string;
  tag: string;
  actionLabel?: string;
  replacementText?: string;
}

export interface UserSession {
  name: string;
  email: string;
  curriculum: string;
  major: string;
  essayTitle: string;
  essayContent: string;
  targetUniversityId: string;
}

export type TabKey = 'matches' | 'profile' | 'counselor' | 'essays' | 'shortlist';

