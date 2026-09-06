import React from 'react';
import { calendarEvents } from '../../data/mockData';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const MyCalendar = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ปฏิทินงาน</h1>
        <p className="text-gray-500">Calendar & Events</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {calendarEvents.map((event) => (
            <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6">
              <div className="md:w-32 flex-shrink-0">
                <div className="bg-emerald-50 text-emerald-700 rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-sm font-medium uppercase">{new Date(event.date).toLocaleDateString('th-TH', { month: 'short' })}</div>
                  <div className="text-3xl font-bold my-1">{new Date(event.date).getDate()}</div>
                  <div className="text-xs">{new Date(event.date).toLocaleDateString('th-TH', { year: 'numeric' })}</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                    event.type === 'presentation' ? 'bg-purple-100 text-purple-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {event.type === 'deadline' ? 'กำหนดส่งงาน' : event.type === 'presentation' ? 'นำเสนอ' : 'กิจกรรม'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
          {calendarEvents.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              <CalendarIcon className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p>ไม่มีกำหนดการในขณะนี้</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
