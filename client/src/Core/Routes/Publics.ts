import type { RouteRecordRaw } from "vue-router";

import HomePage from "@Modules/Home/HomePage.vue";
import LoginPage from "@Modules/Auth/Login/LoginPage.vue";
import RegisterPage from "@Modules/Auth/Register/RegisterPage.vue";

export const publics: RouteRecordRaw[] = [
  { path: "/home", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
];