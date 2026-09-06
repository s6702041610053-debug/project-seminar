import React, { useState } from 'react';
import { Search, Filter, Eye, Edit } from 'lucide-react';
import { projects, instructors } from '../../data/mockData';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'in_progress': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">กำลังดำเนินการ</span>;
    case 'completed': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">เสร็จสิ้น</span>;
    case 'on_hold': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">ระงับชั่วคราว</span>;
    default: return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
  }
};

const ProjectManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.titleTh.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.projectId.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#063B78]">จัดการโครงงาน</h1>
          <p className="text-gray-500 mt-1">ติดตามและจัดการโครงงานทั้งหมดในระบบ</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ค้นหารหัส, ชื่อโครงงาน..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B78]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B78]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">ทุกสถานะ</option>
              <option value="in_progress">กำลังดำเนินการ</option>
              <option value="completed">เสร็จสิ้น</option>
              <option value="on_hold">ระงับชั่วคราว</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="p-4 font-medium">รหัส</th>
                <th className="p-4 font-medium min-w-[200px]">ชื่อโครงงาน</th>
                <th className="p-4 font-medium">อาจารย์ที่ปรึกษา</th>
                <th className="p-4 font-medium w-48">ความคืบหน้า</th>
                <th className="p-4 font-medium">สถานะ</th>
                <th className="p-4 font-medium text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredProjects.map((project) => {
                const advisor = instructors.find(i => i.id === project.advisorId);
                const progress = project.overallProgress || 0;
                
                return (
                  <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{project.projectId}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 line-clamp-1">{project.titleTh}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{project.titleEn}</div>
                    </td>
                    <td className="p-4 text-gray-600">{advisor?.name || '-'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${progress >= 80 ? 'bg-green-500' : progress >= 40 ? 'bg-blue-500' : 'bg-orange-500'}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600 min-w-[32px]">{progress}%</span>
                      </div>
                    </td>
                    <td className="p-4"><StatusBadge status={project.status} /></td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="ดูรายละเอียด">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="แก้ไข">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
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

export default ProjectManagement;
