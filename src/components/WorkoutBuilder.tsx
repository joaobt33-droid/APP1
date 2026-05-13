import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Plus, 
  Save, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { generateWorkout } from '../lib/ai';
import { cn } from '../lib/utils';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface Workout {
  name: string;
  description: string;
  exercises: Exercise[];
}

export function WorkoutBuilder() {
  const [loading, setLoading] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [formData, setFormData] = useState({
    objective: 'Hipertrofia',
    level: 'Intermediário',
    limitations: 'Nenhuma',
    availability: 4,
    equipment: 'Academia completa'
  });

  const handleAIDesk = async () => {
    setLoading(true);
    try {
      const data = await generateWorkout(formData);
      if (data.workouts) {
        setWorkouts(data.workouts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Editor de Treino</h1>
          <p className="text-zinc-500">Combine seu conhecimento com nossa <span className="text-emerald-500 font-bold italic">Inteligência Artificial</span>.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10">
            <Save size={20} />
            <span>Salvar Rascunho</span>
          </button>
          <button className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all">
            <span>Publicar Treino</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* IA Generator Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-emerald-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 -rotate-12 translate-x-4 opacity-10">
              <Sparkles size={120} className="text-emerald-500" />
            </div>
            
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center space-x-2">
              <Sparkles className="text-emerald-500" size={24} />
              <span>Gerador IA</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Objetivo Principal</label>
                <select 
                  value={formData.objective}
                  onChange={(e) => setFormData({...formData, objective: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option>Hipertrofia</option>
                  <option>Emagrecimento</option>
                  <option>Força Máxima</option>
                  <option>Condicionamento Físico</option>
                  <option>Reabilitação</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Nível do Aluno</label>
                <select 
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option>Iniciante</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                  <option>Atleta</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Disponibilidade (Dias/Semana)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="7"
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: Number(e.target.value)})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">Limitações / Lesões</label>
                <textarea 
                  value={formData.limitations}
                  onChange={(e) => setFormData({...formData, limitations: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none transition-colors min-h-[80px]"
                  placeholder="Ex: Hérnia de disco, dor no ombro..."
                />
              </div>

              <button 
                onClick={handleAIDesk}
                disabled={loading}
                className="w-full py-4 bg-emerald-500 text-black font-black uppercase text-sm rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Gerar Treino Completo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Workout Editor Main */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {workouts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[500px] border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-zinc-500 space-y-4"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                  <Plus size={32} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-white">Nenhum treino montado</p>
                  <p className="text-sm">Use o gerador IA ao lado ou comece do zero.</p>
                </div>
                <button 
                  onClick={() => setWorkouts([{ name: 'Treino A', description: 'Foco em Superiores', exercises: [] }])}
                  className="text-emerald-500 font-bold hover:underline"
                >
                  Criar Primeiro Bloco Manualmente
                </button>
              </motion.div>
            ) : (
              workouts.map((workout, wIdx) => (
                <motion.div 
                  key={wIdx}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black italic">
                        {String.fromCharCode(65 + wIdx)}
                      </div>
                      <input 
                        value={workout.name}
                        onChange={(e) => {
                          const newWorkouts = [...workouts];
                          newWorkouts[wIdx].name = e.target.value;
                          setWorkouts(newWorkouts);
                        }}
                        className="bg-transparent text-xl font-bold focus:outline-none border-b border-transparent focus:border-emerald-500 pb-1"
                      />
                    </div>
                    <button 
                      onClick={() => setWorkouts(workouts.filter((_, i) => i !== wIdx))}
                      className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {workout.exercises.map((ex, eIdx) => (
                      <div key={eIdx} className="grid grid-cols-12 gap-4 p-4 rounded-xl bg-black/40 border border-white/5 items-center group">
                        <div className="col-span-5">
                          <label className="text-[9px] uppercase tracking-tighter text-zinc-600 font-bold block mb-1">Exercício</label>
                          <p className="font-bold text-sm">{ex.name}</p>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[9px] uppercase tracking-tighter text-zinc-600 font-bold block mb-1">Séries</label>
                          <p className="font-bold text-sm text-center">{ex.sets}x</p>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[9px] uppercase tracking-tighter text-zinc-600 font-bold block mb-1">Reps</label>
                          <p className="font-bold text-sm">{ex.reps}</p>
                        </div>
                        <div className="col-span-2 text-right">
                          <label className="text-[9px] uppercase tracking-tighter text-zinc-600 font-bold block mb-1 text-right">Rest</label>
                          <p className="text-zinc-400 text-xs font-mono">{ex.rest}</p>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <button className="opacity-0 group-hover:opacity-100 p-1 text-zinc-700 hover:text-red-400 transition-all">
                             <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-xl text-zinc-600 hover:text-white hover:border-white/10 transition-all flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest">
                       <Plus size={14} />
                       <span>Adicionar Exercício</span>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
