<template>
  <Suspense>
    <card v-for="(pokemon, index) in playerArray" :key="index" :pokemon="pokemon" />
  </Suspense>
</template>
  
<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue';
import { getPokemonById } from '@/services/axios';
import Card from '../components/card.vue'; // Correct the import path and component name if needed
import { type Pokemon } from '@/model/Pokemon';
import { getAllPokemon } from "../services/axios"

const playerArray = ref([])
const computerArray = ref([])

var pokeData = getAllPokemon()
  .then((pokemonData) => {
    const [array1, array2] = chooseTwoArrays(pokemonData);
    playerArray.value = array1
    computerArray.value = array2
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
// // Define the prop
// const pokemonData = ref<Pokemon[]>([]);

// // Use a regular function to handle the asynchronous operation
// const fetchData = async () => {
//   try {
//     const data = await getPokemonById(10);
//     pokemonData.value = data;
//     console.log(pokemonData.value)
//   } catch (error) {
//     console.error('Error fetching Pokémon data:', error);
//   }
// };

// // Fetch the data when the component is mounted
// onMounted(() => {
//   fetchData();
// });

// // Use defineAsyncComponent to define the Card component asynchronously
// const card = defineAsyncComponent(() => import('../components/card.vue'));
</script>
