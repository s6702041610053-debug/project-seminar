import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, User, BookOpen, AlertTriangle, FileText, CheckCircle, 
  MessageSquare, Calendar, Activity, BarChart2
} from 'lucide-react';
import { students, projects, instructors, getStudentRiskScore } from '../../data/mockData';
import { getScoreLevel, analyzeTrend } from '../../utils/calculations';

const StudentDetail: React.FC = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // If studentId is undefined, use mock
  const id = studentId || '1'; 
  const student = students.find(s => s.id === id) || students[0];
  const project = projects.find(p => p.id === student.projectId);
  const advisor = instructors.find(i => i.id === project?.advisorId);
  const riskData = getStudentRiskScore(id);

  const tabs = [
    { id: 'overview', name: 'ภาพรวม', icon: <Activity className="w-4 h-4 mr-2" /> },
    { id: 'weekly', name: 'Weekly Progress', icon: <Calendar className="w-4 h-4 mr-2" /> },
    { id: 'presentation', name: 'Presentation', icon: <BarChart2 className="w-4 h-4 mr-2" /> },
    { id: 'risk', name: 'Risk Score', icon: <AlertTriangle className="w-4 h-4 mr-2" /> },
    { id: 'docs', name: 'เอกสาร', icon: <FileText className="w-4 h-4 mr-2" /> },
    { id: 'feedback', name: 'Feedback', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans space-y-6">
      <button 
        onClick={() => navigate('/instructor/students')}
        className="flex items-center text-sm text-gray-500 hover:text-[#063B78] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> กลับไปหน้ารายชื่อนักศึกษา
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-12 h-12" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
                <span>รหัส: {student.studentId}</span>
                <span>กลุ่ม: {student.group}</span>
                <span>ปีการศึกษา: {student.year}</span>
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">โครงงาน:</span>
                <span className="text-sm text-gray-600">{project?.title || '-'}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium mr-2">อาจารย์ที่ปรึกษา:</span> 
                {advisor?.name || '-'}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                riskData.finalLevel === 'High' ? 'bg-red-50 border-red-200 text-red-700' :
                riskData.finalLevel === 'Medium' ? 'bg-orange-50 border-orange-200 text-orange-700' :
                'bg-green-50 border-green-200 text-green-700'
              }`}>
                <AlertTriangle className="w-5 h-5" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium opacity-80">Risk Level</span>
                  <span className="font-bold">{riskData.finalLevel === 'High' ? 'เสี่ยงสูง' : riskData.finalLevel === 'Medium' ? 'เสี่ยงปานกลาง' : 'เสี่ยงต่ำ'} ({riskData.totalScore}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center whitespace-nowrap px-6 py-3 border-b-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-[#063B78] text-[#063B78]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-800">ภาพรวมความก้าวหน้า</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                 <p className="text-sm text-gray-500">ความคืบหน้าโครงงาน</p>
                 <p className="text-2xl font-bold text-blue-600 mt-1">{project?.overallProgress || 0}%</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                 <p className="text-sm text-gray-500">ส่งเอกสารแล้ว</p>
                 <p className="text-2xl font-bold text-emerald-600 mt-1">4 / 7</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                 <p className="text-sm text-gray-500">เข้าพบที่ปรึกษา</p>
                 <p className="text-2xl font-bold text-purple-600 mt-1">8 ครั้ง</p>
               </div>
            </div>
            <div className="mt-6 border-t border-gray-100 pt-6">
               <h3 className="text-md font-medium text-gray-800 mb-4">ไทม์ไลน์ล่าสุด</h3>
               <div className="space-y-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex gap-4">
                     <div className="flex flex-col items-center">
                       <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                       {i !== 3 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                     </div>
                     <div>
                       <p className="text-sm font-medium text-gray-800">ส่งรายงานความก้าวหน้าครั้งที่ {4-i}</p>
                       <p className="text-xs text-gray-500">เมื่อ {i} สัปดาห์ที่แล้ว</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
        {activeTab !== 'overview' && (
          <div className="flex items-center justify-center h-64 text-gray-500">
            เนื้อหาหน้า {tabs.find(t => t.id === activeTab)?.name} (Mock)
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
