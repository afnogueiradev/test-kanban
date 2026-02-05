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
import { ref, watch, onMounted } from 'vue';
import type { Column } from 'src/components/models';
import KanbanColumn from 'src/components/KanbanColumn.vue';

// Chave única para o armazenamento local
const STORAGE_KEY = 'kanban-tasks-v1';

// Estado inicial das colunas
const columns = ref<Column[]>([
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] }
]);

// 1. CARREGAR DADOS (Ao montar o componente)
onMounted(() => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      columns.value = JSON.parse(savedData);
    } catch (e) {
      console.error('Erro ao carregar dados do localStorage', e);
    }
  } else {
    // Caso não tenha dados, carregamos um exemplo inicial
    columns.value[0]?.tasks.push({
      id: '1',
      title: 'Minha primeira tarefa',
      description: 'Arraste-me para testar!',
      priority: 'medium'
    });
  }
});

// 2. SALVAR AUTOMATICAMENTE (Sempre que algo mudar)
// O deep: true é essencial para detectar mudanças dentro dos arrays das colunas
watch(columns, (newColumns) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newColumns));
}, { deep: true });

const removeTask = (taskId: string) => {
  columns.value.forEach(col => {
    col.tasks = col.tasks.filter(t => t.id !== taskId);
  });
};
</script>
