<template>
  <v-container fluid fill-height>
    <v-row class="mt-10">
      <v-col>
        <v-card
          width="350"
          height="540"
          class="mx-auto elevation-5"
          image="@/assets/wotlk_bg_1.jpg"
        >
          <v-card-title class="mt-5 text-center text-h5" height="200"
            >WoW Items</v-card-title
          >
          <v-card-text style="margin-top: 220px" @keyup.enter="doLogin">
            <v-row class="pt-3">
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
          <v-card-actions class="px-4 pb-4">
            <v-btn
              block
              variant="tonal"
              prepend-icon="mdi-login"
              @click="doLogin"
              :loading="appStore.loading"
            >
              Sign in</v-btn
            >
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
  auth(userName.value, password.value).catch((error) =>
    console.error("error", error)
  );
};
</script>
