<script lang="ts" setup>
import { ref, watch } from "vue";
import { Message } from "primevue";
import { FormatHelper } from "@Helpers/FormatHelper";

const props = defineProps<{
  pristine: boolean;
  invalid: boolean;
  error: string;

  success: string;
  help: string;
}>();

const message = ref<string>(props.help);
const severity = ref<string>("secondary");

watch(() => props.invalid, (changed) => {
  if (props.pristine && !props.invalid) return false;

  message.value = changed ? props.error : props.success;
  severity.value = changed ? "error" : "success";
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <slot></slot>
    <Message :severity size="small" variant="simple">
      {{ FormatHelper.capitalize(message) }}
    </Message>
  </div>
</template>