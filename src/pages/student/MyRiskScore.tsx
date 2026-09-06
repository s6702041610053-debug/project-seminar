import React, { useMemo } from 'react';
import { getStudentRiskScore, getStudentWeeklyScores } from '../../data/mockData';
import { RISK_LEVEL_INFO } from '../../utils/calculations';
import LineChartComponent from '../../components/charts/LineChart';
import { ShieldAlert, AlertTriangle, Info } from 'lucide-react';

const GaugeChart = ({ value, size = 200 }: { value: number; size?: number }) => {
  const percentage = value / 100;
  const angle = percentage * 180;
  const color = value <= 30 ? '#22C55E' : value <= 60 ? '#F97316' : '#EF4444';
  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2;
  
  const startAngle = Math.PI;
  const endAngle = startAngle - (angle * Math.PI / 180);
  const endX = centerX + radius * Math.cos(endAngle);
  const endY = centerY - radius * Math.sin(endAngle);
  const largeArc = angle > 180 ? 1 : 0;
  
  return (
    <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
      <path d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`} fill="none" stroke="#e5e7eb" strokeWidth="16" strokeLinecap="round" />
      <path d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`} fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" />
      <text x={centerX} y={centerY - 10} textAnchor="middle" className="text-3xl font-bold" fill={color}>{value.toFixed(1)}</text>
      <text x={centerX} y={centerY + 15} textAnchor="middle" className="text-sm" fill="#6b7280">/100</text>
    </svg>
  );
};

const MyRiskScore = () => {
  const studentId = 's6501001';
  const riskData = getStudentRiskScore(studentId);
  const weeklyScores = getStudentWeeklyScores(studentId);
  
  const totalRiskScore = riskData?.totalScore || 25;
  const riskLevel = totalRiskScore <= 30 ? 'low' : totalRiskScore <= 60 ? 'medium' : 'high';
  const riskInfo = RISK_LEVEL_INFO[riskLevel];
  
  const chartData = useMemo(() => {
    // Generate some mock historical risk scores based on weekly scores
    const history = weeklyScores.map((w, i) => {
      // Inversely proportional to score for mockup
      return Math.max(10, 100 - w.score + (Math.random() * 10 - 5));
    });
    
    return {
      labels: weeklyScores.map(w => `W${w.week}`),
      datasets: [
        {
          label: 'คะแนนความเสี่ยง',
          data: history,
          borderColor: '#EF4444',
          backgroundColor: '#EF4444',
        }
      ]
    };
  }, [weeklyScores]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">การประเมินความเสี่ยง</h1>
        <p className="text-gray-500">My Risk Assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4">ระดับความเสี่ยงปัจจุบัน</h3>
          <GaugeChart value={totalRiskScore} />
          
          <div className={`mt-4 px-6 py-2 rounded-full inline-flex items-center gap-2 ${riskInfo.color} ${riskInfo.bgColor}`}>
            {riskLevel === 'high' ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <span className="font-bold text-lg">{riskInfo.label}</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 max-w-xs">
            คะแนนความเสี่ยงต่ำแสดงถึงการดำเนินงานที่เป็นไปตามแผนและไม่มีปัญหาที่น่ากังวล
          </p>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">แนวโน้มความเสี่ยง</h3>
          <div className="h-64">
            <LineChartComponent data={chartData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">องค์ประกอบความเสี่ยง</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">ความก้าวหน้ารายสัปดาห์ (40%)</span>
                <span className="text-gray-900 font-bold">12/40</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">การนำเสนอ (30%)</span>
                <span className="text-gray-900 font-bold">8/30</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '26%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">การส่งงานตรงเวลา (15%)</span>
                <span className="text-gray-900 font-bold">2/15</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">คุณภาพเนื้อหา (10%)</span>
                <span className="text-gray-900 font-bold">2/10</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">การสื่อสารกับที่ปรึกษา (5%)</span>
                <span className="text-gray-900 font-bold">1/5</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            คำแนะนำสำหรับคุณ
          </h3>
          <div className="bg-blue-50 rounded-lg p-4 text-blue-800 text-sm leading-relaxed">
            <ul className="list-disc pl-5 space-y-2">
              <li>รักษามาตรฐานการทำงานในระดับนี้ต่อไป</li>
              <li>เตรียมความพร้อมสำหรับการนำเสนอในครั้งถัดไปล่วงหน้า</li>
              <li>หากพบปัญหาในการทำโครงงาน ให้รีบปรึกษาอาจารย์ที่ปรึกษาทันที</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRiskScore;
