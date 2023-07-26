<script setup lang="ts">
  import mainscreen from './components/main.vue'
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Pokemon War">

    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item title="Drawer right"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <mainscreen/>
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
