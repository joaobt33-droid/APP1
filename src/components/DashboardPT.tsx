import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Activity, 
  CircleDollarSign, 
  Clock, 
  ArrowUpRight,
  Plus,
  Search
} from 'lucide-react';

export function DashboardPT() {
  const stats = [
    { label: 'Alunos Ativos', value: '24', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Treinos p/ Hoje', value: '12', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Renda Mensal', value: 'R$ 8.400', icon: CircleDollarSign, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Pagamentos Pend.', value: '3', icon: Clock, color: 'text-red-500', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Bom dia, Coach</h1>
          <p className="text-zinc-500">Aqui está o que está acontecendo com sua consultoria hoje.</p>
        </div>
        <button className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
          <Plus size={20} />
          <span>Novo Aluno</span>
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm group hover:border-emerald-500/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight className="text-zinc-600 group-hover:text-emerald-500 transition-colors" size={20} />
            </div>
            <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Students */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Alunos Recentes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar aluno..." 
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors w-64"
              />
            </div>
          </div>
          
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-lg font-bold">
                  {['JD', 'MA', 'RL', 'TC'][i]}
                </div>
                <div>
                  <h4 className="font-bold">Aluno {i + 1}</h4>
                  <p className="text-xs text-zinc-500">Hipertrofia • 3x por semana</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-emerald-500 text-sm mb-1">
                  <Activity size={14} />
                  <span>Treinou hoje</span>
                </div>
                <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-3/4 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback / Notifications */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-6">Feedbacks</h2>
          {[1, 2].map((_, i) => (
            <div key={i} className="p-4 rounded-xl border border-dashed border-white/10 bg-emerald-500/5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold">
                  JD
                </div>
                <span className="text-sm font-bold">João Silva</span>
              </div>
              <p className="text-sm text-zinc-400 italic">"O treino de hoje foi excelente, senti muito o posterior de coxa. Consegui progredir 5kg no agachamento!"</p>
              <div className="mt-4 flex space-y-2 flex-col">
                <button className="text-xs text-emerald-500 font-bold hover:underline">Responder Feedback</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
