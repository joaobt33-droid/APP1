import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  addDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbService = {
  async getUser(uid: string) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `users/${uid}`);
    }
  },

  async createUser(uid: string, data: any) {
    try {
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, { ...data, createdAt: new Date().toISOString() });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}`);
    }
  },

  async getStudents(ptId: string) {
    try {
      const q = query(collection(db, 'students'), where('ptId', '==', ptId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'students');
    }
  },

  async getActivePlan(studentId: string) {
    try {
      const q = query(
        collection(db, 'plans'), 
        where('studentId', '==', studentId),
        where('status', '==', 'active')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0] || null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'plans');
    }
  },

  async getWorkouts(planId: string) {
    try {
      const q = query(collection(db, 'workouts'), where('planId', '==', planId), orderBy('order'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'workouts');
    }
  },

  async getExercises(workoutId: string) {
    try {
      const q = query(collection(db, 'exerciseInstances'), where('workoutId', '==', workoutId), orderBy('order'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'exerciseInstances');
    }
  },

  async saveWorkoutLog(log: any) {
    try {
      await addDoc(collection(db, 'logs'), { ...log, completedAt: new Date().toISOString() });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'logs');
    }
  }
};
