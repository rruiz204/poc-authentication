<script lang="ts" setup>
import { Checkbox } from "primevue";
</script>

<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-2">
      <Checkbox binary input-id="remember" name="remember" size="small" />
      <label for="remember" class="font-light text-sm">Remember</label>
    </div>
    
    <RouterLink to="/register" class="font-light text-sm underline underline-offset-4 cursor-pointer">
      Create an account in minutes
    </RouterLink>
  </div>
</template>