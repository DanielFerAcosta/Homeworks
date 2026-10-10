import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal
} from '@angular/core';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

import { updateDoc } from 'firebase/firestore';

import { firestoreDb } from '../../firebase/config';
import { Task } from '../models/task';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly tasksSignal = signal<Task[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal('');

  readonly tasks = this.tasksSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly pendingCount = computed(() => {
    return this.tasksSignal().filter(task => !task.completed).length;
  });

  readonly completedCount = computed(() => {
    return this.tasksSignal().filter(task => task.completed).length;
  });

  constructor() {
    effect((onCleanup) => {
      const user = this.authService.currentUser();

      this.tasksSignal.set([]);
      this.errorSignal.set('');

      if (!isPlatformBrowser(this.platformId) || !user) {
        this.loadingSignal.set(false);
        return;
      }

      this.loadingSignal.set(true);

      const tasksCollection = collection(
        firestoreDb,
        'users',
        user.uid,
        'tasks'
      );

      const unsubscribe = onSnapshot(
        tasksCollection,
        snapshot => {
          const tasks: Task[] = snapshot.docs.map(document => {
            const data = document.data();

            return {
              id: document.id,
              title: String(data['title'] ?? ''),
              description: String(data['description'] ?? ''),
              completed: data['completed'] === true
            };
          });

          tasks.sort((a, b) => {
            return a.title.localeCompare(b.title, 'es');
          });

          this.tasksSignal.set(tasks);
          this.loadingSignal.set(false);
        },
        error => {
          console.error('Error al cargar tareas:', error);

          this.tasksSignal.set([]);
          this.loadingSignal.set(false);
          this.errorSignal.set(
            'No se pudieron cargar las tareas. Revisa la conexión y las reglas de Firestore.'
          );
        }
      );

      onCleanup(unsubscribe);
    });
  }

  async create(title: string, description: string): Promise<void> {
    const uid = this.getUserId();
    const cleanTitle = this.validateTitle(title);

    await addDoc(
      collection(firestoreDb, 'users', uid, 'tasks'),
      {
        title: cleanTitle,
        description: description.trim(),
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    );
  }

  async update(
    id: string,
    title: string,
    description: string
  ): Promise<void> {
    const uid = this.getUserId();
    const cleanTitle = this.validateTitle(title);

    await updateDoc(
      doc(firestoreDb, 'users', uid, 'tasks', id),
      {
        title: cleanTitle,
        description: description.trim(),
        updatedAt: serverTimestamp()
      }
    );
  }

  async setCompleted(id: string, completed: boolean): Promise<void> {
    const uid = this.getUserId();

    await updateDoc(
      doc(firestoreDb, 'users', uid, 'tasks', id),
      {
        completed,
        updatedAt: serverTimestamp()
      }
    );
  }

  async delete(id: string): Promise<void> {
    const uid = this.getUserId();

    await deleteDoc(
      doc(firestoreDb, 'users', uid, 'tasks', id)
    );
  }

  private getUserId(): string {
    const user = this.authService.currentUser();

    if (!user) {
      throw new Error('Debes iniciar sesión.');
    }

    return user.uid;
  }

  private validateTitle(title: string): string {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      throw new Error('La tarea debe tener un título.');
    }

    return cleanTitle;
  }
}