<script lang="ts" setup>
import { Button } from "primevue";
import { Password } from "primevue";
import { InputText } from "primevue";
import { Form } from "@primevue/forms";

import Field from "@Common/Atoms/Field.vue";
import { LoginSchema } from "./LoginSchema";

const responsive = {
  form: "w-full max-w-sm md:max-w-md lg:max-w-l",
};
</script>

<template>
  <div class="w-screen min-h-screen p-2 flex justify-center items-center">
    <Form v-slot="$form" :resolver="LoginSchema" :class="`h-fit flex flex-col gap-6 ${responsive.form}`">

      <Field :invalid="$form.email?.invalid" :message="$form.email?.error?.message">
        <InputText name="email" type="email" placeholder="Email" fluid />
      </Field>

      <Field :invalid="$form.password?.invalid" :message="$form.password?.error?.message">
        <Password name="password" placeholder="Password" :feedback="false" fluid toggle-mask />
      </Field>

      <Button type="submit" severity="secondary" label="Login" />
    </Form>
  </div>
</template>