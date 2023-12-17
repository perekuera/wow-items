<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="WoW Items" color="primary">
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

<script setup>
//
</script>
