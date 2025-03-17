import type { RouteRecordRaw } from "vue-router";

export const redirects: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
];