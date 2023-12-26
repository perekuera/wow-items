<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height">
      <v-card density="compact" variant="text" title="Realms">
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
      <v-card density="compact" variant="text" title="Accounts">
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
      </v-card>
      <v-card density="compact" variant="text" title="My Characters">
        <v-card-text>
          <v-data-table
            density="comfortable"
            :headers="accountCharacterHeaders"
            :items="accountCharacters"
            :loading="accountLoading"
          >
            <template v-slot:item.race="{ value }">
              {{ raceName(value) }}
            </template>
            <template v-slot:item.class="{ value }">
              {{ className(value) }}
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRealmStore } from "@/store/realms";
import { useAccountStore } from "@/store/accounts";
import { useCharacterStore } from "@/store/characters";

const realmStore = useRealmStore();
const { getRealms, getRealmCharacters } = realmStore;
const { realmLoading, realms } = storeToRefs(realmStore);

const accountStore = useAccountStore();
const { getAccounts, getAccountCharacters } = accountStore;
const { accountLoading, accounts, accountCharacters } =
  storeToRefs(accountStore);

const characterStore = useCharacterStore();
const { getClasses, getRaces } = useCharacterStore();
const { className, raceName } = storeToRefs(characterStore);

getClasses().catch((error) => console.error(error));
getRaces().catch((error) => console.error(error));

getRealms()
  .then((realms) => {
    realms.forEach((realm) => {
      getRealmCharacters(realm.id).catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

getAccounts().catch((error) => console.error(error));

getAccountCharacters().catch((error) => console.error(error));

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
    align: "center",
  },
  {
    title: "User name",
    value: "username",
  },
  {
    title: "Join date",
    value: "joindate",
    align: "center",
  },
  {
    title: "Last IP",
    value: "last_ip",
    align: "center",
  },
  {
    title: "Locked",
    value: "locked",
    align: "center",
  },
  {
    title: "Last login",
    value: "last_login",
    align: "center",
  },
  {
    title: "Online",
    value: "online",
    align: "center",
  },
  {
    title: "Total time",
    value: "totaltime",
    align: "end",
  },
];

const accountCharacterHeaders = [
  {
    title: "Guid",
    value: "guid",
    align: "center",
  },
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Race",
    value: "race",
    align: "center",
  },
  {
    title: "Class",
    value: "class",
    align: "center",
  },
  {
    title: "Gender",
    value: "gender",
    align: "center",
  },
  {
    title: "Level",
    value: "level",
    align: "center",
  },
  {
    title: "Online",
    value: "online",
    align: "center",
  },
  {
    title: "Total time",
    value: "totaltime",
    align: "end",
  },
];
</script>
