import { createRouter, createWebHistory } from "vue-router";
import { publics } from "./Publics";

export const Router = createRouter({
  history: createWebHistory(),
  routes: [ ...publics ],
});