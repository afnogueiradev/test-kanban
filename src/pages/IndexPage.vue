<template>
  <q-page class="bg-grey-1 q-pa-md">
    <div class="row q-col-gutter-md justify-center">
      <kanban-column
        v-for="col in store.columns"
        :key="col.id"
        :title="col.title"
        :tasks="col.tasks"
        @delete-task="store.removeTask"
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
import { onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useKanbanStore } from 'src/stores/kanban'; // Importando a Store
import type { Task, Priority } from 'src/components/models';
import KanbanColumn from 'src/components/KanbanColumn.vue';

const $q = useQuasar();
const store = useKanbanStore();

// Inicialização: Carrega os dados do LocalStorage ao montar a página
onMounted(() => {
  store.loadFromStorage();
});

// Watcher profundo para garantir que qualquer mudança (incluindo drag-and-drop)
// seja persistida automaticamente no LocalStorage através da Store
watch(() => store.columns, () => {
  store.saveToStorage();
}, { deep: true });

/**
 * DIÁLOGO DE CRIAÇÃO
 * Fluxo: Título -> Descrição -> Prioridade
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
    $q.dialog({
      title: 'Descrição',
      message: 'Adicione detalhes da tarefa:',
      prompt: {
        model: '',
        type: 'textarea',
        label: 'Descrição (opcional)'
      },
      cancel: true
    }).onOk((description: string) => {
      $q.bottomSheet({
        message: 'Prioridade:',
        actions: [
          { label: 'Baixa', id: 'low', color: 'positive', icon: 'keyboard_arrow_down' },
          { label: 'Média', id: 'medium', color: 'warning', icon: 'remove' },
          { label: 'Alta', id: 'high', color: 'negative', icon: 'keyboard_arrow_up' }
        ]
      }).onOk((action) => {
        // Chama a action da Store para adicionar
        store.addTask(title, description, action.id as Priority);

        $q.notify({
          type: 'positive',
          message: 'Tarefa criada!',
          position: 'top',
          timeout: 1000
        });
      });
    });
  });
};

/**
 * DIÁLOGO DE EDIÇÃO
 * Fluxo: Título -> Descrição -> Prioridade (com dados pré-preenchidos)
 */
const openEditTaskDialog = (task: Task) => {
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
    $q.dialog({
      title: 'Editar Descrição',
      prompt: {
        model: task.description || '', // Tratamento de tipagem para string vazia
        type: 'textarea',
        label: 'Descrição'
      },
      cancel: true
    }).onOk((newDescription: string) => {
      $q.bottomSheet({
        message: 'Alterar Prioridade:',
        actions: [
          { label: 'Baixa', id: 'low', color: 'positive', icon: 'keyboard_arrow_down' },
          { label: 'Média', id: 'medium', color: 'warning', icon: 'remove' },
          { label: 'Alta', id: 'high', color: 'negative', icon: 'keyboard_arrow_up' }
        ]
      }).onOk((action) => {
        // Atualiza a tarefa diretamente (reatividade do Pinia)
        task.title = newTitle;
        task.description = newDescription;
        task.priority = action.id as Priority;

        // Persiste a mudança
        store.saveToStorage();

        $q.notify({
          type: 'info',
          message: 'Tarefa atualizada!',
          position: 'top',
          timeout: 1000
        });
      });
    });
  });
};
</script>

<style scoped>
.q-page {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
