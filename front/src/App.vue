<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar
      v-if="appStore.logged"
      title="WoW Items"
      density="comfortable"
      image="@/assets/wotlk_bg_2.jpg"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.3), rgba(128,208,199,.9)"
        ></v-img>
      </template>
      <v-tabs class="mr-4" selected-class="tab-selected">
        <v-tab to="/">Home</v-tab>
        <v-tab to="/items">Items</v-tab>
      </v-tabs>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn prepend-icon="mdi-earth" v-bind="props">
            {{ locale.split("-")[0] }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(locale, index) in locales"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ locale.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon="mdi-logout" @click="logout"></v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<style scoped>
.tab-selected {
  background-color: rgba(64, 64, 255, 0.25);
}
</style>

<script setup>
import { ref } from "vue";
import { useAppStore } from "@/store/app.js";

const appStore = useAppStore();
const { logout, getLocales, locales } = appStore;

const locale = ref("en-EN");

getLocales().catch((error) => console.error(error));
</script>
