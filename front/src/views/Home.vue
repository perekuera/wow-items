<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height"
      >Home</v-responsive
    >
  </v-container>
</template>

<script setup>
import { useRealmStore } from "@/store/realms";

const { getRealms } = useRealmStore();

getRealms()
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.log("error...", error);
  });
</script>
