<script setup lang="ts">
import Logo from '../components/Logo.vue'
import ButtonTemplate from '../components/Button.vue'
import mainscreen from '../components/main.vue'
import { getAllPokemon } from "../services/axios"

var pokeData = getAllPokemon()
  .then((pokemonData) => {
    const [array1, array2] = chooseTwoArrays(pokemonData);

    console.log("Enemy / Computer Array 1:");
    console.log(array1);
    console.log("Player Array 2:");
    console.log(array2);

  })
  .catch((error) => {
    console.error('Error:', error);
  });



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function calculatePower(partition) {
  return partition.reduce((total, pokemon) => total + (pokemon.stats?.total || 0), 0);
}

function chooseTwoArrays(data) {
  let shuffledData = shuffleArray(data);

  const arraySize = 5;
  let partition1 = shuffledData.slice(0, arraySize);
  let partition2 = shuffledData.slice(arraySize, arraySize * 2);

  let power1 = calculatePower(partition1);
  let power2 = calculatePower(partition2);

  while (Math.abs(power1 - power2) > 5) {
    shuffledData = shuffleArray(data);
    partition1 = shuffledData.slice(0, arraySize);
    partition2 = shuffledData.slice(arraySize, arraySize * 2);
    power1 = calculatePower(partition1);
    power2 = calculatePower(partition2);
  }

  return [partition1, partition2];
}

var btnStyle = "image-button"
var pokemonSrc = "../assets/design/pokeball.png"

</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" height="90">
      <Logo />
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <mainscreen>
        <ButtonTemplate :class="btnStyle" :imgSrc="pokemonSrc">
         
        </ButtonTemplate>
      </mainscreen>

    </v-main>
  </v-layout>
</template>

<style scoped>
/* Style the button */
.image-button {
  background-color: #3aa112;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 250px;
  font-size: 25pt;
  border: 5px solid #046000;
  border-radius: 100px;
  font-weight: 900;
  color: black;
}
</style>
