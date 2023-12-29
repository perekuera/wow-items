import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { baseUrl, getRequestInit } from "../requestInit.js";

export const useItemStore = defineStore("itemStore", () => {
  const itemLoading = ref(false);
  const items = ref([]);
  const itemClasses = ref([]);
  const itemBondingTypes = ref([]);
  const itemDamageTypes = ref([]);
  const itemInventoryTypes = ref([]);
  const itemMaterials = ref([]);
  const itemQualities = ref([]);
  const itemStatTypes = ref([]);

  const itemClass = computed(
    () => (id) => itemClasses.value.find((ic) => ic.id === id) || {}
  );

  const itemQuality = computed(
    () => (id) => itemQualities.value.find((iq) => iq.id === id) || {}
  );

  const itemInventoryType = computed(
    () => (id) => itemInventoryTypes.value.find((it) => it.id === id) || {}
  );

  const getWhatEver = async (action, state, queryParams = {}) => {
    try {
      itemLoading.value = true;
      const url = new URL(`${baseUrl}/${action}`);
      url.search = new URLSearchParams(queryParams).toString();
      const res = await fetch(url, getRequestInit());
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      state.value = data;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      itemLoading.value = false;
    }
  };

  const getItems = async (params) => {
    return getWhatEver("items", items, params);
  };

  const getItemClasses = async () => {
    return getWhatEver("items/item-classes", itemClasses);
  };

  const getItemBondingTypes = async () => {
    return getWhatEver("items/item-bonding-types", itemBondingTypes);
  };

  const getItemDamageTypes = async () => {
    return getWhatEver("items/item-damage-types", itemDamageTypes);
  };

  const getItemInventoryTypes = async () => {
    return getWhatEver("items/item-inventory-types", itemInventoryTypes);
  };

  const getItemMaterials = async () => {
    return getWhatEver("items/item-materials", itemMaterials);
  };

  const getItemQualities = async () => {
    return getWhatEver("items/item-qualities", itemQualities);
  };

  const getItemStatTypes = async () => {
    return getWhatEver("items/item-stat-types", itemStatTypes);
  };

  return {
    //states
    itemLoading,
    items,
    itemClasses,
    itemBondingTypes,
    itemDamageTypes,
    itemInventoryTypes,
    itemMaterials,
    itemQualities,
    itemStatTypes,
    //getters
    itemClass,
    itemQuality,
    itemInventoryType,
    //actions
    getItems,
    getItemClasses,
    getItemBondingTypes,
    getItemDamageTypes,
    getItemInventoryTypes,
    getItemMaterials,
    getItemQualities,
    getItemStatTypes,
  };
});
