<script lang="ts" setup>
import LoginForm from './LoginForm.vue';
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col items-center justify-center gap-4">
    <div class="p-2">
      <p class="text-2xl font-semibold text-center">Please login to continue</p>
    </div>

    <LoginForm />
  </div>
</template>