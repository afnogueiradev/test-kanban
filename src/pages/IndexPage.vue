<template>
  <q-page class="bg-grey-1 q-pa-md">
    <div class="row q-col-gutter-md justify-center">
      <kanban-column
        v-for="col in columns"
        :key="col.id"
        :title="col.title"
        :tasks="col.tasks"
        @delete-task="removeTask"
        @edit-task="openEditTaskDialog"
      />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        label="Nova Tarefa"
        class="q-pr-md"
        @click="openNewTaskDialog"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import type { Column, Task, Priority } from 'src/components/models';
import KanbanColumn from 'src/components/KanbanColumn.vue';

const $q = useQuasar();
const STORAGE_KEY = 'kanban-data-v1';

// 1. ESTADO REATIVO DO BOARD
const columns = ref<Column[]>([
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] }
]);

/**
 * 2. LÓGICA DE CRIAÇÃO (Novo Item)
 */
const openNewTaskDialog = () => {
  $q.dialog({
    title: '📝 Nova Tarefa',
    message: 'Insira o título da tarefa:',
    prompt: {
      model: '',
      type: 'text',
      label: 'Título (obrigatório)',
      isValid: (val: string) => val.length >= 3
    },
    cancel: true,
    persistent: true
  }).onOk((title: string) => {
    // Passo 2: Descrição
    $q.dialog({
      title: 'Descrição',
      message: 'Adicione mais detalhes:',
      prompt: {
        model: '',
        type: 'textarea',
        label: 'Descrição (opcional)'
      },
      cancel: true
    }).onOk((description: string) => {
      // Passo 3: Prioridade
      $q.bottomSheet({
        message: 'Defina a Prioridade:',
        actions: [
          { label: 'Baixa', id: 'low', color: 'positive', icon: 'keyboard_arrow_down' },
          { label: 'Média', id: 'medium', color: 'warning', icon: 'remove' },
          { label: 'Alta', id: 'high', color: 'negative', icon: 'keyboard_arrow_up' }
        ]
      }).onOk((action) => {
        const newTask: Task = {
          id: Date.now().toString(),
          title,
          description: description || 'Sem descrição',
          priority: action.id as Priority
        };
        columns.value[0]!.tasks.push(newTask);
      });
    });
  });
};

/**
 * 3. LÓGICA DE EDIÇÃO (Item Existente)
 */
const openEditTaskDialog = (task: Task) => {
  // Passo 1: Editar Título
  $q.dialog({
    title: 'Editar Tarefa',
    message: 'Altere o título:',
    prompt: {
      model: task.title,
      type: 'text',
      label: 'Título',
      isValid: (val: string) => val.length >= 3
    },
    cancel: true,
    persistent: true
  }).onOk((newTitle: string) => {
    // Passo 2: Editar Descrição
    $q.dialog({
      title: 'Editar Descrição',
      prompt: {
        model: task.description || '', // Correção do erro de tipagem que vimos antes
        type: 'textarea',
        label: 'Descrição'
      },
      cancel: true,
      persistent: true
    }).onOk((newDescription: string) => {
      // Passo 3: Editar Prioridade (O que estava faltando!)
      $q.bottomSheet({
        message: 'Alterar Prioridade:',
        actions: [
          { label: 'Baixa', id: 'low', color: 'positive', icon: 'keyboard_arrow_down' },
          { label: 'Média', id: 'medium', color: 'warning', icon: 'remove' },
          { label: 'Alta', id: 'high', color: 'negative', icon: 'keyboard_arrow_up' }
        ]
      }).onOk((action) => {
        // Atualizamos todos os campos no estado reativo
        task.title = newTitle;
        task.description = newDescription;
        task.priority = action.id as Priority; // Agora a prioridade é atualizada!

        $q.notify({
          type: 'info',
          message: 'Tarefa atualizada com sucesso!',
          timeout: 1000,
          position: 'top'
        });
      });
    });
  });
};

/**
 * 4. REMOÇÃO DE TAREFA
 */
const removeTask = (taskId: string) => {
  $q.dialog({
    title: 'Excluir',
    message: 'Tem certeza que deseja remover esta tarefa?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    columns.value.forEach(col => {
      col.tasks = col.tasks.filter(t => t.id !== taskId);
    });
  });
};

/**
 * 5. PERSISTÊNCIA (OFFLINE-FIRST)
 */
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      columns.value = JSON.parse(saved);
    } catch (e) {
      console.error('Falha ao restaurar dados:', e);
    }
  }
});

watch(columns, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
}, { deep: true });
</script>

<style scoped>
.q-page {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
