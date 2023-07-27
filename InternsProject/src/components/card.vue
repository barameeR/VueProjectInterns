<template>
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-img
        :src = imageSrc
        height="200px"
        cover
      ></v-img>
  
      <v-card-title>
        {{pokemonData[0].name}}
      </v-card-title>
  
      <v-card-subtitle>
        1,000 miles of wonder
      </v-card-subtitle>
  
      <v-card-actions>
        <v-btn
          color="orange-lighten-2"
          variant="text"
        >
          Explore
        </v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Pokemon } from '@/model/Pokemon';
const props = defineProps(['pokemon'])
const pokemonData : Pokemon[] = props.pokemon
const pokemonName = pokemonData[0].name.toLowerCase()

const imageSrc = ref('');

onMounted(async () => {
  try {
    // Dynamically import the image from the assets folder
    const imageModule = await import('@/assets/images/'+pokemonName+'.jpg');
    // Get the default export from the dynamically imported module (the image file)
    const imageFile = imageModule.default;
    // Set the image source to the dynamically imported image file
    imageSrc.value = imageFile;
  } catch (error) {
    // console.error('Error loading image:', error.message);
  }
});
</script>