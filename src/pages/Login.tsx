import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Eye, EyeOff, LogIn } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'instructor' | 'student'>('instructor');
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoAccounts = [
    { role: 'admin' as const, username: 'admin', password: 'admin123', label: 'Administrator', icon: '👨‍💼' },
    { role: 'instructor' as const, username: 'instructor', password: 'inst123', label: 'Instructor', icon: '👨‍🏫' },
    { role: 'student' as const, username: 'student', password: 'stud123', label: 'Student', icon: '👨‍🎓' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      const user = { admin: '/admin', instructor: '/instructor', student: '/student' };
      navigate(user[selectedRole] || '/instructor');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    setUsername(account.username);
    setPassword(account.password);
    setSelectedRole(account.role);
    const success = login(account.username, account.password);
    if (success) {
      navigate(`/${account.role}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#032A57] via-[#063B78] to-[#0a4a8f] p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            ระบบจัดการโครงงานนักศึกษา
          </h1>
          <p className="text-blue-200 text-sm">
            Student Project Management & Learning Analytics
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            เข้าสู่ระบบ
          </h2>

          {/* Demo Quick Login */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-3 text-center">เข้าสู่ระบบด่วน (Demo)</p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  onClick={() => handleDemoLogin(account)}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedRole === account.role
                      ? 'border-[#063B78] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl mb-1">{account.icon}</span>
                  <span className="text-xs font-medium text-gray-700">{account.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xs text-gray-400">หรือ</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#063B78] focus:border-transparent outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#063B78] focus:border-transparent outline-none transition-all text-sm pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#063B78] hover:bg-[#032A57] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              เข้าสู่ระบบ
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            ภาควิชาวิศวกรรมคอมพิวเตอร์ • มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
          </p>
        </div>
      </div>
    </div>
  );
}
