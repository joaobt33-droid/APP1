export type UserRole = 'pt' | 'student';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  ptId: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  bodyFat?: number;
  pathologies?: string;
  limitations?: string;
  medications?: string;
  objectives: string;
  trainingLevel: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface WorkoutPlan {
  id: string;
  title: string;
  ptId: string;
  studentId: string;
  goal: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'draft' | 'completed';
}

export interface Workout {
  id: string;
  planId: string;
  name: string;
  description?: string;
  order: number;
}

export interface ExerciseInstance {
  id: string;
  workoutId: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe?: number;
  notes?: string;
  order: number;
}

export interface WorkoutLog {
  id: string;
  studentId: string;
  workoutId: string;
  completedAt: string;
  duration?: number;
  feedback?: string;
  effort?: number;
  mood?: string;
}

export interface FinancialRecord {
  id: string;
  ptId: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}
