<template>
  <div>
    <v-container v-if="!gameEnd">
      <v-row>
        <v-col v-for="(pokemon, index) in computerArray" :key="pokemon.num" cols="auto">
          <Suspense>
            <card :pokemon="pokemon" playerType="enemy" />
          </Suspense>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(pokemon, index) in playArea" :key="pokemon.num" cols="auto">
          <Suspense>
            <div>
              <card :pokemon="pokemon" playerType="playArea">
                <v-card v-if="index == 0" class="mx-5" width="150" style="height: 100% !important; margin: auto;">
                  <v-img :src="pokeball" height="200px" aspect-ratio="1/1"></v-img>
                </v-card>
              </card>
              <div v-if="result && index == 0" style="display: flex; justify-content: center;">Round {{ result }}!</div>
              <div v-if="score && index == 1" style="display: flex; justify-content: center;">{{ score }}</div>
            </div>
          </Suspense>
        </v-col>

      </v-row>
      <v-row>
        <v-col v-for="(pokemon, index) in playerArray" :key="pokemon.num" cols="auto">
          <Suspense>
            <card :pokemon="pokemon" playerType="player" :initialActive="isButtonActive" :index="index"
              @button-clicked="onButtonClicked" />
          </Suspense>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="gameEnd && score >= 3">
      Congrats, you won!
      <v-btn @click="reloadGame">Replay</v-btn>
    </v-container>
    <v-container v-else>
      Ohhh you loser!!
      <v-btn @click="reloadGame">Replay</v-btn>
    </v-container>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from '../components/card.vue';
import { getAllPokemon } from "../services/axios"
// import  { type Pokedex } from '@/model/Pokemon';
import pokeball from "../assets/design/stage.png";
import { type Pokemon } from '@/model/Pokemon';
// import JSConfetti from 'js-confetti'
// import fetchDataFromJson from '@/services/fetchDataFromProject'

// const confetti = new JSConfetti();

const playerArray = ref<Pokemon[]>([]);
const computerArray = ref<Pokemon[]>([]);
const playArea = ref<Pokemon[]>([]);
const isButtonActive = ref(false)
const onButtonClicked = (isActive: boolean, index: number, playerType: string) => {
  isButtonActive.value = isActive;
  console.log(index, isActive)
  play(index, playerType)
  enemyPlay();
};
const result = ref("");
const score = ref<number>(0);
const gameEnd = ref(false);

function gameInit() {
  resetGameValue();
  fetchPlayerAndComputerArrays();
}

const resetGameValue = () => {
  playArea.value = [];
  isButtonActive.value = false;
  result.value = "";
  score.value = 0;
  gameEnd.value = false;
}

const fetchPlayerAndComputerArrays = async (): Promise<void> => {
  try {
    let path: string = "@/assets/pokemon.json";
    let pokemonData: Pokemon[];
    // pokemonData = await fetchDataFromJson();
    // console.log("Pokemon data from Json",pokemonData.pokedex)
    // pokemonData = await getAllPokemon();

    // if (process.env.NODE_ENV === 'development') {
    pokemonData = await getAllPokemon();
    // } else {
    //   pokemonData = await fetchDataFromJson(path);
    // }
    const [array1, array2] = chooseTwoArrays(pokemonData);
    playerArray.value = array1;
    computerArray.value = array2;
  } catch (error) {
    console.error('Error:', error);
  }
};

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function calculatePower(partition: any[]) {
  return partition.reduce((total, pokemon) => total + (pokemon.stats?.total || 0), 0);
}

function chooseTwoArrays(data: Pokemon[]) {
  let shuffledData = shuffleArray(data);
  console.log("Shuffle", shuffledData)

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

  if (playerType === 'player') {
    const removedElement = playerArray.value.splice(index, 1)[0];
    playArea.value.push(removedElement);
  } else {
    const removedElement = computerArray.value.splice(index, 1)[0];
    playArea.value.push(removedElement);
  }

  if (playArea.value.length > 1) {
    var playerStat = playArea.value[0].variations[0].stats.total;
    var enemyStat = playArea.value[1].variations[0].stats.total;

    if (playerStat > enemyStat) {
      result.value = "Won!";
      score.value++;
    }
    else {
      result.value = "Lost!";
    }

    if (computerArray.value.length == 0) {
      if (score.value > 2) {
        // confetti.addConfetti();
        gameEnd.value = true;
      }
      else {
        gameEnd.value = true;
      }
    }


    setTimeout(() => {
      if (computerArray.value.length != 0) {
        playArea.value = [];
        result.value = "";
        // enemyPlay();
      }
    }, 1000);
  }
  console.log(playerArray, computerArray)
}

function enemyPlay() {
  const randomIndex = Math.floor(Math.random() * computerArray.value.length);
  play(randomIndex, 'enemy');
}

function reloadGame() {
  gameInit()
}

onMounted(() => {
  gameInit();
})

</script>

<style></style>
