import React, { useState, useMemo } from 'react';
import { getStudentProject, getStudentWeeklyScores, getStudentPresentations, getStudentRiskScore } from '../../data/mockData';
import { PROJECT_STEPS } from '../../types';
import { calculateWeeklyAverage, calculatePresentationAverage } from '../../utils/calculations';
import {
  CheckCircle, Circle, Clock, User, FileText, Send,
  Presentation, RefreshCw, Upload, BarChart3, TrendingUp,
  ShieldAlert, BookOpen, Calendar
} from 'lucide-react';

const MyProject = () => {
  const studentId = 's6501001';
  const project = getStudentProject(studentId);
  const weeklyScores = getStudentWeeklyScores(studentId);
  const presentations = getStudentPresentations(studentId);
  const riskScore = getStudentRiskScore(studentId);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const currentStep = project?.currentStep || 1;

  const stats = useMemo(() => {
    const submittedWeekly = weeklyScores.filter(w => w.submissionStatus !== 'not_submitted');
    const lastWeekly = submittedWeekly.length > 0 ? submittedWeekly[submittedWeekly.length - 1] : null;
    const assessedPres = presentations.filter(p => p.status !== 'not_assessed');
    const lastPres = assessedPres.length > 0 ? assessedPres[assessedPres.length - 1] : null;

    return {
      lastWeeklyPct: lastWeekly?.percentage || 0,
      lastPresPct: lastPres?.percentage || 0,
      riskLevel: riskScore?.finalLevel || 'low',
    };
  }, [weeklyScores, presentations, riskScore]);

  const handleAction = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  if (!project) return <div className="p-6 text-center text-gray-500">ไม่พบข้อมูลโครงงาน</div>;

  const progressColor = project.progress >= 80 ? 'text-emerald-600' : project.progress >= 50 ? 'text-blue-600' : 'text-amber-600';
  const progressBg = project.progress >= 80 ? 'stroke-emerald-500' : project.progress >= 50 ? 'stroke-blue-500' : 'stroke-amber-500';

  // Action buttons based on current step
  const getActions = () => {
    if (currentStep <= 4) return [{ label: 'ส่งข้อเสนอโครงงาน', icon: Send, color: 'from-[#065F46] to-emerald-600', msg: 'ส่งข้อเสนอโครงงานเรียบร้อยแล้ว!' }];
    if (currentStep <= 6) return [{ label: 'ส่งรายงานความก้าวหน้า', icon: FileText, color: 'from-[#065F46] to-teal-600', msg: 'ส่งรายงานความก้าวหน้าเรียบร้อยแล้ว!' }];
    if (currentStep <= 10) return [{ label: 'ขอสอบ Presentation', icon: Presentation, color: 'from-purple-600 to-indigo-600', msg: 'ขอสอบ Presentation เรียบร้อยแล้ว!' }];
    if (currentStep === 11) return [{ label: 'ส่งงานแก้ไข', icon: RefreshCw, color: 'from-amber-500 to-orange-500', msg: 'ส่งงานแก้ไขเรียบร้อยแล้ว!' }];
    if (currentStep === 12) return [{ label: 'ส่งเล่มฉบับสมบูรณ์', icon: Upload, color: 'from-blue-600 to-indigo-600', msg: 'ส่งเล่มฉบับสมบูรณ์เรียบร้อยแล้ว!' }];
    return [{ label: 'รอตรวจสอบ...', icon: Clock, color: 'from-gray-400 to-gray-500', msg: '', disabled: true }];
  };

  const actions = getActions();
  const riskColors: Record<string, { bg: string; text: string; label: string }> = {
    low: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: '🟢 Low Risk' },
    medium: { bg: 'bg-amber-100', text: 'text-amber-700', label: '🟡 Medium Risk' },
    high: { bg: 'bg-red-100', text: 'text-red-700', label: '🔴 High Risk' },
  };

  const rc = riskColors[stats.riskLevel] || riskColors.low;

  // Mock estimated dates
  const stepDates = PROJECT_STEPS.map((_, i) => {
    const base = new Date(2024, 5, 1);
    base.setDate(base.getDate() + i * 14);
    return `${base.getDate()}/${base.getMonth() + 1}/${base.getFullYear() + 543}`;
  });

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce text-sm font-medium">
          ✅ {toastMsg}
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">โครงงานของฉัน</h1>
        <p className="text-gray-500">My Project</p>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-[#065F46] to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-200 text-sm mb-1">ขั้นตอนปัจจุบัน</p>
            <h2 className="text-2xl font-bold mb-1">{PROJECT_STEPS[currentStep - 1] || 'สำเร็จ'}</h2>
            <p className="text-emerald-200 text-sm">Step {currentStep} / 14</p>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" className={progressBg} strokeWidth="8"
                strokeDasharray={`${(project.progress / 100) * 264} 264`}
                strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{project.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Project Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-6">{project.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <User className="w-4 h-4" />อาจารย์ที่ปรึกษา
                </div>
                <div className="font-medium text-gray-900">{project.advisorName}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <FileText className="w-4 h-4" />สถานะ
                </div>
                <div className="font-medium text-gray-900 capitalize">{project.status.replace(/_/g, ' ')}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <BookOpen className="w-4 h-4" />กลุ่ม
                </div>
                <div className="font-medium text-gray-900">{project.group}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />ภาคเรียน
                </div>
                <div className="font-medium text-gray-900">{project.semester}/{project.year}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">การดำเนินการถัดไป</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => !('disabled' in action && action.disabled) && handleAction(action.msg)}
                  disabled={'disabled' in action && (action as any).disabled}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${action.color} text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  <action.icon className="w-5 h-5" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Weekly ล่าสุด</p>
              <p className="text-xl font-bold text-gray-800">{stats.lastWeeklyPct.toFixed(1)}%</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <BarChart3 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Presentation ล่าสุด</p>
              <p className="text-xl font-bold text-gray-800">{stats.lastPresPct.toFixed(1)}%</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <ShieldAlert className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Risk Level</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${rc.bg} ${rc.text}`}>
                {rc.label}
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Stepper */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">ขั้นตอนการดำเนินงาน</h3>
          <div className="space-y-0">
            {PROJECT_STEPS.map((step, index) => {
              const isCompleted = index + 1 < currentStep;
              const isCurrent = index + 1 === currentStep;

              return (
                <div key={index} className="flex gap-3">
                  {/* Connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0 transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-500'
                          : isCurrent
                          ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-200 animate-pulse'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <span className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    {index < PROJECT_STEPS.length - 1 && (
                      <div className={`w-0.5 h-8 ${isCompleted ? 'bg-emerald-300' : 'bg-gray-200'}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-4 pt-1 ${isCompleted ? 'opacity-60' : ''}`}>
                    <h4 className={`text-sm font-semibold leading-tight ${
                      isCurrent ? 'text-blue-700' : isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'
                    }`}>
                      {step}
                    </h4>
                    <span className="text-xs text-gray-400">{stepDates[index]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProject;
