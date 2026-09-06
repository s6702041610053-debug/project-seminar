import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, Check } from 'lucide-react';

const mockNotifications = [
  { id: '1', title: 'ตรวจเอกสาร Proposal', message: 'กลุ่มที่ 1 ส่งเอกสาร Proposal ฉบับแก้ไขแล้ว', time: '10 นาทีที่แล้ว', type: 'info', read: false },
  { id: '2', title: 'ความเสี่ยงระดับสูง!', message: 'โครงงาน "ระบบจัดการหอพัก" มีคะแนน Risk Score ต่ำกว่าเกณฑ์ (25%)', time: '1 ชั่วโมงที่แล้ว', type: 'urgent', read: false },
  { id: '3', title: 'อัปเดตความก้าวหน้า', message: 'นายสมชาย ใจดี ส่งรายงานความก้าวหน้าสัปดาห์ที่ 4', time: 'เมื่อวาน', type: 'success', read: true },
  { id: '4', title: 'แจ้งเตือนการเข้าพบ', message: 'นักศึกษากลุ่มที่ 3 ขาดการติดต่อมากกว่า 2 สัปดาห์', time: '2 วันที่แล้ว', type: 'warning', read: true },
];

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans space-y-6">
      <div className="flex justify-between items-end">
        <div className="flex items-center">
          <Bell className="w-6 h-6 text-[#063B78] mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-[#063B78]">ศูนย์แจ้งเตือน</h1>
            <p className="text-gray-500 mt-1">อัปเดตกิจกรรมและการแจ้งเตือนที่สำคัญ</p>
          </div>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-sm text-[#063B78] hover:underline flex items-center"
        >
          <Check className="w-4 h-4 mr-1" /> ทำเครื่องหมายว่าอ่านแล้วทั้งหมด
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'all' ? 'border-b-2 border-[#063B78] text-[#063B78]' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('all')}
          >
            ทั้งหมด
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'unread' ? 'border-b-2 border-[#063B78] text-[#063B78]' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('unread')}
          >
            ยังไม่อ่าน
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'read' ? 'border-b-2 border-[#063B78] text-[#063B78]' : 'text-gray-500 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('read')}
          >
            อ่านแล้ว
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredNotifs.length > 0 ? filteredNotifs.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${!notification.read ? 'bg-blue-50/30' : ''}`}
            >
              <div className={`p-2 rounded-full h-fit flex-shrink-0 ${
                notification.type === 'urgent' ? 'bg-red-100' :
                notification.type === 'warning' ? 'bg-orange-100' :
                notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                    {notification.title}
                  </h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="mt-2 text-xs text-[#063B78] font-medium hover:underline"
                  >
                    ทำเครื่องหมายว่าอ่านแล้ว
                  </button>
                )}
              </div>
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              )}
            </div>
          )) : (
            <div className="p-8 text-center text-gray-500">
              ไม่มีการแจ้งเตือน
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
