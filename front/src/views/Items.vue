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
                autofocus
                clearable
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="params.quality"
                density="compact"
                label="Quality"
                :items="itemQualities"
                itemTitle="name"
                itemValue="id"
                clearable
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="params.inventoryType"
                density="compact"
                label="Inventory type"
                :items="itemInventoryTypes"
                itemTitle="name"
                itemValue="id"
                clearable
                hide-details
              >
              </v-select>
            </v-col>
            <v-col>
              <v-range-slider
                v-model="params.levelRange"
                density="compact"
                label="Item level"
                :min="1"
                :max="100"
                :step="1"
                thumb-label
                hide-details
              ></v-range-slider>
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
          >
            <template v-slot:item.class="{ item }">
              {{ itemClass(item.class).name }}
            </template>
            <template v-slot:item.Quality="{ item }">
              <v-chip
                density="comfortable"
                size="small"
                label
                :color="itemQuality(item.Quality).color.toLowerCase()"
                >{{ itemQuality(item.Quality).name }}
              </v-chip>
            </template>
            <template v-slot:item.InventoryType="{ item }">
              {{ itemInventoryType(item.InventoryType).name }}
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-text>{{ params }}</v-card-text>
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
  itemClass,
  itemQuality,
  itemInventoryType,
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
  quality: null,
  inventoryType: null,
  levelRange: [1, 80],
});

const itemsQuery = () => {
  getItems(
    Object.fromEntries(
      Object.entries(params.value).filter(([_key, value]) => value !== null)
    )
  ).catch((error) => console.error(error));
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
    align: "center",
  },
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Quality",
    value: "Quality",
    align: "center",
  },
  {
    title: "Inventory type",
    value: "InventoryType",
    align: "center",
  },
  {
    title: "Item level",
    value: "ItemLevel",
    align: "center",
  },
];
</script>
