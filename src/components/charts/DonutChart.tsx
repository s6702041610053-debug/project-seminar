import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showLabel?: boolean;
}

export default function DonutChart({
  data,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
  showLegend = true,
  showLabel = true,
}: DonutChartProps) {
  const renderLabel = ({ name, percent }: { name: string; percent: number }) => {
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          dataKey="value"
          label={showLabel ? renderLabel : undefined}
          labelLine={showLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [value, '']}
          contentStyle={{ borderRadius: '10px', border: '1px solid #e5e7eb', fontFamily: 'Noto Sans Thai' }}
        />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontFamily: 'Noto Sans Thai', fontSize: '13px' }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
