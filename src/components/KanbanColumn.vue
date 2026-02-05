<template>
  <div class="col-12 col-md-4 q-pa-sm">
    <div class="column-container bg-grey-2 q-pa-md rounded-borders">

      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6 text-weight-bold text-grey-9">
          {{ title }}
        </div>
        <q-badge color="primary" rounded class="q-px-sm">
          {{ tasks.length }}
        </q-badge>
      </div>

      <div class="tasks-wrapper">
        <div v-if="tasks.length > 0">
          <task-card
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @delete="$emit('delete-task', $event)"
          />
        </div>

        <div v-else class="empty-state text-center q-pa-xl text-grey-6">
          <q-icon name="assignment" size="32px" class="q-mb-xs" />
          <div class="text-caption">Nenhuma tarefa</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Importamos apenas o tipo para seguir a regra do ESLint
import type { Task } from './models';
import TaskCard from './TaskCard.vue';

// Definição das Propriedades
defineProps<{
  title: string;
  tasks: Task[];
}>();

// Definição dos Eventos
defineEmits<{
  (e: 'delete-task', id: string): void;
}>();
</script>

<style scoped>
.column-container {
  min-height: 500px;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.tasks-wrapper {
  /* Garante que a área de tarefas tenha um preenchimento mínimo */
  min-height: 100px;
}

.empty-state {
  border: 2px dashed #bdbdbd;
  border-radius: 8px;
}
</style>
