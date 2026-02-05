<template>
  <q-page class="bg-grey-1 q-pa-md">
    <div class="row q-col-gutter-md justify-center">
      <kanban-column
        v-for="col in columns"
        :key="col.id"
        :title="col.title"
        :tasks="col.tasks"
        @delete-task="removeTask"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Column } from 'src/components/models';
import KanbanColumn from 'src/components/KanbanColumn.vue';

const columns = ref<Column[]>([
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Tarefa 1', description: 'Descrição tarefa 1', priority: 'high' }
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    tasks: [
      { id: '2', title: 'Tarefa 2', description: 'Descrição tarefa 2', priority: 'medium' }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: []
  }
]);

const removeTask = (taskId: string) => {
  columns.value.forEach(col => {
    col.tasks = col.tasks.filter(t => t.id !== taskId);
  });
};
</script>
