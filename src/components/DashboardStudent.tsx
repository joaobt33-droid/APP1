import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Calendar, 
  TrendingUp, 
  Award,
  Clock,
  Droplets,
  Scale,
  ChevronRight
} from 'lucide-react';

export function DashboardStudent() {
  const habits = [
    { label: 'Hidratação', value: '2.5L', goal: '3L', icon: Droplets, color: 'text-blue-500' },
    { label: 'Sono', value: '7h', goal: '8h', icon: Clock, color: 'text-purple-500' },
    { label: 'Peso', value: '82kg', goal: '78kg', icon: Scale, color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Olá, João</h1>
          <p className="text-zinc-500">Pronto para o treino de hoje? O foco é <span className="text-white font-bold">Inferiores & Cardio</span>.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Training Card */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl aspect-video bg-gradient-to-br from-zinc-800 to-black border border-white/10 p-10 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="text-black ml-1" fill="currentColor" size={28} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Treino do Dia</span>
              </div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter">Lower Body <br/> Shred V2</h2>
            </div>

            <div className="flex items-center space-x-8 text-sm text-zinc-400">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>65 min</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} />
                <span>Alta Intensidade</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award size={16} />
                <span>+250 XP</span>
              </div>
            </div>
          </motion.div>

          {/* Progress Mini Chart Placeholder */}
          <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Sua Frequência Semanal</h3>
              <span className="text-emerald-500 text-sm font-bold">Excelente!</span>
            </div>
            <div className="flex justify-between items-end h-32 gap-3">
              {[60, 80, 40, 100, 70, 0, 0].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className={cn(
                      "w-full rounded-t-lg transition-colors",
                      h === 100 ? "bg-emerald-500" : "bg-white/10"
                    )}
                  />
                  <span className="text-[10px] text-zinc-500">['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Habits Container */}
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-6">
            <h3 className="font-bold flex items-center justify-between">
              Hábitos Diários
              <Settings size={16} className="text-zinc-500 cursor-pointer" />
            </h3>
            <div className="space-y-4">
              {habits.map((habit) => (
                <div key={habit.label} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <habit.icon size={14} className={habit.color} />
                      <span className="text-zinc-400">{habit.label}</span>
                    </div>
                    <span className="font-bold">{habit.value} / {habit.goal}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full bg-current", habit.color)} 
                      style={{ width: '75%' }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Sessions */}
          <div className="space-y-4">
            <h3 className="font-bold">Próximas Sessões</h3>
            {[1, 2].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 cursor-pointer transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-emerald-500 font-bold uppercase">Maio</span>
                    <span className="text-sm font-black">{14 + i}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Push Day (Peito/Tríceps)</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">08:00 AM</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-zinc-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
