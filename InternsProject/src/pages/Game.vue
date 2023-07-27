<template>
    <Suspense>
      <card v-if="pokemonData.length > 0" :pokemon="pokemonData" />
    </Suspense>
  </template>
  
  <script setup lang="ts">
  import { defineAsyncComponent, ref, onMounted } from 'vue';
  import { getPokemonById } from '@/services/axios';
  import Card from '../components/card.vue'; // Correct the import path and component name if needed
  import { type Pokemon } from '@/model/Pokemon';
  
  // Define the prop
  const pokemonData = ref<Pokemon[]>([]);
  
  // Use a regular function to handle the asynchronous operation
  const fetchData = async () => {
    try {
      const data = await getPokemonById(10);
      pokemonData.value = data;
      console.log(pokemonData.value)
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };
  
  // Fetch the data when the component is mounted
  onMounted(() => {
    fetchData();
  });
  
  // Use defineAsyncComponent to define the Card component asynchronously
  const card = defineAsyncComponent(() => import('../components/card.vue'));
  </script>
