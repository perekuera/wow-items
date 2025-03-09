<template>
  <v-container fluid class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-card density="compact" variant="text">
        <v-card-text class="pt-1 pb-0">
          <v-row>
            <v-col class="pb-0">
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
            <v-col class="pb-0">
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
            <v-col class="pb-0">
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
            <v-col class="pb-0">
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
            <v-col class="pb-0" cols="4">
              <v-select
                v-model="params.itemStatTypes"
                density="compact"
                label="Stat type"
                :items="itemStatTypes"
                itemTitle="statType"
                itemValue="id"
                clearable
                multiple
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <v-text-field
                v-model="params.desc"
                density="compact"
                label="Name"
                autofocus
                clearable
              ></v-text-field>
            </v-col>
            <v-col class="py-0">
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
            <v-col class="py-0">
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
            @click="itemsQuery('button')"
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
      <v-card density="compact" variant="text">
        <v-card-text class="pt-1">
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
              <item-tooltip :itemId="item.entry"></item-tooltip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn icon size="x-small" @click="editItem(item)"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-responsive>
    <v-dialog max-width="480" v-model="isActive">
      <v-card>
        <v-card-title>{{ editedItem.name }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                v-model="editedItem.characterId"
                density="compact"
                label="Character"
                :items="accountCharacters"
                itemTitle="name"
                itemValue="guid"
                clearable
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-number-input
                v-model="editedItem.units"
                density="compact"
                label="Units"
                clearable
              >
              </v-number-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-chip label size="small" @click="addUnits(0)">0</v-chip>
              <v-chip class="ml-2" label size="small" @click="addUnits(1)"
                >+1</v-chip
              >
              <v-chip class="ml-2" label size="small" @click="addUnits(10)"
                >+10</v-chip
              >
              <v-chip class="ml-2" label size="small" @click="addUnits(50)"
                >+50</v-chip
              >
              <v-chip class="ml-2" label size="small" @click="addUnits(100)"
                >+100</v-chip
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Apply" @click="doApplyItem()"> </v-btn>
          <v-btn text="Close" @click="isActive = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useItemStore } from "@/store/items";
import { useAccountStore } from "@/store/accounts";
import ItemTooltip from "@/components/ItemTooltip.vue";

const itemStore = useItemStore();
const accountStore = useAccountStore();

const {
  itemLoading,
  items,
  itemClasses,
  //itemBondingTypes,
  //itemDamageTypes,
  itemInventoryTypes,
  itemMaterials,
  itemQualities,
  itemStatTypes,
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
  getItemStatTypes,
  applyItem,
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
  itemStatTypes: [],
});

const editedItem = ref({
  name: null,
  characterId: null,
  itemId: null,
  units: 1,
});

const isActive = ref(false);

const { accountCharacters } = storeToRefs(accountStore);

watch(isActive, (newValue, oldValue) => {
  if (newValue === false) {
    editedItem.value = {
      name: null,
      characterId: null,
      itemId: null,
      units: 1,
    };
  } else {
    console.log("else", accountCharacters.value.length);
    if (accountCharacters.value.length === 1) {
      console.log("else", accountCharacters.value[0]);
      editedItem.value.characterId = accountCharacters.value[0].guid;
    }
  }
});

const itemsQuery = (from) => {
  console.log("itemsQuery!", from);
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
getItemStatTypes().catch((error) => console.error(error));

const doApplyItem = () => {
  const { characterId, itemId, units } = { ...editedItem.value };
  if (!characterId || !itemId || !units) {
    console.err("Need params");
    return;
  }
  const command = `.additem ${characterId} ${itemId} ${units}`;
  console.log("doApplyItem", command);
  applyItem(command)
    .then((data) => {
      console.log("apply!", data);
      isActive.value = false;
    })
    .catch((error) => {
      console.error(error);
    });
};

const addUnits = (amount) => {
  if (amount === 0) {
    editedItem.value.units = 0;
  } else {
    editedItem.value.units += amount;
  }
};

const editItem = (item) => {
  editedItem.value = {
    name: item.name,
    characterId: null,
    itemId: item.entry,
    units: 1,
  };
  isActive.value = true;
};

const itemHeaders = [
  {
    title: "Class",
    value: "class",
    align: "center",
    sortable: true,
  },
  {
    title: "Name",
    value: "name",
    sortable: true,
  },
  {
    title: "Inventory type",
    value: "InventoryType",
    align: "center",
    sortable: true,
  },
  {
    title: "Material",
    value: "Material",
    align: "center",
    sortable: true,
  },
  {
    title: "Quality",
    value: "Quality",
    align: "center",
    sortable: true,
  },
  {
    title: "Req. level",
    value: "RequiredLevel",
    align: "center",
    sortable: true,
  },
  {
    title: "Item level",
    value: "ItemLevel",
    align: "center",
    sortable: true,
  },
  {
    title: "Id",
    value: "entry",
    align: "center",
    sortable: true,
  },
  {
    title: "",
    value: "actions",
    align: "center",
  },
];

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (isActive.value) {
      doApplyItem();
    } else {
      itemsQuery("enter");
    }
  }
});
</script>
