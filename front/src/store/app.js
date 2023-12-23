// Utilities
import { defineStore } from "pinia";
import { baseUrl, getRequestInit } from "./requestInit.js";

export const useAppStore = defineStore("app", {
  state: () => ({
    logged: false,
    token: null,
  }),
  mutations: {},
  actions: {
    async auth(userName, password) {
      try {
        const formData = new URLSearchParams();
        formData.append("userName", userName);
        formData.append("password", password);

        const requestInit = getRequestInit({
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });
        console.log("request init", requestInit);

        const res = await fetch(`${baseUrl}/accounts/auth`, requestInit);
        const data = await res.json();
        if (!res.ok) {
          return Promise.reject(data);
        }
        this.token = data.token;
        this.logged = true;
        //router.push("/home");
        return Promise.resolve(data);
      } catch (error) {
        console.error("Error>>>", error);
        return Promise.reject(error);
      }
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
