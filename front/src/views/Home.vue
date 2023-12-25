<template>
  <v-container>
    <v-card variant="text" title="Realms">
      <v-card-text>
        <v-data-table
          density="comfortable"
          :headers="realmHeaders"
          :items="realms"
          :loading="realmLoading"
        >
          <template v-slot:bottom></template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-card variant="text" title="Accounts">
      <v-card-text>
        <v-data-table
          density="comfortable"
          :headers="accountHeaders"
          :items="accounts"
          :loading="accountLoading"
        >
          <template v-slot:item.joindate="{ value }">
            {{ new Intl.DateTimeFormat().format(new Date(value)) }}
          </template>
          <template v-slot:item.last_login="{ value }">
            {{ new Intl.DateTimeFormat().format(new Date(value)) }}
          </template>
          <template v-slot:bottom></template>
        </v-data-table>
      </v-card-text>
      <v-card-text> {{ accounts }} </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRealmStore } from "@/store/realms";
import { useAccountStore } from "@/store/accounts";

const realmStore = useRealmStore();
const { getRealms, getRealmCharacters } = realmStore;
const { realmLoading, realms } = storeToRefs(realmStore);

const accountStore = useAccountStore();
const { getAccounts, getAccountCharacters } = accountStore;
const { accountLoading, accounts, accountCharacters } =
  storeToRefs(accountStore);

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

console.log("nav lagn", navigator.languages);

getAccounts(1)
  .then((accounts) => {
    console.log("accounts", accounts);
  })
  .catch((error) => console.error("error", error));

const realmHeaders = [
  {
    title: "Id",
    value: "id",
  },
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

const accountHeaders = [
  {
    title: "Id",
    value: "id",
  },
  {
    title: "User name",
    value: "username",
  },
  {
    title: "Join date",
    value: "joindate",
  },
  {
    title: "Last IP",
    value: "last_ip",
  },
  {
    title: "Locked",
    value: "locked",
  },
  {
    title: "Last login",
    value: "last_login",
  },
  {
    title: "Online",
    value: "online",
  },
  {
    title: "Total time",
    value: "totaltime",
  },
];
</script>
