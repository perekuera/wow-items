import { defineStore } from "pinia";
import { baseUrl, getRequestInit } from "../requestInit.js";

export const useRealmStore = defineStore("realmStore", {
  state: () => ({
    loading: false,
    realms: [],
  }),
  actions: {
    async getRealms() {
      try {
        this.loading = true;
        const res = await fetch(`${baseUrl}/realms`, getRequestInit());
        const data = await res.json();
        if (!res.ok) {
          return Promise.reject(data);
        }
        console.log("data", data);
        this.realms = data;
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.loading = false;
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
