<script lang="ts" setup>
import { Button } from 'primevue';
</script>

<template>
  <div class="w-full flex flex-col sm:flex-row justify-center gap-3">
    <Button type="button" severity="secondary" label="Google" class="w-full" icon="pi pi-google" />
    <Button type="button" severity="secondary" label="Github" class="w-full" icon="pi pi-github" />
  </div>
</template>