import React, { useMemo } from 'react';
import { Activity, TrendingUp, ArrowUpRight, ArrowRight, ArrowDownRight, CheckCircle, Award, Calendar, Bell, Clock } from 'lucide-react';
import { students, getStudentWeeklyScores, getStudentProject, calendarEvents, notifications } from '../../data/mockData';
import { calculateWeeklyAverage, analyzeTrend } from '../../utils/calculations';
import LineChartComponent from '../../components/charts/LineChart';
import { PROJECT_STEPS } from '../../types';

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

const StudentDashboard = () => {
  const studentId = 's6501001';
  const student = students.find(s => s.id === studentId);
  const weeklyScores = getStudentWeeklyScores(studentId);
  const project = getStudentProject(studentId);
  
  const weeklyAvg = useMemo(() => calculateWeeklyAverage(weeklyScores), [weeklyScores]);
  const trend = useMemo(() => analyzeTrend(weeklyScores), [weeklyScores]);
  
  const chartData = useMemo(() => {
    return {
      labels: weeklyScores.map(w => `W${w.week}`),
      datasets: [
        {
          label: 'คะแนน',
          data: weeklyScores.map(w => w.score),
          borderColor: '#059669',
          backgroundColor: '#059669',
        }
      ]
    };
  }, [weeklyScores]);

  const recentNotifications = notifications
    .filter(n => n.targetRole === 'student' || n.targetRole === 'all')
    .slice(0, 3);
    
  const upcomingEvents = calendarEvents.slice(0, 3);

  const TrendIcon = trend === 'improving' ? ArrowUpRight : trend === 'declining' ? ArrowDownRight : ArrowRight;
  const trendColor = trend === 'improving' ? 'text-green-600 bg-green-50' : trend === 'declining' ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ภาพรวมของฉัน</h1>
        <p className="text-gray-500">Student Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCard 
          title="ความก้าวหน้ารวม" 
          value={`${project?.progress || 0}%`} 
          icon={Activity} 
          colorClass="bg-emerald-600" 
        />
        <SummaryCard 
          title="คะแนนเฉลี่ย 14 สัปดาห์" 
          value={`${weeklyAvg.toFixed(1)}%`} 
          icon={TrendingUp} 
          colorClass="bg-blue-600" 
        />
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center">
          <p className="text-sm text-gray-500 font-medium mb-2">แนวโน้ม</p>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${trendColor}`}>
            <TrendIcon className="w-5 h-5" />
            <span className="font-semibold">{trend === 'improving' ? 'ดีขึ้น' : trend === 'declining' ? 'ลดลง' : 'คงที่'}</span>
          </div>
        </div>
        <SummaryCard 
          title="สถานะการส่งงาน" 
          value="ส่งตรงเวลา" 
          icon={CheckCircle} 
          colorClass="bg-green-600" 
        />
        <SummaryCard 
          title="อันดับในกลุ่ม" 
          value="1/32" 
          icon={Award} 
          colorClass="bg-yellow-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">คะแนนรายสัปดาห์</h3>
          <div className="h-80">
            <LineChartComponent data={chartData} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              กำหนดการเร็วๆ นี้
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg text-center min-w-[60px]">
                    <div className="text-xs font-medium">{new Date(event.date).toLocaleDateString('th-TH', { month: 'short' })}</div>
                    <div className="text-lg font-bold">{new Date(event.date).getDate()}</div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-400" />
              การแจ้งเตือนล่าสุด
            </h3>
            <div className="space-y-4">
              {recentNotifications.map(notif => (
                <div key={notif.id} className="flex gap-3">
                  <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${notif.isRead ? 'bg-gray-300' : 'bg-blue-500'}`} />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
