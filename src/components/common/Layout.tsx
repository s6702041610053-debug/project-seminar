import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

// In a real app, this would use a real context
// import { useAuth } from '../../contexts/AuthContext';
const useMockAuth = () => ({
  user: { name: 'สมชาย ใจดี', role: 'instructor' as const },
  logout: () => console.log('Logged out')
});

export const Layout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, logout } = useMockAuth();
  
  if (!user) return <div className="flex h-screen items-center justify-center">กำลังโหลด...</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar 
        role={user.role} 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={logout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header 
          userName={user.name}
          role={user.role}
          onToggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
          notificationCount={3}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 scrollbar-thin scrollbar-thumb-gray-300">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
