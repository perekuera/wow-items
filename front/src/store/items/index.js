import { defineStore } from "pinia";
import { ref } from "vue";
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

  const getWhatEver = async (action, state) => {
    try {
      itemLoading.value = true;
      const res = await fetch(`${baseUrl}/${action}`, getRequestInit());
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

  const getItems = async () => {
    return getWhatEver("items", items);
  };

  const getItemClasses = async () => {
    return getWhatEver("items/item-classes", itemClasses);
  };

  const getItemBondingTypes = async () => {
    return getWhatEver("itmes/item-bonding-types", itemBondingTypes);
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
    itemLoading,
    items,
    itemClasses,
    itemBondingTypes,
    itemDamageTypes,
    itemInventoryTypes,
    itemMaterials,
    itemQualities,
    itemStatTypes,
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
