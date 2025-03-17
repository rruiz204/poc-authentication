import { createRouter, createWebHistory } from "vue-router";
import { publics } from "./Publics";
import { redirects } from "./Redirects";

export const Router = createRouter({
  history: createWebHistory(),
  routes: [ ...publics, ...redirects ],
});