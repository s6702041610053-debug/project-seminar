import React from 'react';
import { getStudentProject } from '../../data/mockData';
import { PROJECT_STEPS } from '../../types';
import { CheckCircle, Circle, Clock, XCircle, User, FileText } from 'lucide-react';

const MyProject = () => {
  const studentId = 's6501001';
  const project = getStudentProject(studentId);
  const currentStep = project?.currentStep || 1;

  if (!project) return <div>Project not found</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">โครงงานของฉัน</h1>
        <p className="text-gray-500">My Project</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{project.title}</h2>
            <p className="text-gray-600 mb-6">{project.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <User className="w-4 h-4" />อาจารย์ที่ปรึกษา
                </div>
                <div className="font-medium text-gray-900">{project.advisorId}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <FileText className="w-4 h-4" />สถานะ
                </div>
                <div className="font-medium text-gray-900 capitalize">{project.status.replace('_', ' ')}</div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">ความคืบหน้าภาพรวม</span>
                <span className="text-sm font-bold text-emerald-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">ขั้นตอนการดำเนินงาน</h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {PROJECT_STEPS.map((step, index) => {
              const isCompleted = index + 1 < currentStep;
              const isCurrent = index + 1 === currentStep;
              const isPending = index + 1 > currentStep;
              
              let Icon = Circle;
              let iconColor = 'text-gray-300';
              let bgColor = 'bg-white';
              
              if (isCompleted) {
                Icon = CheckCircle;
                iconColor = 'text-emerald-500';
              } else if (isCurrent) {
                Icon = Clock;
                iconColor = 'text-blue-500';
                bgColor = 'bg-blue-50';
              }
              
              return (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${isCurrent ? 'border-blue-500' : isCompleted ? 'border-emerald-500 bg-emerald-500' : 'border-gray-200'} ${bgColor} z-10 shrink-0`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5 text-white" /> : <span className={`text-xs font-bold ${isCurrent ? 'text-blue-500' : 'text-gray-400'}`}>{index + 1}</span>}
                  </div>
                  <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border ${isCurrent ? 'border-blue-200 shadow-sm' : 'border-gray-100'} ${isCompleted ? 'bg-gray-50 opacity-70' : 'bg-white'}`}>
                    <h4 className={`font-semibold ${isCurrent ? 'text-blue-700' : 'text-gray-800'}`}>{step}</h4>
                    <span className="text-xs text-gray-500">Step {index + 1}</span>
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
