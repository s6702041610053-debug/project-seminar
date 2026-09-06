import React, { useMemo } from 'react';
import { getStudentPresentations } from '../../data/mockData';
import { calculatePresentationAverage, getPresentationLevel, PRESENTATION_LEVELS } from '../../utils/calculations';
import LineChartComponent from '../../components/charts/LineChart';
import { Mic, Award, Star, BarChart2 } from 'lucide-react';

const SummaryCard = ({ title, value, subtitle, icon: Icon, colorClass }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 flex-shrink-0`}>
      <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const MyPresentation = () => {
  const studentId = 's6501001';
  const presentations = getStudentPresentations(studentId);
  const avgScore = useMemo(() => calculatePresentationAverage(presentations), [presentations]);
  const level = useMemo(() => getPresentationLevel(avgScore), [avgScore]);
  const levelInfo = PRESENTATION_LEVELS[level];

  const chartData = useMemo(() => {
    return presentations.map(p => ({
      name: `ครั้งที่ ${p.presentationNumber}`,
      คะแนนนำเสนอ: p.percentage
    }));
  }, [presentations]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">คะแนนการนำเสนอ</h1>
        <p className="text-gray-500">My Presentations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="คะแนนเฉลี่ยรวม" 
          value={`${avgScore.toFixed(1)}%`} 
          icon={Mic} 
          colorClass="bg-blue-600" 
        />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-500 font-medium mb-2">ระดับความสามารถ</p>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${levelInfo.color} ${levelInfo.bgColor}`}>
            <Star className="w-5 h-5" />
            <span className="font-semibold">{levelInfo.label}</span>
          </div>
        </div>
        <SummaryCard 
          title="สถานะ" 
          value="ผ่านเกณฑ์" 
          icon={Award} 
          colorClass="bg-emerald-600" 
        />
        <SummaryCard 
          title="อันดับในกลุ่ม" 
          value="2/32" 
          icon={BarChart2} 
          colorClass="bg-yellow-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">กราฟคะแนนนำเสนอ</h3>
          <div className="h-80">
            <LineChartComponent data={chartData} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">สัดส่วนคะแนน (Rubric)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">เนื้อหา (Content)</span>
                <span className="text-gray-900 font-bold">40%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">การนำเสนอ (Delivery)</span>
                <span className="text-gray-900 font-bold">30%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">สื่อประกอบ (Visuals)</span>
                <span className="text-gray-900 font-bold">15%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">การตอบคำถาม (Q&A)</span>
                <span className="text-gray-900 font-bold">15%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">ประวัติการนำเสนอ</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ครั้งที่</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">คะแนน</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ระดับ</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ข้อเสนอแนะหลัก</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {presentations.map((p) => {
                const pLevel = getPresentationLevel(p.percentage);
                const pLevelInfo = PRESENTATION_LEVELS[pLevel];
                return (
                  <tr key={p.presentationNumber}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      นำเสนอครั้งที่ {p.presentationNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {p.assessedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      {p.percentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pLevelInfo.bgColor} ${pLevelInfo.color}`}>
                        {pLevelInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                      {p.feedback}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPresentation;
