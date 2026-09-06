import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  lines: { key: string; color: string; name: string; strokeWidth?: number; dashed?: boolean }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  yDomain?: [number, number];
  xLabel?: string;
  yLabel?: string;
}

export default function LineChartComponent({
  data,
  xKey,
  lines,
  height = 300,
  showGrid = true,
  showLegend = true,
  yDomain,
  xLabel,
  yLabel,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12, fontFamily: 'Noto Sans Thai' }}
          label={xLabel ? { value: xLabel, position: 'insideBottom', offset: -5, style: { fontFamily: 'Noto Sans Thai' } } : undefined}
        />
        <YAxis
          domain={yDomain}
          tick={{ fontSize: 12, fontFamily: 'Noto Sans Thai' }}
          label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', style: { fontFamily: 'Noto Sans Thai' } } : undefined}
        />
        <Tooltip
          contentStyle={{ borderRadius: '10px', border: '1px solid #e5e7eb', fontFamily: 'Noto Sans Thai' }}
        />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            iconType="line"
            wrapperStyle={{ fontFamily: 'Noto Sans Thai', fontSize: '13px' }}
          />
        )}
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            name={line.name}
            strokeWidth={line.strokeWidth || 2}
            strokeDasharray={line.dashed ? '5 5' : undefined}
            dot={{ r: 4, fill: line.color }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
