<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-card density="compact" variant="text" title="Items">
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field density="compact" label="Name"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn>Search</v-btn>
          <v-btn>Reset</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card density="compact" variant="text" title="List">
        <v-card-text>{{ items }}</v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useItemStore } from "@/store/items";

const itemStore = useItemStore();

const {
  itemLoading,
  items,
  itemClasses,
  itemBondingTypes,
  itemDamageTypes,
  itemInventoryTypes,
  itemMaterials,
  itemQualities,
  itemStatTypes,
} = storeToRefs(itemStore);

const {
  getItems,
  getItemClasses,
  getItemBondingTypes,
  getItemDamageTypes,
  getItemInventoryTypes,
  getItemMaterials,
  getItemQualities,
  getItemStatTypes,
} = itemStore;

getItemDamageTypes()
  .then((dt) => {
    console.log("damage types", dt);
  })
  .catch((error) => console.error(error));
</script>
