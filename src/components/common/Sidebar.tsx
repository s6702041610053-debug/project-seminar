import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Users, Activity, Calendar, Presentation, 
  BarChart2, ShieldAlert, Bell, FileText, Settings, LogOut, Menu, X, LayoutDashboard, CheckSquare, Database
} from 'lucide-react';

interface SidebarProps {
  role: 'admin' | 'instructor' | 'student';
  currentPath?: string;
  onNavigate?: (path: string) => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
  onLogout?: () => void;
}

const instructorItems = [
  { path: '/instructor', label: 'ภาพรวม Dashboard', icon: Home },
  { path: '/instructor/projects', label: 'โครงงานนักศึกษา', icon: BookOpen },
  { path: '/instructor/tracking', label: 'ติดตาม 14 ขั้นตอน', icon: Activity },
  { path: '/instructor/students', label: 'นักศึกษาทั้งหมด', icon: Users },
  { path: '/instructor/weekly-progress', label: 'Weekly Progress', icon: Calendar },
  { path: '/instructor/presentations', label: 'Presentation Assessment', icon: Presentation },
  { path: '/instructor/analytics', label: 'Learning Analytics', icon: BarChart2 },
  { path: '/instructor/risk-score', label: 'Risk Score', icon: ShieldAlert },
  { path: '/instructor/notifications', label: 'การแจ้งเตือน', icon: Bell },
  { path: '/instructor/reports', label: 'รายงานและสถิติ', icon: FileText },
  { path: '/instructor/documents', label: 'จัดการเอกสาร', icon: Database },
  { path: '/instructor/settings', label: 'ตั้งค่า', icon: Settings },
];

const studentItems = [
  { path: '/student', label: 'ภาพรวมของฉัน', icon: Home },
  { path: '/student/my-project', label: 'โครงงานของฉัน', icon: BookOpen },
  { path: '/student/weekly-progress', label: 'ความก้าวหน้ารายสัปดาห์', icon: Calendar },
  { path: '/student/presentations', label: 'การนำเสนอ', icon: Presentation },
  { path: '/student/risk-score', label: 'Risk Score ของฉัน', icon: ShieldAlert },
  { path: '/student/documents', label: 'เอกสาร', icon: FileText },
  { path: '/student/feedback', label: 'Feedback จากอาจารย์', icon: CheckSquare },
  { path: '/student/calendar', label: 'ปฏิทินงาน', icon: Calendar },
  { path: '/student/notifications', label: 'การแจ้งเตือน', icon: Bell },
  { path: '/student/settings', label: 'ตั้งค่า', icon: Settings },
];

const adminItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'จัดการผู้ใช้งาน', icon: Users },
  { path: '/admin/students', label: 'จัดการนักศึกษา', icon: Users },
  { path: '/admin/instructors', label: 'จัดการอาจารย์', icon: Users },
  { path: '/admin/projects', label: 'จัดการโครงงาน', icon: BookOpen },
  { path: '/admin/criteria', label: 'จัดการเกณฑ์ประเมิน', icon: CheckSquare },
  { path: '/admin/reports', label: 'รายงาน', icon: FileText },
];

export const Sidebar: React.FC<SidebarProps> = ({ role, isCollapsed = false, onToggle, onLogout, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = role === 'instructor' ? instructorItems : role === 'student' ? studentItems : adminItems;
  const bgColor = role === 'student' ? 'bg-[#065F46]' : 'bg-[#063B78]';
  const hoverBg = role === 'student' ? 'hover:bg-[#047857]' : 'hover:bg-[#032A57]';
  const activeBg = role === 'student' ? 'bg-[#047857]' : 'bg-[#032A57]';

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${bgColor} text-white transition-all duration-300 font-sans ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && <span className="font-bold text-lg truncate">ระบบจัดการโครงงาน</span>}
        {onToggle && (
          <button onClick={onToggle} className="p-2 rounded hover:bg-white/10 text-white focus:outline-none">
            {isCollapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/20">
        <nav className="space-y-1 px-2">
          {items.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${isActive ? activeBg : hoverBg}`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} className="min-w-[20px]" />
                {!isCollapsed && <span className="ml-3 truncate text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center p-3 rounded-lg text-red-300 hover:bg-white/10 transition-colors focus:outline-none"
          title={isCollapsed ? "ออกจากระบบ" : undefined}
        >
          <LogOut size={20} className="min-w-[20px]" />
          {!isCollapsed && <span className="ml-3 text-sm">ออกจากระบบ</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
