<template>
  <v-container>
    <v-row>
      <v-col v-for="(pokemon, index) in computerArray" :key="index" cols="auto">
        <Suspense>
          <card :pokemon="pokemon" playerType="enemy" />
        </Suspense>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(pokemon, index) in playArea" :key="index" cols="auto">
        <Suspense>
          <card :pokemon="pokemon" playerType="playArea" />
        </Suspense>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(pokemon, index) in playerArray" :key="index" cols="auto">
        <Suspense>
          <card :pokemon="pokemon" playerType="player" :initialActive="isButtonActive" :index="index"
            @button-clicked="onButtonClicked" />
        </Suspense>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import Card from '../components/card.vue'; 
import { getAllPokemon } from "../services/axios"
import type { Pokedex } from '@/model/Pokemon';

const playerArray = ref([])
const computerArray = ref([])
const playArea = ref([])
const isButtonActive = ref(false)
const onButtonClicked = (  isActive: boolean, index: number  ) => {
  isButtonActive.value = isActive;
  console.log(index)
  const playerType = 'player'
  play(index, playerType)
};

var pokeData = getAllPokemon()
  .then((pokemonData) => {
    const [array1, array2] = chooseTwoArrays(pokemonData);
    playerArray.value = array1;
    computerArray.value = array2;
    enemyPlay();
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

function calculatePower(partition: any[]) {
  return partition.reduce((total, pokemon) => total + (pokemon.stats?.total || 0), 0);
}

function chooseTwoArrays(data: Pokedex) {
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

function play(index: number, playerType: string) {
  if (playerType == "player") {
    playArea.value.push(playerArray.value.splice(index, 1)[0])
  } else {
    playArea.value.push(computerArray.value.splice(index, 1)[0]);
  }
}

function enemyPlay() {
  const randomIndex = Math.floor(Math.random() * computerArray.value.length);
  console.log('AnyThing', randomIndex, computerArray.value.length, computerArray.value)
  play(computerArray.value[randomIndex], 'enemy');
}

const onSelectedPlay = () =>{}

</script>

<style></style>
