<script setup lang="ts">
import { useAuth } from "../composables/useAuth";
import AlphaAccessButton from "./AlphaAccessButton.vue";
import UserProfile from "./UserProfile.vue";

const { user, hasAlphaAccess, alphaApplication } = useAuth();

const getStatusMessage = (status: string | null) => {
  switch (status) {
    case "pending":
      return "Your application is under review by our team. You'll be notified once a decision is made.";
    case "approved":
      return "Congratulations! You now have access to alpha features and can participate in alpha testing.";
    case "rejected":
      return "Your application wasn't approved this time. You can apply again in the future.";
    default:
      return "Join the alpha testing program and help us shape the future of YAMP. Get early access to new features and provide valuable feedback.";
  }
};

const getStatusTitle = (status: string | null) => {
  switch (status) {
    case "pending":
      return "Application Under Review";
    case "approved":
      return "Alpha Access Granted";
    case "rejected":
      return "Application Not Approved";
    default:
      return "Alpha Testing Program";
  }
};
</script>

<template>
  <section class="py-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        {{ getStatusTitle(alphaApplication.status) }}
      </h2>
      
      <p class="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
        {{ getStatusMessage(alphaApplication.status) }}
      </p>

      <!-- User Profile Section -->
      <div v-if="user" class="mb-8 flex flex-col items-center gap-4">
        <UserProfile />
        
        <!-- Status-specific content -->
        <div v-if="alphaApplication.status === 'pending'" class="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6 max-w-md mx-auto">
          <h3 class="text-yellow-200 font-semibold mb-2">What happens next?</h3>
          <div class="text-yellow-200/80 text-sm space-y-2">
            <p>• Our team will review your application</p>
            <p>• You'll be notified via Discord when a decision is made</p>
            <p>• Check back here for status updates</p>
          </div>
        </div>
        
        <div v-else-if="alphaApplication.status === 'approved'" class="bg-green-900/20 border border-green-600/30 rounded-lg p-6 max-w-md mx-auto">
          <h3 class="text-green-200 font-semibold mb-2">Alpha Access Benefits</h3>
          <div class="text-green-200/80 text-sm space-y-2">
            <p>• Early access to new features</p>
            <p>• Direct feedback channel with developers</p>
            <p>• Priority support in Discord</p>
            <p>• Help shape the future of YAMP</p>
          </div>
        </div>
        
        <div v-else-if="alphaApplication.status === 'rejected'" class="bg-red-900/20 border border-red-600/30 rounded-lg p-6 max-w-md mx-auto">
          <h3 class="text-red-200 font-semibold mb-2">Why wasn't I approved?</h3>
          <div class="text-red-200/80 text-sm space-y-2">
            <p>• Limited alpha spots available</p>
            <p>• We select based on community involvement</p>
            <p>• You can apply again in the future</p>
            <p>• Stay active in our Discord community</p>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="flex flex-col items-center gap-6">
        <AlphaAccessButton v-if="alphaApplication.status !== 'approved'" />
        
        <div v-if="!user" class="text-center">
          <p class="text-white/60 text-sm mb-4">
            You need to be logged in with Discord to apply for alpha access.
          </p>
          <div class="bg-zinc-900/50 border border-white/10 rounded-lg p-4 max-w-md mx-auto">
            <h3 class="text-white font-semibold mb-2">Requirements</h3>
            <div class="text-white/80 text-sm space-y-1 flex flex-col items-center">
              <span>• Active Discord account</span>
              <span>• Member of YAMP Discord server</span>
              <div class="flex gap-1">
                <span>•</span>
                <div class="flex">
                  <img class="w-5" src="/yamper.webp" />
                  <span class="text-[#1abc9c] font-bold">Yamper</span>
                </div>
                <span>role assigned</span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else-if="!hasAlphaAccess" class="text-center">
          <div class="bg-red-900/20 border border-red-600/30 rounded-lg p-4 max-w-md mx-auto">
            <h3 class="text-red-200 font-semibold mb-2">Access Requirements Not Met</h3>
            <div class="text-red-200/80 text-sm space-y-1">
              <p>• Join our Discord server</p>
              <p>• Get the "Yamper" role</p>
              <p>• Contact staff if you think this is an error</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>