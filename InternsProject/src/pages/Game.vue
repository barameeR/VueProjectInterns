<template>
    <v-container>
      <v-row>
        <v-col v-for="(pokemon, index) in playerArray" :key="index" cols="auto">
          <Suspense>
            <card :pokemon="pokemon" playerType ="player" :initialActive="isButtonActive" @button-clicked="onButtonClicked"/>
          </Suspense>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(pokemon, index) in playArea" :key="index" cols="auto">
          <Suspense>
            <card :pokemon="pokemon" playerType ="playArea" :initialActive="isButtonActive" @button-clicked="onButtonClicked"/>
          </Suspense>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(pokemon, index) in computerArray" :key="index" cols="auto">
          <Suspense>
            <card :pokemon="pokemon" playerType ="enemy" />
          </Suspense>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from 'vue';
import Card from '../components/card.vue'; // Correct the import path and component name if needed
import { getAllPokemon } from "../services/axios"

const playerArray = ref([])
const computerArray = ref([])
const playArea = ref([])
const isButtonActive = ref(false)
const onButtonClicked = (isActive: boolean) => {
  // Update the active state in the parent component based on the emitted value
  isButtonActive.value = isActive;
};

var pokeData = getAllPokemon()
  .then((pokemonData) => {
    const [array1, array2] = chooseTwoArrays(pokemonData);
    playerArray.value = array1
    computerArray.value = array2
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

function play (index: number , playerType: string){
    if (playerType == "player"){
        playArea.value.push(playerArray.value.splice(1,index)[0])

    }else{
        console.log("test Plaey area enemy",)
        playArea.value.push(computerArray.value[index])
        // computerArray.value.splice(1,index)[0]
        console.log(playArea.value)
    }
}

function enemyPlay (){
    const randomIndex = Math.floor(Math.random() * computerArray.value.length);
    console.log('AnyThing')
    play(computerArray.value[randomIndex],'enemy') ;
}


onMounted(()=>{
    enemyPlay()
})

</script>

<style>
</style>
