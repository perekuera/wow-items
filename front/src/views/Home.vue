<template>
  <v-container>
    <v-card variant="text" title="Realms">
      <v-card-text>
        <v-data-table
          density="comfortable"
          :headers="headers"
          :items="realms"
          :loading="loading"
        >
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
const { getRealms, getRealmCharacters } = realmStore;
const { loading, realms } = storeToRefs(realmStore);

getRealms()
  .then((realms) => {
    realms.forEach((realm) => {
      //console.log("realm id ", realm.id);
      getRealmCharacters(realm.id).then((realmCharacters) => {
        /*realm.characters = realmCharacters.reduce(
          (acu, account) => acu + account.numchars
        );*/
      });
    });
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
    title: "Game build",
    value: "gamebuild",
    align: "center",
  },
  {
    title: "Characters",
    value: "characters",
    align: "center",
  },
];
</script>
