import React from 'react';
import { 
  CircleDollarSign, 
  TrendingUp, 
  ArrowDownRight, 
  ArrowUpRight,
  Filter,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export function Financeiro() {
  const cards = [
    { label: 'Receita Total (Mês)', value: 'R$ 12.450,00', change: '+12%', icon: trendingUp => <TrendingUp size={20} />, up: true },
    { label: 'Recebido', value: 'R$ 8.900,00', change: '71%', icon: check => <CheckCircle2 size={20} />, up: true },
    { label: 'Pendente', value: 'R$ 3.550,00', change: '29%', icon: clock => <Clock size={20} />, up: false },
    { label: 'Em Atraso', value: 'R$ 450,00', change: '-2%', icon: alert => <AlertCircle size={20} />, up: false },
  ];

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Gestão Financeira</h1>
          <p className="text-zinc-500">Controle seus ganhos, mensalidades e inadimplência em um só lugar.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10">
            <Filter size={18} />
            <span>Filtrar</span>
          </button>
          <button className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-xl font-bold transition-all">
            <Download size={18} />
            <span>Exportar Relatório</span>
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-32"
          >
             <div className="flex justify-between items-start">
               <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">{card.label}</span>
               <div className={card.up ? 'text-emerald-500' : 'text-zinc-600'}>
                  {card.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
               </div>
             </div>
             <div className="flex items-end justify-between">
                <h3 className="text-xl font-black">{card.value}</h3>
                <span className={cn("text-xs font-bold", card.up ? "text-emerald-500" : "text-red-500")}>{card.change}</span>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-white/[0.01] border border-white/5">
        <h3 className="text-xl font-bold mb-8 flex items-center space-x-2">
           <Calendar size={20} className="text-emerald-500" />
           <span>Pagamentos do Mês</span>
        </h3>

        <div className="space-y-1">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-bold uppercase tracking-widest text-zinc-600 border-b border-white/5 mb-4">
             <div className="col-span-4">Aluno</div>
             <div className="col-span-3 text-center">Data Venc.</div>
             <div className="col-span-2 text-right">Valor</div>
             <div className="col-span-3 text-right">Status</div>
          </div>

          {[
            { name: 'Ricardo Martins', date: '15 Mai, 2026', amount: 'R$ 250,00', status: 'pago' },
            { name: 'Fernanda Lima', date: '18 Mai, 2026', amount: 'R$ 380,00', status: 'pendente' },
            { name: 'Sérgio Santos', date: '10 Mai, 2026', amount: 'R$ 200,00', status: 'atrasado' },
            { name: 'Ana Paula', date: '22 Mai, 2026', amount: 'R$ 250,00', status: 'pago' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center rounded-xl transition-colors cursor-pointer"
            >
               <div className="col-span-4 font-bold flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/5" />
                  <span>{item.name}</span>
               </div>
               <div className="col-span-3 text-center text-sm text-zinc-400">{item.date}</div>
               <div className="col-span-2 text-right font-mono text-sm">{item.amount}</div>
               <div className="col-span-3 flex justify-end">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                    item.status === 'pago' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                    item.status === 'pendente' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                    'bg-red-500/10 text-red-500 border border-red-500/20'
                  )}>
                    {item.status}
                  </span>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
