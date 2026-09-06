import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  bars: { key: string; color: string; name: string; stackId?: string; radius?: number }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  layout?: 'horizontal' | 'vertical';
  yDomain?: [number, number];
}

export default function BarChartComponent({
  data,
  xKey,
  bars,
  height = 300,
  showGrid = true,
  showLegend = true,
  layout = 'horizontal',
  yDomain,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={layout === 'vertical' ? 'vertical' : 'horizontal'}
        margin={{ top: 10, right: 30, left: layout === 'vertical' ? 80 : 0, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        {layout === 'vertical' ? (
          <>
            <XAxis type="number" tick={{ fontSize: 12, fontFamily: 'Noto Sans Thai' }} />
            <YAxis dataKey={xKey} type="category" tick={{ fontSize: 12, fontFamily: 'Noto Sans Thai' }} width={120} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tick={{ fontSize: 12, fontFamily: 'Noto Sans Thai' }} />
            <YAxis domain={yDomain} tick={{ fontSize: 12, fontFamily: 'Noto Sans Thai' }} />
          </>
        )}
        <Tooltip
          contentStyle={{ borderRadius: '10px', border: '1px solid #e5e7eb', fontFamily: 'Noto Sans Thai' }}
        />
        {showLegend && (
          <Legend
            verticalAlign="bottom"
            iconType="rect"
            wrapperStyle={{ fontFamily: 'Noto Sans Thai', fontSize: '13px' }}
          />
        )}
        {bars.map((bar) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            fill={bar.color}
            name={bar.name}
            stackId={bar.stackId}
            radius={bar.radius !== undefined ? [bar.radius, bar.radius, 0, 0] : undefined}
            maxBarSize={50}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
