<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-card density="compact" variant="text" title="Items">
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                v-model="params.name"
                density="compact"
                label="Name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="itemsQuery">Search</v-btn>
          <v-btn>Reset</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card density="compact" variant="text" title="List">
        <v-card-text>
          <v-data-table
            density="comfortable"
            :headers="itemHeaders"
            :items="items"
          ></v-data-table>
        </v-card-text>
        <v-card-text>{{ items }}</v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
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

const params = ref({
  name: null,
});

const itemsQuery = () => {
  getItems(params.value).catch((error) => console.error(error));
};

getItemClasses().catch((error) => console.error(error));
getItemBondingTypes().catch((error) => console.error(error));
getItemDamageTypes().catch((error) => console.error(error));
getItemInventoryTypes().catch((error) => console.error(error));
getItemMaterials().catch((error) => console.error(error));
getItemQualities().catch((error) => console.error(error));
getItemStatTypes().catch((error) => console.error(error));

const itemHeaders = [
  {
    title: "Class",
    value: "class",
  },
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Quality",
    value: "Quality",
  },
  {
    title: "Inventory type",
    value: "InventoryType",
  },
  {
    title: "Item level",
    value: "ItemLevel",
  },
];
</script>
