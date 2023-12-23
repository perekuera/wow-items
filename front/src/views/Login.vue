<template>
  <v-container fluid fill-height>
    <v-row class="mt-16">
      <v-col>
        <v-card
          width="400"
          height="640"
          class="mx-auto elevation-5"
          image="@/assets/wotlk_bg_1.jpg"
        >
          <v-card-title class="mt-5 text-center text-h5" height="200"
            >WoW Items</v-card-title
          >
          <v-card-text
            style="margin-top: 320px"
            @keyup.enter="doLogin"
            class="transparent-bg"
          >
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
          <v-card-actions class="px-4 pb-4 transparent-bg">
            <v-btn
              block
              variant="tonal"
              prepend-icon="mdi-plus"
              @click="doLogin"
            >
              Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.transparent-bg {
  background: rgba(0, 0, 0, 0.5);
}
</style>

<script setup>
import { ref } from "vue";
import router from "@/router/index";
import { useAppStore } from "@/store/app.js";

const appStore = useAppStore();
const { auth } = appStore;

const userName = ref("");
const password = ref("");

const doLogin = () => {
  auth(userName.value, password.value)
    .then((_res) => {
      router.push("/home");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
</script>
