import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { students, projects } from '../../data/mockData';

const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.studentId.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#063B78]">จัดการนักศึกษา</h1>
          <p className="text-gray-500 mt-1">จัดการข้อมูลนักศึกษาในระบบ</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-5 h-5 mr-2" />
            นำเข้า (Excel)
          </button>
          <button className="flex items-center px-4 py-2 bg-[#063B78] text-white rounded-lg hover:bg-[#032A57] transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            เพิ่มนักศึกษา
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="ค้นหารหัสนักศึกษา, ชื่อ-สกุล..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B78]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="p-4 font-medium text-center w-16">ลำดับ</th>
                <th className="p-4 font-medium">รหัสนักศึกษา</th>
                <th className="p-4 font-medium">ชื่อ-สกุล</th>
                <th className="p-4 font-medium">อีเมล</th>
                <th className="p-4 font-medium">กลุ่ม</th>
                <th className="p-4 font-medium">โครงงาน</th>
                <th className="p-4 font-medium">สถานะ</th>
                <th className="p-4 font-medium text-center">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredStudents.map((student, index) => {
                const project = projects.find(p => p.projectId === student.projectId);
                return (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-center text-gray-500">{index + 1}</td>
                    <td className="p-4 font-medium text-gray-900">{student.studentId}</td>
                    <td className="p-4">{student.name}</td>
                    <td className="p-4 text-gray-500">{student.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        {student.group}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {project ? <span className="truncate max-w-[150px] block" title={project.titleTh}>{project.titleTh}</span> : '-'}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        ปกติ
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="แก้ไข">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ลบ">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>แสดง {filteredStudents.length} รายการ</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">ก่อนหน้า</button>
            <button className="px-3 py-1 bg-[#063B78] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">ถัดไป</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
