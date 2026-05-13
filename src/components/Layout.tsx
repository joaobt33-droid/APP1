import React from 'react';
import { useAuth } from './AuthContext';
import { 
  Dumbbell, 
  Users, 
  LayoutDashboard, 
  Calendar, 
  Wallet, 
  MessageSquare, 
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, profile, logout } = useAuth();
  const location = useLocation();

  const menuItems = profile?.role === 'pt' ? [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Alunos', path: '/alunos' },
    { icon: Dumbbell, label: 'Treinos', path: '/treinos' },
    { icon: Calendar, label: 'Agenda', path: '/agenda' },
    { icon: Wallet, label: 'Financeiro', path: '/financeiro' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
  ] : [
    { icon: LayoutDashboard, label: 'Painel', path: '/' },
    { icon: Dumbbell, label: 'Meus Treinos', path: '/meus-treinos' },
    { icon: TrendingUp, label: 'Evolução', path: '/evolucao' },
    { icon: Award, label: 'Conquistas', path: '/conquistas' },
    { icon: MessageSquare, label: 'Consultoria', path: '/chat' },
  ];

  if (!user) return <>{children}</>;

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col p-6 space-y-8 h-full bg-[#0F0F0F]/50 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Dumbbell className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">Trainer<span className="text-emerald-500">Pro</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg transition-colors group",
                  location.pathname === item.path 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {location.pathname === item.path && <ChevronRight size={16} />}
              </motion.div>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 flex flex-col space-y-4">
          <button 
            onClick={logout}
            className="flex items-center space-x-3 p-3 text-zinc-500 hover:text-red-400 transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sair</span>
          </button>
          
          <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-xl border border-white/5">
            <img 
              src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
              alt="Avatar" 
              className="w-10 h-10 rounded-lg"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user.displayName || user.email}</p>
              <p className="text-[10px] text-zinc-500 capitalize">{profile?.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
        <div className="absolute top-0 left-0 w-full h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
