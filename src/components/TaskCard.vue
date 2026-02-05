<template>
  <q-card class="task-card q-mb-md shadow-2 cursor-pointer" flat bordered>
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <q-badge :color="priorityColor" :label="task.priority.toUpperCase()" />
        <q-btn flat round dense icon="delete" size="sm" color="grey-6" @click.stop="$emit('delete', task.id)" />
      </div>
      <div class="text-subtitle1 text-weight-bold q-mt-sm">{{ task.title }}</div>
    </q-card-section>

    <q-card-section v-if="task.description" class="text-caption text-grey-8">
      {{ task.description }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from './models';

const props = defineProps<{ task: Task }>();
defineEmits(['delete']);

const priorityColor = computed(() => {
  const map = { low: 'positive', medium: 'warning', high: 'negative' };
  return map[props.task.priority];
});
</script>
