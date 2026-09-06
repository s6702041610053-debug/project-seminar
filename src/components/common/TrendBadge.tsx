import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type Trend = 'improving' | 'stable' | 'declining';

interface TrendBadgeProps {
  trend: Trend;
  label?: string;
}

export const TrendBadge: React.FC<TrendBadgeProps> = ({ trend, label }) => {
  const styles = {
    improving: { color: 'text-green-700', bg: 'bg-green-100', icon: TrendingUp, defaultLabel: 'ดีขึ้น' },
    stable: { color: 'text-gray-700', bg: 'bg-gray-100', icon: Minus, defaultLabel: 'คงที่' },
    declining: { color: 'text-red-700', bg: 'bg-red-100', icon: TrendingDown, defaultLabel: 'ลดลง' },
  };

  const config = styles[trend];
  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold ${config.bg} ${config.color} font-sans`}>
      <Icon size={14} />
      <span>{displayLabel}</span>
    </div>
  );
};

export default TrendBadge;
