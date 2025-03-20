<script lang="ts" setup>
import RegisterForm from './RegisterForm.vue';
</script>

<template>
  <div class="w-screen min-h-screen flex flex-col items-center justify-center gap-4">
    <div class="p-2 flex flex-col gap-3">
      <p class="text-2xl font-semibold text-center">Please register to continue</p>
      <p class="font-light text-center">Try different types of authentication</p>
    </div>

    <RegisterForm />
  </div>
</template>