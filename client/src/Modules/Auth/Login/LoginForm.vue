<script lang="ts" setup>
import { Button } from "primevue";
import { Divider } from "primevue";
import { Password } from "primevue";
import { InputText } from "primevue";
import { Form } from "@primevue/forms";

import Field from "@Common/Atoms/Field.vue";
import LoginOptions from "./LoginOptions.vue";
import SocialButtons from "../Shared/SocialButtons.vue";

import { LoginSchema } from "./LoginSchema";
import { FormMessages } from "../Shared/FormMessages";

const responsive = {
  form: "w-full max-w-sm md:max-w-md lg:max-w-l",
};
</script>

<template>
  <Form v-slot="$form" :resolver="LoginSchema" :class="`h-fit flex flex-col gap-4 ${responsive.form}`">
    <Field 
      :error="$form.email?.error?.message"
      :pristine="$form.email?.pristine"
      :invalid="$form.email?.invalid"

      :success="FormMessages.email.success"
      :help="FormMessages.email.help">
      <InputText name="email" placeholder="Email" type="email" fluid />
    </Field>

    <Field
      :error="$form.password?.error?.message"
      :pristine="$form.password?.pristine"
      :invalid="$form.password?.invalid"
        
      :success="FormMessages.password.success"
      :help="FormMessages.password.help">
      <Password name="password" placeholder="Password" :feedback="false" fluid toggle-mask />
    </Field>

    <LoginOptions/>
    <Button type="submit" severity="secondary" label="Login" />

    <Divider />
    <SocialButtons />
  </Form>
</template>