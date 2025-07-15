<script setup lang="ts">
interface Props {
  status: "pending" | "approved" | "rejected" | null;
  size?: "sm" | "md";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
});

const getStatusConfig = (status: Props["status"]) => {
  switch (status) {
    case "pending":
      return {
        text: "Pending Review",
        class: "bg-yellow-600/20 text-yellow-200 border-yellow-600/30",
        icon: "⏳",
      };
    case "approved":
      return {
        text: "Approved",
        class: "bg-green-600/20 text-green-200 border-green-600/30",
        icon: "✅",
      };
    case "rejected":
      return {
        text: "Rejected",
        class: "bg-red-600/20 text-red-200 border-red-600/30",
        icon: "❌",
      };
    default:
      return {
        text: "Not Applied",
        class: "bg-gray-600/20 text-gray-200 border-gray-600/30",
        icon: "⚪",
      };
  }
};

const statusConfig = getStatusConfig(props.status);
const sizeClasses = props.size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm";
</script>

<template>
  <div
    :class="[
      'inline-flex items-center gap-1.5 rounded-full font-medium border',
      statusConfig.class,
      sizeClasses,
    ]"
  >
    <span>{{ statusConfig.icon }}</span>
    <span>{{ statusConfig.text }}</span>
  </div>
</template>