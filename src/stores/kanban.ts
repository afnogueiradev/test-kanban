import { defineStore } from 'pinia';
import type { Column, Task, Priority } from 'src/components/models';

const STORAGE_KEY = 'kanban-data-v1';

export const useKanbanStore = defineStore('kanban', {
  state: () => ({
    columns: [
      { id: 'todo', title: 'To Do', tasks: [] },
      { id: 'progress', title: 'In Progress', tasks: [] },
      { id: 'done', title: 'Done', tasks: [] }
    ] as Column[]
  }),

  actions: {
    // Carregar dados salvos
    loadFromStorage() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          this.columns = JSON.parse(saved);
        } catch (e) {
          console.error('Erro ao restaurar dados:', e);
        }
      }
    },

    // Salvar dados manualmente ou via watcher
    saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.columns));
    },

    addTask(title: string, description: string, priority: Priority) {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        priority
      };
      this.columns[0]!.tasks.push(newTask);
      this.saveToStorage();
    },

    updateTask() {
    // Apenas dispara o salvamento, já que a reatividade cuidou da alteração
      this.saveToStorage();
    },

    removeTask(taskId: string) {
      this.columns.forEach(col => {
        col.tasks = col.tasks.filter(t => t.id !== taskId);
      });
      this.saveToStorage();
    }
  }
});
