<template>
  <v-container>
    <v-card variant="text" title="Realms">
      <v-card-text>
        <v-data-table density="comfortable" :headers="headers" :items="realms">
          <template v-slot:bottom></template>
        </v-data-table>
      </v-card-text>
      <v-card-text> {{ realms }} </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRealmStore } from "@/store/realms";

const realmStore = useRealmStore();
const { getRealms } = realmStore;
const { loading, realms } = storeToRefs(realmStore);

getRealms()
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.log("error...", error);
  });

const headers = [
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Address",
    value: "address",
  },
  {
    title: "Port",
    value: "port",
    align: "center",
  },
  {
    title: "Population",
    value: "population",
    align: "center",
  },
  {
    title: "Game Build",
    value: "gamebuild",
    align: "center",
  },
];
</script>
