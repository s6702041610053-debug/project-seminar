import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  userName: string;
  role: string;
  onToggleSidebar: () => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  userName,
  role,
  onToggleSidebar,
  notificationCount = 0
}) => {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm font-sans z-10">
      <div className="flex items-center">
        <button 
          onClick={onToggleSidebar}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 lg:hidden text-gray-600 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <div>
          {title && <h1 className="text-xl font-bold text-gray-800">{title}</h1>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="ค้นหา..." 
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-gray-50"
          />
        </div>
        
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
        
        <div className="flex items-center space-x-3 border-l pl-6 border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">{userName}</p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold overflow-hidden shadow-sm">
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
