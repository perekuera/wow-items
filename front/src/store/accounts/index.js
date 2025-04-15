import { defineStore } from "pinia";
import { baseUrl, getRequestInit } from "../requestInit.js";
import { useAppStore } from "../app.js";

const appStore = useAppStore();

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    accountLoading: false,
    accounts: [],
    accountCharacters: [],
  }),
  actions: {
    async getAccounts() {
      try {
        this.accountLoading = true;
        const res = await fetch(`${baseUrl}/accounts`, getRequestInit());
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        this.accounts = data;
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.accountLoading = false;
      }
    },
    async getAccountCharacters(accountId) {
      try {
        this.accountLoading = true;
        accountId = accountId || appStore.accountId;
        const res = await fetch(
          `${baseUrl}/accounts/${accountId}/characters`,
          getRequestInit()
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }
        this.accountCharacters = data;
        return Promise.resolve(data);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.accountLoading = false;
      }
    },
  },
  persist: {
    enabled: true,
  },
});
