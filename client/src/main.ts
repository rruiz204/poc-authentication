import "./style.css"
import App from "./App.vue"
import { createApp } from "vue"

import { Theme } from "./theme";
import { Pinia } from "@Stores/Pinia";
import PrimeVue from "primevue/config";
import { Router } from "@Routes/Router";

const app = createApp(App);

app.use(Pinia);
app.use(Router);
app.use(PrimeVue, { theme: Theme });

app.mount("#app");
