<template>
  <div style="display: flex">
    <v-card class="mx-auto" width="150">
      <v-img :src=imageSrc height="200px" aspect-ratio="1/1"></v-img>

      <v-card-title>
        {{ pokemonData.name }}
      </v-card-title>

      <v-card-subtitle v-if="props.playerType == 'player'">
        Total Power: {{ pokemonData.variations[0].stats.total }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn v-if="props.playerType == 'player'" color="orange-lighten-2" variant="text"
          :class="{ 'active-btn': isButtonActive }" @click="toggleButtonActive">
          Choose
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ pokemonData.variations[0].description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Pokemon } from '@/model/Pokemon';
import vueAppConfig from '../config'; 

const emit = defineEmits();
const show = ref(false)
const props = defineProps(['pokemon', 'initialActive', 'playerType', 'index'])
const pokemonData: Pokemon = props.pokemon
const pokemonName = pokemonData.name.toLowerCase().replace(/[\s']+|-+/g, '-');
const imageSrc = ref('');

const isButtonActive = ref(props.initialActive)
const toggleButtonActive = () => {
  isButtonActive.value = !isButtonActive.value;
  console.log(props.index)
  // Emit a custom event 'button-clicked' with the current active state
  emit('button-clicked', isButtonActive.value, props.index, props.playerType);
};

onMounted(async () => {
  try {
    // TODO:: BASE URL from EC2 to be entered here

    const imageModule = await (vueAppConfig.EC2_BASE_URL + `/images/${pokemonName}.jpg`);
    const imageFile = imageModule;

    imageSrc.value = imageFile;
  } catch (error: any) {
    console.error('Error loading image:', error.message);
  }
});

</script>

<style scoped>
.active-btn {
  background-color: yellow;
  /* Customize the background color as you like */
  color: black;
  /* Customize the text color as you like */
}
</style>