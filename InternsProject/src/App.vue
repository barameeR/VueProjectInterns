<script setup lang="ts">
import Logo from './components/Logo.vue'
import ButtonTemplate from './components/Button.vue'
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" height="90">
      <Logo />
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <ButtonTemplate />
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
