<script lang="ts" setup>
import { Button } from "primevue";
import { Divider } from "primevue";
import { Password } from "primevue";
import { InputText } from "primevue";
import { Form } from "@primevue/forms";

import Field from "@Common/Atoms/Field.vue";
import RegisterOptions from "./RegisterOptions.vue";
import SocialButtons from "../Shared/SocialButtons.vue";

import { FormMessages } from "../Shared/FormMessages";
import { RegisterSchema } from "@Schemas/RegisterSchema";

const responsive = {
  form: "w-full max-w-sm md:max-w-md lg:max-w-l",
};
</script>

<template>
  <Form v-slot="$form" :resolver="RegisterSchema" :class="`h-fit flex flex-col gap-4 ${responsive.form}`">
    <Field 
      :error="$form.name?.error?.message"
      :pristine="$form.name?.pristine"
      :invalid="$form.name?.invalid"

      :success="FormMessages.name.success"
      :help="FormMessages.name.help">
      <InputText name="name" placeholder="Name" type="text" fluid />
    </Field>

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

    <RegisterOptions />
    <Button type="submit" severity="secondary" label="Register" />

    <Divider />
    <SocialButtons />
  </Form>
</template>