<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" sm="8" md="4">
        <v-card width="280" class="align-center text-center">
          <v-card-title class="mt-5">WoW Items</v-card-title>
          <v-card-text class="mt-5" @keyup.enter="doLogin">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="userName"
                  label="User"
                  density="comfortable"
                  prepend-icon="mdi-account"
                  clearable
                  autofocus
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="password"
                  type="password"
                  label="Password"
                  prepend-icon="mdi-key"
                  density="comfortable"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="mb-5 px-4">
            <v-spacer></v-spacer>
            <v-btn
              block
              variant="tonal"
              prepend-icon="mdi-plus"
              @click="doLogin"
            >
              Login</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "@/store/app.js";

const appStore = useAppStore();
const { auth } = appStore;

const userName = ref("");
const password = ref("");

const doLogin = () => {
  console.log("login");
  auth(userName.value, password.value)
    .then((res) => {
      console.log("res1", res);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
</script>
