import { defineStore } from "pinia";
import router from "@/router/index";
import { baseUrl, getRequestInit } from "./requestInit.js";

export const useAppStore = defineStore("app", {
  state: () => ({
    loading: false,
    logged: false,
    token: null,
    userName: null,
    accountId: null,
  }),
  actions: {
    async auth(userName, password) {
      try {
        this.loading = true;
        const formData = new URLSearchParams();
        formData.append("userName", userName);
        formData.append("password", password);

        const requestInit = getRequestInit({
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });

        const res = await fetch(`${baseUrl}/accounts/auth`, requestInit);
        const data = await res.json();
        if (!res.ok) {
          return Promise.reject(data);
        }
        this.token = data.token;
        this.userName = data.userName;
        this.accountId = data.accountId;
        this.logged = true;
        router.push("/home");
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = null;
      this.logged = false;
      router.push("/login");
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "wi-app",
        storage: sessionStorage,
      },
    ],
  },
});
