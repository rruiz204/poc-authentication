<script lang="ts" setup>
import { Button } from "primevue";
import { Divider } from "primevue";
import { Password } from "primevue";
import { InputText } from "primevue";
import { Form } from "@primevue/forms";

import Field from "@Common/Atoms/Field.vue";
import { LoginSchema } from "./LoginSchema";

const responsive = {
  form: "w-full max-w-sm md:max-w-md lg:max-w-l",
};

const messages = {
  email: {
    success: "You're good to go! The email you entered is valid.",
    help: "Please enter a valid email address. (ej: usuario@dominio.com).",
  },
  password: {
    success: "Valid password! Meets all security requirements.",
    help: "Please enter a valid password. (e.g. !, @, #, $).",
  },
};
</script>

<template>
  <Form v-slot="$form" :resolver="LoginSchema" :class="`h-fit flex flex-col gap-6 ${responsive.form}`">
    <Field 
      :error="$form.email?.error?.message"
      :pristine="$form.email?.pristine"
      :invalid="$form.email?.invalid"

      :success="messages.email.success"
      :help="messages.email.help">
      <InputText name="email" type="email" fluid />
    </Field>

    <Field
      :error="$form.password?.error?.message"
      :pristine="$form.password?.pristine"
      :invalid="$form.password?.invalid"
        
      :success="messages.password.success"
      :help="messages.password.help">
      <Password name="password" placeholder="Password" :feedback="false" fluid toggle-mask />
    </Field>

    <Divider />

    <Button type="submit" severity="secondary" label="Login" />
  </Form>
</template>