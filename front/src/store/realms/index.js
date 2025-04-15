import { defineStore } from "pinia";
import { baseUrl, getRequestInit } from "../requestInit.js";

export const useRealmStore = defineStore("realmStore", {
  state: () => ({
    realmLoading: false,
    realms: [],
    realmCharacters: [],
  }),
  actions: {
    async getRealms() {
      try {
        this.realmLoading = true;
        const res = await fetch(`${baseUrl}/realms`, getRequestInit());
        let data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        data = data.map((item) => {
          return { ...item, characters: 0 };
        });
        this.realms = data;
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.realmLoading = false;
      }
    },
    async getRealmCharacters(realmId) {
      try {
        this.realmLoading = true;
        const res = await fetch(
          `${baseUrl}/realms/${realmId}/characters`,
          getRequestInit()
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        this.realms.find((realm) => realm.id === realmId).characters =
          data.reduce((acu, account) => acu + account.numchars, 0);
        this.realmCharacters = data;
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.realmLoading = false;
      }
    },
  },
  persist: {
    enabled: true,
  },
});
