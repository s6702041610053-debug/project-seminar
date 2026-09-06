import {
  ScoreLevel, ScoreLevelInfo, TrendType, TrendInfo,
  RiskLevel, RiskScoreBreakdown, WeeklyScore, PresentationAssessment,
  PresentationLevelInfo
} from '../types';

// ==========================================
// SCORE LEVELS
// ==========================================

export const SCORE_LEVELS: ScoreLevelInfo[] = [
  { level: 'excellent', label: 'Excellent', labelTh: 'ดีมาก', color: '#22C55E', bgColor: 'bg-green-100', textColor: 'text-green-700', min: 85, max: 100, emoji: '🟢' },
  { level: 'good', label: 'Good', labelTh: 'ดี', color: '#EAB308', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', min: 70, max: 84, emoji: '🟡' },
  { level: 'needs_improvement', label: 'Needs Improvement', labelTh: 'ควรปรับปรุง', color: '#F97316', bgColor: 'bg-orange-100', textColor: 'text-orange-700', min: 60, max: 69, emoji: '🟠' },
  { level: 'needs_attention', label: 'Needs Attention', labelTh: 'ต้องติดตาม', color: '#EF4444', bgColor: 'bg-red-100', textColor: 'text-red-700', min: 0, max: 59, emoji: '🔴' },
];

export const PRESENTATION_LEVELS: PresentationLevelInfo[] = [
  { level: 'passed_excellent', label: 'Excellent', labelTh: 'ผ่านดีมาก', color: '#22C55E', bgColor: 'bg-green-100', textColor: 'text-green-700', min: 85, max: 100, emoji: '🟢' },
  { level: 'passed', label: 'Passed', labelTh: 'ผ่าน', color: '#EAB308', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', min: 70, max: 84, emoji: '🟡' },
  { level: 'passed_conditional', label: 'Conditional', labelTh: 'ผ่านแบบมีเงื่อนไข', color: '#F97316', bgColor: 'bg-orange-100', textColor: 'text-orange-700', min: 60, max: 69, emoji: '🟠' },
  { level: 'failed', label: 'Failed', labelTh: 'ไม่ผ่าน', color: '#EF4444', bgColor: 'bg-red-100', textColor: 'text-red-700', min: 0, max: 59, emoji: '🔴' },
];

export const TREND_INFO: Record<TrendType, TrendInfo> = {
  improving: { type: 'improving', label: 'Improving', labelTh: 'ดีขึ้น', icon: '↑', color: '#22C55E', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  stable: { type: 'stable', label: 'Stable', labelTh: 'คงที่', icon: '→', color: '#EAB308', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
  declining: { type: 'declining', label: 'Declining', labelTh: 'ลดลง', icon: '↓', color: '#EF4444', bgColor: 'bg-red-100', textColor: 'text-red-700' },
};

export const RISK_LEVEL_INFO: Record<RiskLevel, { label: string; labelTh: string; color: string; bgColor: string; textColor: string; borderColor: string; emoji: string }> = {
  low: { label: 'Low Risk', labelTh: 'ความเสี่ยงต่ำ', color: '#22C55E', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-300', emoji: '🟢' },
  medium: { label: 'Medium Risk', labelTh: 'ความเสี่ยงปานกลาง', color: '#F97316', bgColor: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-300', emoji: '🟡' },
  high: { label: 'High Risk', labelTh: 'ความเสี่ยงสูง', color: '#EF4444', bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-300', emoji: '🔴' },
};

// ==========================================
// CALCULATION FUNCTIONS
// ==========================================

/** Calculate weekly score percentage: score/30 × 100 */
export function calculateWeeklyPercentage(totalScore: number): number {
  return Math.round((totalScore / 30) * 100 * 100) / 100;
}

/** Calculate average weekly score from all weeks */
export function calculateWeeklyAverage(weeklyScores: WeeklyScore[]): number {
  if (weeklyScores.length === 0) return 0;
  const submitted = weeklyScores.filter(w => w.submissionStatus !== 'not_submitted');
  if (submitted.length === 0) return 0;
  const total = submitted.reduce((sum, w) => sum + w.percentage, 0);
  return Math.round((total / weeklyScores.length) * 100) / 100;
}

/** Calculate presentation score percentage: score/25 × 100 */
export function calculatePresentationPercentage(totalScore: number): number {
  return Math.round((totalScore / 25) * 100 * 100) / 100;
}

/** Calculate average presentation score from all assessments */
export function calculatePresentationAverage(assessments: PresentationAssessment[]): number {
  const assessed = assessments.filter(a => a.status !== 'not_assessed');
  if (assessed.length === 0) return 0;
  const total = assessed.reduce((sum, a) => sum + a.percentage, 0);
  return Math.round((total / assessed.length) * 100) / 100;
}

/** Calculate Risk Score using weighted formula */
export function calculateRiskScore(breakdown: RiskScoreBreakdown): number {
  const score =
    breakdown.weeklyScore * 0.40 +
    breakdown.presentationScore * 0.30 +
    breakdown.submissionScore * 0.15 +
    breakdown.contentScore * 0.10 +
    breakdown.communicationScore * 0.05;
  return Math.round(score * 100) / 100;
}

/** Get score level from percentage */
export function getScoreLevel(percentage: number): ScoreLevelInfo {
  for (const level of SCORE_LEVELS) {
    if (percentage >= level.min && percentage <= level.max) return level;
  }
  return SCORE_LEVELS[SCORE_LEVELS.length - 1];
}

/** Get presentation level from percentage */
export function getPresentationLevel(percentage: number): PresentationLevelInfo {
  for (const level of PRESENTATION_LEVELS) {
    if (percentage >= level.min && percentage <= level.max) return level;
  }
  return PRESENTATION_LEVELS[PRESENTATION_LEVELS.length - 1];
}

/** Get risk level from score */
export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return 'low';
  if (score >= 60) return 'medium';
  return 'high';
}

/** Increase risk level by one step */
export function increaseRiskLevel(current: RiskLevel): RiskLevel {
  if (current === 'low') return 'medium';
  return 'high';
}

// ==========================================
// TREND ANALYSIS
// ==========================================

/** Analyze trend from a series of scores */
export function analyzeTrend(scores: number[]): TrendType {
  if (scores.length < 3) return 'stable';

  // Check last available scores
  const recent = scores.slice(-6);

  // Count consecutive increases
  let consecutiveIncrease = 0;
  let consecutiveDecrease = 0;
  let maxConsecutiveIncrease = 0;
  let maxConsecutiveDecrease = 0;

  for (let i = 1; i < recent.length; i++) {
    if (recent[i] > recent[i - 1]) {
      consecutiveIncrease++;
      consecutiveDecrease = 0;
    } else if (recent[i] < recent[i - 1]) {
      consecutiveDecrease++;
      consecutiveIncrease = 0;
    } else {
      consecutiveIncrease = 0;
      consecutiveDecrease = 0;
    }
    maxConsecutiveIncrease = Math.max(maxConsecutiveIncrease, consecutiveIncrease);
    maxConsecutiveDecrease = Math.max(maxConsecutiveDecrease, consecutiveDecrease);
  }

  if (maxConsecutiveIncrease >= 3) return 'improving';
  if (maxConsecutiveDecrease >= 3) return 'declining';

  // Check if within ±5% variance → stable
  const avg = recent.reduce((s, v) => s + v, 0) / recent.length;
  const allWithin5 = recent.every(v => Math.abs(v - avg) <= 5);
  if (allWithin5) return 'stable';

  // Default: check overall direction
  const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
  const secondHalf = recent.slice(Math.floor(recent.length / 2));
  const firstAvg = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length;

  if (secondAvg > firstAvg + 3) return 'improving';
  if (secondAvg < firstAvg - 3) return 'declining';
  return 'stable';
}

// ==========================================
// RULE-BASED ANALYTICS
// ==========================================

export interface RuleCheckInput {
  notSubmittedCount: number;
  consecutiveDeclineWeeks: number;
  failedPresentations: number;
  hasUnaddressedFeedback: boolean;
}

/** Apply rule-based analytics to adjust risk level */
export function applyRiskRules(
  calculatedLevel: RiskLevel,
  input: RuleCheckInput
): { finalLevel: RiskLevel; appliedRules: string[] } {
  let level = calculatedLevel;
  const appliedRules: string[] = [];

  // Rule 1: ≥3 missed submissions
  if (input.notSubmittedCount >= 3) {
    level = increaseRiskLevel(level);
    appliedRules.push(`ไม่ส่งงาน ${input.notSubmittedCount} ครั้ง`);
  }

  // Rule 2: ≥3 consecutive weeks of declining scores
  if (input.consecutiveDeclineWeeks >= 3) {
    level = increaseRiskLevel(level);
    appliedRules.push(`คะแนนลดลง ${input.consecutiveDeclineWeeks} สัปดาห์ติดต่อกัน`);
  }

  // Rule 3: ≥2 failed presentations
  if (input.failedPresentations >= 2) {
    level = increaseRiskLevel(level);
    appliedRules.push(`Presentation ไม่ผ่าน ${input.failedPresentations} ครั้ง`);
  }

  // Rule 4: Unaddressed feedback
  if (input.hasUnaddressedFeedback) {
    level = increaseRiskLevel(level);
    appliedRules.push('ไม่แก้ไขงานตาม Feedback');
  }

  return { finalLevel: level, appliedRules };
}

/** Count consecutive declining weeks */
export function countConsecutiveDecline(scores: number[]): number {
  let maxDecline = 0;
  let currentDecline = 0;

  for (let i = 1; i < scores.length; i++) {
    if (scores[i] < scores[i - 1]) {
      currentDecline++;
      maxDecline = Math.max(maxDecline, currentDecline);
    } else {
      currentDecline = 0;
    }
  }
  return maxDecline;
}

// ==========================================
// RECOMMENDATION ENGINE
// ==========================================

export function generateRecommendation(
  riskLevel: RiskLevel,
  trend: TrendType,
  lateSubmissions: number,
  appliedRules: string[]
): string {
  const parts: string[] = [];

  // Risk-based recommendations
  if (riskLevel === 'low') {
    parts.push('นักศึกษามีความก้าวหน้าที่ดี ควรรักษามาตรฐานการดำเนินงานอย่างต่อเนื่อง');
  } else if (riskLevel === 'medium') {
    parts.push('ควรติดตามความก้าวหน้าอย่างใกล้ชิด และให้คำแนะนำเพิ่มเติม');
  } else {
    parts.push('ควรนัดติดตามนักศึกษาโดยเร็ว ตรวจสอบปัญหาการดำเนินโครงงาน และจัดทำแผนช่วยเหลือ');
  }

  // Trend-based
  if (trend === 'declining') {
    parts.push('คะแนนลดลงต่อเนื่อง ควรตรวจสอบสาเหตุและให้คำแนะนำเพิ่มเติม');
  }

  // Submission-based
  if (lateSubmissions >= 3) {
    parts.push('นักศึกษามีประวัติส่งงานล่าช้า ควรติดตามกำหนดส่งและแจ้งเตือน');
  }

  return parts.join(' | ');
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatScore(value: number, max: number): string {
  return `${value}/${max}`;
}
