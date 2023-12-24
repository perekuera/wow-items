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
    path: "/home",
    redirect: "/",
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
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () => import("@/views/Error.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const { logged } = useAppStore();
  if (to.meta.requiresAuth && !logged) {
    next("/login");
  } else {
    if (logged && to.path === "/login") {
      next("/");
    }
    next();
  }
});

export default router;
