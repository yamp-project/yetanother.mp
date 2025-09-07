<script setup lang="ts">
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";

const { 
  user, 
  hasAlphaAccess, 
  alphaApplication, 
  loading, 
  login, 
  applyForAlpha, 
  withdrawApplication 
} = useAuth();

const buttonState = computed(() => {
  if (loading.value) return { text: "Loading…", disabled: true, action: null };
  if (!user.value) return { text: "Login with Discord", disabled: false, action: "login" };
  if (!hasAlphaAccess.value) return { text: "No Access", disabled: true, action: null };

  switch (alphaApplication.value.status) {
    case "pending":
      return { text: "Withdraw Application", disabled: false, action: "withdraw" };
    case "approved":
      return { text: "Alpha Access Granted", disabled: true, action: null };
    case "rejected":
      return { text: "Apply Again", disabled: false, action: "apply" };
    default:
      return { text: "Apply for Alpha", disabled: false, action: "apply" };
  }
});

const buttonClass = computed(() => {
  const base = "flex items-center gap-2 px-4 py-2 rounded-[10px] font-semibold transition-colors cursor-pointer";
  
  if (buttonState.value.disabled) {
    return `${base} text-gray-400 bg-gray-700 cursor-not-allowed`;
  }
  
  if (buttonState.value.action === "withdraw") {
    return `${base} text-white bg-red-500 hover:bg-red-600`;
  }
  
  if (alphaApplication.value.status === "approved") {
    return `${base} text-white bg-green-600 cursor-not-allowed`;
  }
  
  return `${base} text-white bg-purple-400 hover:bg-purple-500`;
});

function handleClick() {
  if (buttonState.value.disabled) return;
  
  switch (buttonState.value.action) {
    case "login":
      login();
      break;
    case "apply":
      applyForAlpha();
      break;
    case "withdraw":
      withdrawApplication();
      break;
  }
}
</script>

<template>
  <div class="flex items-center gap-3">
    
    
    <div class="flex flex-col items-end">
      <button
        v-if="alphaApplication.status !== 'approved'"
        @click="handleClick"
        :disabled="buttonState.disabled"
        :class="buttonClass"
      >
        <svg v-if="!user" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
          />
        </svg>
        {{ buttonState.text }}
      </button>
    </div>
  </div>
</template>
