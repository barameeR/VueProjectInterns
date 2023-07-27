<script setup lang="ts">
import { ref } from 'vue'
const imageClass = ref('image-container')
</script>

<template>
  <div class="center-div">
    <div class="single-column-button">
      <slot></slot>
    </div>
  </div>
  <!-- <img :class='imageClass' src="../assets/design/stage.png"/> -->
</template>
<style>
.single-column-button {
  display: flex;
  flex-direction: column;
}

.center-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Optional: This sets the container to be the full height of the viewport */
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