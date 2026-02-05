<template>
  <div class="col-12 col-md-4 q-pa-sm">
    <div class="column-container bg-grey-2 q-pa-md rounded-borders">

      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6 text-weight-bold text-grey-9">{{ title }}</div>
        <q-badge color="primary" rounded>{{ tasks.length }}</q-badge>
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
          />
        </template>

        <template #footer v-if="tasks.length === 0">
          <div class="empty-drop-zone text-center q-pa-xl text-grey-5">
            Solte aqui
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

defineProps<{
  title: string;
  tasks: Task[];
}>();

defineEmits(['delete-task', 'update-tasks']);
</script>

<style scoped>
.column-container {
  min-height: 600px;
  border: 1px solid #e0e0e0;
}

.tasks-list-container {
  min-height: 500px; /* Área grande para facilitar o drop em colunas vazias */
}

.ghost-card {
  opacity: 0.5;
  background: #c8ebfb;
  border: 2px dashed #2196f3;
}

.empty-drop-zone {
  border: 2px dashed #bdbdbd;
  border-radius: 8px;
}
</style>
