<template>
  <div class="col-12 col-md-4 q-pa-sm">
    <div class="column-container bg-grey-2 q-pa-md rounded-borders shadow-1">

      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6 text-weight-bold text-grey-9">{{ title }}</div>
        <q-badge color="primary" rounded class="q-px-sm">{{ tasks.length }}</q-badge>
      </div>

      <draggable
        :list="tasks"
        group="tasks"
        item-key="id"
        class="tasks-list-container"
        ghost-class="ghost-card"
        @change="$emit('update-tasks', tasks)"
      >
        <template #item="{ element }">
          <task-card
            :task="element"
            @delete="$emit('delete-task', $event)"
            @edit="$emit('edit-task', $event)"
          />
        </template>

        <template #footer v-if="tasks.length === 0">
          <div class="empty-drop-zone column flex-center q-pa-xl text-grey-5">
            <q-icon name="drag_indicator" size="md" />
            <div class="text-caption">Arraste algo para aqui</div>
          </div>
        </template>
      </draggable>

    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import type { Task } from './models';
import TaskCard from './TaskCard.vue';

// Definição das Props
defineProps<{
  title: string;
  tasks: Task[];
}>();

// Definição dos Eventos (Emits)
// edit-task: envia o objeto da tarefa completa para edição na IndexPage
// delete-task: envia o ID da tarefa para remoção
defineEmits(['delete-task', 'edit-task', 'update-tasks']);
</script>

<style scoped>
.column-container {
  min-height: 70vh;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.tasks-list-container {
  min-height: 400px; /* Garante área de drop mesmo sem tarefas */
  padding-bottom: 20px;
}

/* Estilo do card enquanto está sendo arrastado */
.ghost-card {
  opacity: 0.4;
  background: #bbdefb !important;
  border: 2px dashed #1976d2 !important;
}

.empty-drop-zone {
  border: 2px dashed #bdbdbd;
  border-radius: 8px;
  opacity: 0.6;
}
</style>
