<template>
  <v-container fluid fill-height>
    <v-row justify="center" class="mt-5">
      <v-col cols="12" sm="8" md="4">
        <v-card width="280" class="align-center text-center">
          <v-card-title>WoW Items</v-card-title>
          <v-card-text class="mt-5">
            <v-row>
              <v-col>
                <v-text-field label="User"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field type="password" label="Password"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn>Login</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>
