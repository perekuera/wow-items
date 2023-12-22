// Composables
import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "@/store/app";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/items",
    name: "items",
    component: () => import("@/views/Items.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { logged } = useAppStore();
  if (to.meta.requiresAuth && !logged) {
    next("/login");
  } else {
    next();
  }
});

export default router;
