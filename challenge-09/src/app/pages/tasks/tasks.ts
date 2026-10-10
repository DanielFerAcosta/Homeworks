import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Task } from '../../models/task';
import { useAuth } from '../../hooks/use-auth';
import { useTasks } from '../../hooks/use-tasks';
import { getAuthErrorMessage } from '../../../firebase/auth-errors';

type TaskFilter = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.sass'
})
export class Tasks {
readonly authService = useAuth();
readonly tasksService = useTasks();

  private readonly router = inject(Router);

  title = '';
  description = '';

  readonly editingId = signal<string | null>(null);
  readonly filter = signal<TaskFilter>('all');

  readonly saving = signal(false);
  readonly signingOut = signal(false);
  readonly busyTaskId = signal<string | null>(null);

  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  readonly visibleTasks = computed(() => {
    const tasks = this.tasksService.tasks();

    switch (this.filter()) {
      case 'pending':
        return tasks.filter(task => !task.completed);

      case 'completed':
        return tasks.filter(task => task.completed);

      default:
        return tasks;
    }
  });

  async saveTask(): Promise<void> {
    if (this.saving()) {
      return;
    }

    this.clearMessages();

    if (!this.title.trim()) {
      this.errorMessage.set('Escribe el título de la tarea.');
      return;
    }

    this.saving.set(true);

    try {
      const id = this.editingId();

      if (id) {
        await this.tasksService.update(
          id,
          this.title,
          this.description
        );

        this.successMessage.set('Tarea actualizada.');
      } else {
        await this.tasksService.create(
          this.title,
          this.description
        );

        this.successMessage.set('Tarea creada.');
      }

      this.resetForm();
    } catch (error: unknown) {
      console.error('Error al guardar tarea:', error);

      this.errorMessage.set(
        'No se pudo guardar la tarea. Revisa la conexión y los permisos de Firestore.'
      );
    } finally {
      this.saving.set(false);
    }
  }

  startEdit(task: Task): void {
    this.clearMessages();

    this.editingId.set(task.id);
    this.title = task.title;
    this.description = task.description;
  }

  cancelEdit(): void {
    this.resetForm();
    this.clearMessages();
  }

  async toggleTask(task: Task): Promise<void> {
    if (this.busyTaskId()) {
      return;
    }

    this.clearMessages();
    this.busyTaskId.set(task.id);

    try {
      await this.tasksService.setCompleted(
        task.id,
        !task.completed
      );
    } catch (error: unknown) {
      console.error('Error al cambiar estado:', error);

      this.errorMessage.set(
        'No se pudo cambiar el estado de la tarea.'
      );
    } finally {
      this.busyTaskId.set(null);
    }
  }

  async deleteTask(task: Task): Promise<void> {
    if (this.busyTaskId()) {
      return;
    }

    const approved = window.confirm(
      `¿Eliminar la tarea "${task.title}"?`
    );

    if (!approved) {
      return;
    }

    this.clearMessages();
    this.busyTaskId.set(task.id);

    try {
      await this.tasksService.delete(task.id);

      if (this.editingId() === task.id) {
        this.resetForm();
      }

      this.successMessage.set('Tarea eliminada.');
    } catch (error: unknown) {
      console.error('Error al eliminar tarea:', error);

      this.errorMessage.set('No se pudo eliminar la tarea.');
    } finally {
      this.busyTaskId.set(null);
    }
  }

  async logout(): Promise<void> {
    if (this.signingOut()) {
      return;
    }

    this.clearMessages();
    this.signingOut.set(true);

    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } catch (error: unknown) {
      this.errorMessage.set(getAuthErrorMessage(error));
    } finally {
      this.signingOut.set(false);
    }
  }

  private resetForm(): void {
    this.editingId.set(null);
    this.title = '';
    this.description = '';
  }

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }
}