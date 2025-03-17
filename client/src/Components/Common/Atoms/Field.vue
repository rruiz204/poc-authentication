<script lang="ts" setup>
import { Message } from "primevue";

defineProps<{
  invalid: boolean;
  message: string;
}>();
</script>

<template>
  <div>
    <slot></slot>
    <Message v-if="invalid" severity="error" size="small" variant="simple">
      {{ message }}
    </Message>
  </div>
</template>