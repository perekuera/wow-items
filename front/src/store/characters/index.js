import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { baseUrl, getRequestInit } from "../requestInit.js";

export const useCharacterStore = defineStore("characterStore", () => {
  const characterLoading = ref(false);
  const classes = ref([]);

  const className = computed(
    () => (id) => (classes.value.find((c) => c.id === id) || {}).name || null
  );

  const races = ref([]);

  const raceName = computed(
    () => (id) => (races.value.find((r) => r.id === id) || {}).name || null
  );

  const getClasses = async () => {
    try {
      characterLoading.value = true;
      const res = await fetch(
        `${baseUrl}/characters/character-classes`,
        getRequestInit()
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      classes.value = data;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      characterLoading.value = false;
    }
  };

  const getRaces = async () => {
    try {
      characterLoading.value = true;
      const res = await fetch(
        `${baseUrl}/characters/character-races`,
        getRequestInit()
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      races.value = data;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      characterLoading.value = false;
    }
  };

  return { classes, className, races, raceName, getClasses, getRaces };
});
