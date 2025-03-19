<script lang="ts" setup>
import { Checkbox } from "primevue";
</script>

<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-2">
      <Checkbox binary input-id="remember" name="remember" size="large" />
      <label for="remember" class="font-light">Remember</label>
    </div>

    <p class="font-light underline underline-offset-4 cursor-pointer">Create an account in minutes</p>
  </div>
</template>