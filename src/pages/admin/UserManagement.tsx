import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter } from 'lucide-react';
import { students, instructors } from '../../data/mockData';

const Badge: React.FC<{ type: string }> = ({ type }) => {
  switch(type) {
    case 'admin': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">ผู้ดูแลระบบ</span>;
    case 'instructor': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">อาจารย์</span>;
    case 'student': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">นักศึกษา</span>;
    default: return null;
  }
};

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Generate mock users from data
  const users = [
    { id: '1', username: 'admin01', name: 'ผู้ดูแลระบบ 1', email: 'admin@kmutnb.ac.th', role: 'admin', status: 'active' },
    ...instructors.map(i => ({ id: i.instructorId, username: i.instructorId, name: i.name, email: i.email, role: 'instructor', status: 'active' })),
    ...students.map(s => ({ id: s.studentId, username: s.studentId, name: s.name, email: s.email, role: 'student', status: 'active' }))
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.username.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#063B78]">จัดการผู้ใช้งาน</h1>
          <p className="text-gray-500 mt-1">จัดการข้อมูลผู้ใช้งานและสิทธิ์การเข้าถึงระบบ</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#063B78] text-white rounded-lg hover:bg-[#032A57] transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          เพิ่มผู้ใช้งาน
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อ, รหัสผู้ใช้..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B78] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063B78]"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">ทุกบทบาท</option>
              <option value="admin">ผู้ดูแลระบบ</option>
              <option value="instructor">อาจารย์</option>
              <option value="student">นักศึกษา</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                <th className="p-4 font-medium text-center w-16">ลำดับ</th>
                <th className="p-4 font-medium">ชื่อผู้ใช้</th>
                <th className="p-4 font-medium">ชื่อ-สกุล</th>
                <th className="p-4 font-medium">อีเมล</th>
                <th className="p-4 font-medium">บทบาท</th>
                <th className="p-4 font-medium">สถานะ</th>
                <th className="p-4 font-medium text-center">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-center text-gray-500">{index + 1}</td>
                  <td className="p-4 font-medium text-gray-900">{user.username}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4 text-gray-500">{user.email}</td>
                  <td className="p-4"><Badge type={user.role} /></td>
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
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    ไม่พบข้อมูลผู้ใช้งาน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>แสดง {filteredUsers.length} รายการ</div>
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

export default UserManagement;
