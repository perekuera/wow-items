<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar v-if="appStore.logged" title="WoW Items" color="primary">
      <v-tabs>
        <v-tab to="/">Home</v-tab>
        <v-tab to="/items">Items</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<style scoped>
.background {
  background-image: url("@/assets/wotlk_bg_2.jpg");
  background-size: cover;
  opacity: 0.2;
}
</style>

<script setup>
import { useAppStore } from "@/store/app.js";

const appStore = useAppStore();
</script>
