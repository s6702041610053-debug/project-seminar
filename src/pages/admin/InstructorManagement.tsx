import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { instructors, projects } from '../../data/mockData';

const InstructorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInstructors = instructors.filter(instructor => 
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    instructor.instructorId.includes(searchTerm)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#063B78]">จัดการอาจารย์</h1>
          <p className="text-gray-500 mt-1">จัดการข้อมูลอาจารย์ที่ปรึกษาและผู้สอน</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#063B78] text-white rounded-lg hover:bg-[#032A57] transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          เพิ่มอาจารย์
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="ค้นหารหัสอาจารย์, ชื่อ-สกุล..." 
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
                <th className="p-4 font-medium">รหัสอาจารย์</th>
                <th className="p-4 font-medium">ชื่อ-สกุล</th>
                <th className="p-4 font-medium">ตำแหน่ง</th>
                <th className="p-4 font-medium">อีเมล</th>
                <th className="p-4 font-medium">โทรศัพท์</th>
                <th className="p-4 font-medium text-center">โครงงานที่ดูแล</th>
                <th className="p-4 font-medium text-center">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredInstructors.map((instructor, index) => {
                const managedProjects = projects.filter(p => p.advisorId === instructor.id).length;
                return (
                  <tr key={instructor.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-center text-gray-500">{index + 1}</td>
                    <td className="p-4 font-medium text-gray-900">{instructor.instructorId}</td>
                    <td className="p-4">{instructor.name}</td>
                    <td className="p-4 text-gray-600">อาจารย์ประจำ</td>
                    <td className="p-4 text-gray-500">{instructor.email}</td>
                    <td className="p-4 text-gray-500">{instructor.phone || '-'}</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-medium">
                        {managedProjects}
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
      </div>
    </div>
  );
};

export default InstructorManagement;
