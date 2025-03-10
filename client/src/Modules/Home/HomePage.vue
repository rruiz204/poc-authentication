<script lang="ts" setup>
import Button from 'primevue/button';
</script>

<template>
  <p class="text-3xl font-bold underline">home page works!</p>

  <Button v-slot="slotProps" asChild>
    <button v-bind="slotProps.a11yAttrs" class="font-bold"
      @click="console.log('testing')">Testing</button>
  </Button>
</template>