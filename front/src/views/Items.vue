<template>
  <v-container fluid class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-card density="compact" variant="text" title="Items">
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                v-model="params.itemClass"
                density="compact"
                label="Item class"
                :items="itemClasses"
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
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="params.material"
                density="compact"
                label="Item material"
                :items="itemMaterials"
                itemTitle="material"
                itemValue="id"
                clearable
              >
              </v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="params.qualities"
                density="compact"
                label="Quality"
                :items="itemQualities"
                itemTitle="name"
                itemValue="id"
                multiple
                clearable
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="params.desc"
                density="compact"
                label="Name"
                autofocus
                clearable
              ></v-text-field>
            </v-col>
            <v-col>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="params.minRequiredLevel"
                    density="compact"
                    type="number"
                    label="Min. level"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="params.maxRequiredLevel"
                    density="compact"
                    type="number"
                    label="Max. level"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="params.minItemLevel"
                    density="compact"
                    type="number"
                    label="Min. item level"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="params.maxItemLevel"
                    density="compact"
                    type="number"
                    label="Max. item level"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            prepend-icon="mdi-magnify"
            :disabled="itemLoading"
            @click="itemsQuery"
            >Search</v-btn
          >
          <v-btn
            prepend-icon="mdi-file"
            :disabled="itemLoading"
            @click="resetFilters"
            >Reset</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card density="compact" variant="text" title="List">
        <v-card-text>
          <v-data-table
            density="comfortable"
            :headers="itemHeaders"
            :items="items"
            :loading="itemLoading"
            items-per-page="100"
          >
            <template v-slot:item.name="{ item }">
              {{ item.locale_name || item.name }}
            </template>
            <template v-slot:item.class="{ item }">
              {{ itemClass(item.class).name }} ({{
                itemSubclass(item.class, item.subclass).name
              }})
            </template>
            <template v-slot:item.InventoryType="{ item }">
              {{ itemInventoryType(item.InventoryType).name }}
            </template>
            <template v-slot:item.Material="{ item }">
              {{ itemMaterial(item.Material).material }}
            </template>
            <template v-slot:item.Quality="{ item }">
              <v-chip
                class="pa-3"
                density="comfortable"
                size="small"
                label
                :color="itemQuality(item.Quality).color.toLowerCase()"
                >{{ itemQuality(item.Quality).name }}
              </v-chip>
            </template>
            <template v-slot:item.entry="{ item }">
              <!-- <v-chip
                class="pa-3"
                density="comfortable"
                size="small"
                label
                :color="itemQuality(item.Quality).color.toLowerCase()"
              >
                {{ item.entry }}
              </v-chip> -->
              <item-tooltip :itemId="item.entry"></item-tooltip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useItemStore } from "@/store/items";
import ItemTooltip from "@/components/ItemTooltip.vue";

const itemStore = useItemStore();

const {
  itemLoading,
  items,
  itemClasses,
  //itemBondingTypes,
  //itemDamageTypes,
  itemInventoryTypes,
  itemMaterials,
  itemQualities,
  //itemStatTypes,
  itemClass,
  itemSubclass,
  itemQuality,
  itemInventoryType,
  itemMaterial,
} = storeToRefs(itemStore);

const {
  getItems,
  getItemClasses,
  //getItemBondingTypes,
  //getItemDamageTypes,
  getItemInventoryTypes,
  getItemMaterials,
  getItemQualities,
  //getItemStatTypes,
} = itemStore;

const params = ref({
  itemClass: null,
  desc: null,
  //quality: null,
  qualities: [],
  inventoryType: null,
  material: null,
  minItemLevel: null,
  maxItemLevel: null,
  minRequiredLevel: null,
  maxRequiredLevel: null,
});

const itemsQuery = () => {
  getItems(
    Object.fromEntries(
      Object.entries({ ...params.value }).filter(([_key, value]) =>
        Array.isArray(value) ? value.length > 0 : value !== null
      )
    )
  ).catch((error) => console.error(error));
};

const resetFilters = () => {
  params.value = {
    itemClass: null,
    desc: null,
    //quality: null,
    qualities: [],
    inventoryType: null,
    material: null,
    minItemLevel: null,
    maxItemLevel: null,
    minRequiredLevel: null,
    maxRequiredLevel: null,
  };
};

getItemClasses().catch((error) => console.error(error));
//getItemBondingTypes().catch((error) => console.error(error));
//getItemDamageTypes().catch((error) => console.error(error));
getItemInventoryTypes().catch((error) => console.error(error));
getItemMaterials().catch((error) => console.error(error));
getItemQualities().catch((error) => console.error(error));
//getItemStatTypes().catch((error) => console.error(error));

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
    title: "Inventory type",
    value: "InventoryType",
    align: "center",
  },
  {
    title: "Material",
    value: "Material",
    align: "center",
  },
  {
    title: "Quality",
    value: "Quality",
    align: "center",
  },
  {
    title: "Req. level",
    value: "RequiredLevel",
    align: "center",
  },
  {
    title: "Item level",
    value: "ItemLevel",
    align: "center",
  },
  {
    title: "Id",
    value: "entry",
    align: "center",
  },
];

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    itemsQuery();
  }
});
</script>
