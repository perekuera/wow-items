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
    async auth() {
      try {
        const requestInit = getRequestInit();
        console.log("requestInit", requestInit);
        // await fetch(`${baseUrl}/auth`, getRequestInit());
      } catch (error) {
        console.error("Error>>>", error);
      }
    },
  },
});
