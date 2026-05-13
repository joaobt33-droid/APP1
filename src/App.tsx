import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { Layout } from './components/Layout';
import { DashboardPT } from './components/DashboardPT';
import { DashboardStudent } from './components/DashboardStudent';
import { WorkoutBuilder } from './components/WorkoutBuilder';
import { Financeiro } from './components/Financeiro';
import { Dumbbell } from 'lucide-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  return <Layout>{children}</Layout>;
}

function Login() {
  const { login } = useAuth();
  
  return (
    <div className="h-screen bg-[#0A0A0A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full" />

      <div className="max-w-md w-full space-y-8 text-center relative z-10">
        <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-8">
          <Dumbbell className="text-white w-10 h-10" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            Trainer<span className="text-emerald-500">Pro</span>
          </h1>
          <p className="text-zinc-500 text-lg">A evolução da sua consultoria esportiva começa aqui.</p>
        </div>

        <button 
          onClick={login}
          className="w-full flex items-center justify-center space-x-3 bg-white text-black py-4 px-6 rounded-xl font-bold hover:bg-zinc-200 transition-all active:scale-[0.98] mt-10"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          <span>Entrar com Google</span>
        </button>
        
        <p className="text-zinc-600 text-xs mt-8 font-medium">
          Ao entrar, você concorda com nossos <span className="underline cursor-pointer">Termos de Uso</span> e <span className="underline cursor-pointer">Privacidade</span>.
        </p>
      </div>
    </div>
  );
}

function Home() {
  const { profile } = useAuth();
  return profile?.role === 'pt' ? <DashboardPT /> : <DashboardStudent />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/treinos" element={
            <ProtectedRoute>
              <WorkoutBuilder />
            </ProtectedRoute>
          } />
          <Route path="/financeiro" element={
            <ProtectedRoute>
              <Financeiro />
            </ProtectedRoute>
          } />
          {/* Add more routes here */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
