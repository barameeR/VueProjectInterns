<script setup lang="ts">
import { ref } from 'vue'
const imageClass = ref('image-container')
</script>

<template>
  <div class="container">
    <div class="banner"></div>
    <div class="center-div">
      <div class="single-column-button">
        <slot></slot>
      </div>
    </div>
  </div>
  <!-- <img :class='imageClass' src="../assets/design/stage.png"/> -->
</template>
<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;  
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  margin-top: 20px;
  /* min-height: 100vh; This ensures the container takes up at least the full height of the viewport */
}
.banner {
  width: 100%;
  height: 300px;
  /* Set the desired height of the div */
  background-image: url('../assets/design/bg2.png');
  background-size: contain;
  /* Adjust to 'contain' if you want to keep the image's aspect ratio */
  background-position: center center;
}

.single-column-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.center-div {
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; */
  /* Optional: This sets the container to be the full height of the viewport */
  /* margin-top: 20px; */
}

.image-container {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Set the container height to the full viewport height */
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}
</style>