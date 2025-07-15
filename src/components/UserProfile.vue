<script setup lang="ts">
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";
import StatusBadge from "./StatusBadge.vue";

interface Props {
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
});

const { user, alphaApplication } = useAuth();

const formatDate = (timestamp?: number) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const avatarUrl = computed(() => {
  if (!user.value?.avatar) return "";
  return `https://cdn.discordapp.com/avatars/${user.value.id}/${user.value.avatar}.png?size=128`;
});
</script>

<template>
  <div v-if="user" class="flex items-center gap-3">
    <div class="flex items-center gap-2">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="`${user.username}'s avatar`"
        :class="[
          'rounded-full border border-white/10',
          props.compact ? 'w-8 h-8' : 'w-10 h-10',
        ]"
      />
      <div v-else :class="[
        'rounded-full border border-white/10 bg-purple-600 flex items-center justify-center font-bold text-white',
        props.compact ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-lg',
      ]">
        {{ user.username[0].toUpperCase() }}
      </div>
      
      <div v-if="!props.compact" class="flex flex-col">
        <span class="text-white font-medium">{{ user.username }}</span>
        <span v-if="alphaApplication.appliedAt" class="text-gray-400 text-xs">
          Applied {{ formatDate(alphaApplication.appliedAt) }}
        </span>
      </div>
    </div>

    <div v-if="!props.compact" class="flex flex-col items-end gap-1">
      <StatusBadge :status="alphaApplication.status" size="sm" />
      <span v-if="alphaApplication.status === 'approved' && alphaApplication.approvedAt" class="text-gray-400 text-xs">
        Approved {{ formatDate(alphaApplication.approvedAt) }}
      </span>
    </div>
  </div>
</template>