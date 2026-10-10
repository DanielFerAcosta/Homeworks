import { inject } from '@angular/core';
import { TasksService } from '../services/tasks';

export function useTasks() {
  const service = inject(TasksService);

  return {
    tasks: service.tasks,
    loading: service.loading,
    error: service.error,
    pendingCount: service.pendingCount,
    completedCount: service.completedCount,

    create: (title: string, description: string) => {
      return service.create(title, description);
    },

    update: (
      id: string,
      title: string,
      description: string
    ) => {
      return service.update(id, title, description);
    },

    setCompleted: (id: string, completed: boolean) => {
      return service.setCompleted(id, completed);
    },

    delete: (id: string) => {
      return service.delete(id);
    }
  };
}