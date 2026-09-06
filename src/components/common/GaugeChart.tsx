import React from 'react';

interface GaugeChartProps {
  value: number; // 0 to 100
  maxValue?: number;
  label?: string;
  size?: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ 
  value, 
  maxValue = 100, 
  label = 'Risk Score',
  size = 200 
}) => {
  const normalizedValue = Math.min(Math.max(value, 0), maxValue);
  const percentage = normalizedValue / maxValue;
  
  // Standard Risk Score logic as per prompt:
  // Green for 80-100 (Low risk)
  // Orange for 60-79 (Medium risk)
  // Red for below 60 (High risk)
  let color = '#EF4444'; // Red
  if (normalizedValue >= 80) color = '#22C55E'; // Green
  else if (normalizedValue >= 60) color = '#F97316'; // Orange

  // SVG parameters
  const strokeWidth = size * 0.12;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  
  // Semi-circle path (180 degrees)
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <div className="flex flex-col items-center justify-center font-sans" style={{ width: size }}>
      <div className="relative" style={{ height: size / 2 + 10 }}>
        <svg 
          width={size} 
          height={size / 2} 
          viewBox={`0 0 ${size} ${size / 2}`} 
          className="overflow-visible"
        >
          {/* Background track */}
          <path
            d={`M ${strokeWidth/2} ${cy} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${cy}`}
            fill="none"
            stroke="#F3F4F6"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Value track */}
          <path
            d={`M ${strokeWidth/2} ${cy} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center translate-y-1/2">
          <span className="text-3xl font-black tracking-tight" style={{ color }}>{normalizedValue}</span>
          <span className="text-sm font-bold text-gray-400 ml-1">/ {maxValue}</span>
        </div>
      </div>
      {label && <p className="text-sm text-gray-500 mt-8 font-bold">{label}</p>}
    </div>
  );
};

export default GaugeChart;
