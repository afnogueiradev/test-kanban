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

// Estado das colunas conforme requisitos
const columns = ref<Column[]>([
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] }
]);

/**
 * Abre o QDialog para cadastro da tarefa
 * Requisitos: Título (obrigatório), Descrição (opcional) e Prioridade (Badge colorido)
 */
const openNewTaskDialog = () => {
  $q.dialog({
    title: '📝 Nova Tarefa',
    message: 'Insira o título da tarefa (mínimo 3 caracteres):',
    prompt: {
      model: '',
      type: 'text',
      label: 'Título (obrigatório)',
      isValid: (val: string) => val.length >= 3,
    },
    cancel: true,
    persistent: true
  }).onOk((title: string) => {
    // Segundo passo: Descrição
    $q.dialog({
      title: 'Descrição',
      message: 'Insira detalhes adicionais:',
      prompt: {
        model: '',
        type: 'textarea',
        label: 'Descrição (opcional)',
      },
      cancel: true,
      persistent: true
    }).onOk((description: string) => {
      // Terceiro passo: Prioridade
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
          title: title,
          description: description || 'Sem descrição adicional',
          priority: action.id as Priority
        };

        // Adiciona na coluna "To Do"
        columns.value[0]!.tasks.push(newTask);

        $q.notify({
          type: 'positive',
          message: 'Tarefa criada com sucesso!',
          position: 'top'
        });
      });
    });
  });
};

// Persistência Offline-first
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      columns.value = JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao restaurar dados', e);
    }
  }
});

// Watch para salvar automaticamente qualquer alteração
watch(columns, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
}, { deep: true });

const removeTask = (taskId: string) => {
  columns.value.forEach(col => {
    col.tasks = col.tasks.filter(t => t.id !== taskId);
  });
};
</script>

<style scoped>
.q-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
