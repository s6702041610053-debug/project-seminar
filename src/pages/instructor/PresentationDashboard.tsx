import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, CheckCircle, XCircle, TrendingUp, Presentation, Star, Eye, Search, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { 
  students, allPresentationAssessments,
  getPresentationAverageByRound, getPresentationSummary
} from '../../data/mockData';
import { calculatePresentationAverage, getScoreLevel } from '../../utils/calculations';
import DonutChart from '../../components/charts/DonutChart';
import LineChartComponent from '../../components/charts/LineChart';
import BarChartComponent from '../../components/charts/BarChart';

// Inline Components
const SummaryCard = ({ icon: Icon, title, value, subtitle, color }: {icon: any, title: string, value: string|number, subtitle?: string, color: string}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  </div>
);

const ScoreLevelBadge = ({ level }: { level: string }) => {
  const colors: Record<string, string> = {
    'ดีมาก': 'bg-green-100 text-green-700',
    'ดี': 'bg-blue-100 text-blue-700',
    'พอใช้': 'bg-yellow-100 text-yellow-700',
    'ไม่ผ่าน': 'bg-red-100 text-red-700'
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[level] || 'bg-gray-100 text-gray-700'}`}>{level}</span>;
};

const PresentationDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const summary = getPresentationSummary();
  const presentationAverageData = getPresentationAverageByRound();
  
  const presentationLevelData = [
    { name: 'สัดส่วนระดับผลการนำเสนอ', 'ดีมาก': 15, 'ดี': 10, 'พอใช้': 5, 'ไม่ผ่าน': 2 }
  ];

  const scoreDistributionData = [
    { name: 'การกระจายคะแนนเฉลี่ย', '0-49': 1, '50-59': 2, '60-69': 5, '70-79': 10, '80-89': 12, '90-100': 2 }
  ];

  const tableData = useMemo(() => {
    let data = students.map(student => {
      const proposal = 85;
      const progress = 82;
      const preFinal = 80;
      const final = 0;
      const averageScore = calculatePresentationAverage([proposal, progress, preFinal]);
      const level = getScoreLevel(averageScore);
      
      return {
        id: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        proposal,
        progress,
        preFinal,
        final,
        averageScore,
        level,
        status: 'ผ่านเกณฑ์' // Mock status
      };
    });

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.filter(item => 
        item.id.toLowerCase().includes(lowerSearch) || 
        item.studentName.toLowerCase().includes(lowerSearch)
      );
    }
    
    return data;
  }, [searchTerm]);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Presentation Assessment Dashboard</h1>
        <p className="text-gray-500">ผลการประเมินการนำเสนอ</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryCard icon={Users} title="นักศึกษาทั้งหมด" value={summary.totalStudents} color="bg-blue-600" />
        <SummaryCard icon={Presentation} title="นำเสนอแล้ว" value={summary.presentedCount} subtitle={`${summary.presentedPercentage}%`} color="bg-green-600" />
        <SummaryCard icon={XCircle} title="ยังไม่นำเสนอ" value={summary.notPresentedCount} subtitle={`${summary.notPresentedPercentage}%`} color="bg-orange-500" />
        <SummaryCard icon={TrendingUp} title="คะแนนเฉลี่ยรวม" value={`${summary.overallAverage}%`} color="bg-blue-500" />
        <SummaryCard icon={CheckCircle} title="ผ่านเกณฑ์" value={summary.passedCount} color="bg-green-500" />
        <SummaryCard icon={XCircle} title="ไม่ผ่านเกณฑ์" value={summary.failedCount} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">คะแนนเฉลี่ยการนำเสนอแต่ละครั้ง</h2>
          <div className="h-64">
            <LineChartComponent data={presentationAverageData} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">สัดส่วนระดับผลการนำเสนอ</h2>
          <div className="h-64">
            <DonutChart data={presentationLevelData} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">การกระจายคะแนนเฉลี่ย</h2>
        <div className="h-64">
          <BarChartComponent data={scoreDistributionData} xKey="name" bars={[{key: "0-49", name: "0-49", color: "#ef4444"}, {key: "50-59", name: "50-59", color: "#f97316"}, {key: "60-69", name: "60-69", color: "#eab308"}, {key: "70-79", name: "70-79", color: "#3b82f6"}, {key: "80-89", name: "80-89", color: "#22c55e"}, {key: "90-100", name: "90-100", color: "#15803d"}]} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">รายการผลการนำเสนอ</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="ค้นหารหัสนักศึกษา, ชื่อ..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-full sm:w-64"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">รหัสนักศึกษา</th>
                <th className="p-4 font-medium">ชื่อ-สกุล</th>
                <th className="p-4 font-medium">Proposal</th>
                <th className="p-4 font-medium">Progress</th>
                <th className="p-4 font-medium">Pre-Final</th>
                <th className="p-4 font-medium">Final</th>
                <th className="p-4 font-medium">คะแนนเฉลี่ย</th>
                <th className="p-4 font-medium">ระดับ</th>
                <th className="p-4 font-medium">สถานะ</th>
                <th className="p-4 font-medium text-center">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-800">{item.id}</td>
                  <td className="p-4 text-sm text-gray-600">{item.studentName}</td>
                  <td className="p-4 text-sm text-gray-600">{item.proposal || '-'}</td>
                  <td className="p-4 text-sm text-gray-600">{item.progress || '-'}</td>
                  <td className="p-4 text-sm text-gray-600">{item.preFinal || '-'}</td>
                  <td className="p-4 text-sm text-gray-600">{item.final || '-'}</td>
                  <td className="p-4 text-sm text-gray-600 font-medium">{item.averageScore}%</td>
                  <td className="p-4">
                    <ScoreLevelBadge level={item.level} />
                  </td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${item.status === 'ผ่านเกณฑ์' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => navigate(`/student/${item.id}`)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-500">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              แสดง {(currentPage - 1) * itemsPerPage + 1} ถึง {Math.min(currentPage * itemsPerPage, tableData.length)} จาก {tableData.length} รายการ
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600 font-medium px-2">
                หน้า {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationDashboard;
