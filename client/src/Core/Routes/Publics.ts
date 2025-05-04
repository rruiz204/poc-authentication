import type { RouteRecordRaw } from "vue-router";

import HomePage from "@Modules/Home/HomePage.vue";

export const publics: RouteRecordRaw[] = [
  { path: "/home", component: HomePage },
];