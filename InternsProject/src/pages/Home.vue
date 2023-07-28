<script setup lang="ts">
import Logo from '../components/Logo.vue'
import ButtonTemplate from '../components/Button.vue'
import mainscreen from '../components/main.vue'
import pokeballSrc from '@/assets/design/pokeball.png';
import pokedexSrc from '@/assets/design/pokedex.png';

var btnStyle = "image-button"
const btnPlay = "Play"
const btnScore = "Score"
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" height="90">
      <Logo />
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">

      <mainscreen>
        <router-link to="/game">
          <ButtonTemplate :class="btnStyle" :imgSrc="pokeballSrc" :value="btnPlay">
          </ButtonTemplate>
        </router-link>
        <ButtonTemplate :class="btnStyle" :imgSrc="pokedexSrc" :value="btnScore">
        </ButtonTemplate>
      </mainscreen>

    </v-main>
  </v-layout>
</template>

<style scoped></style>
