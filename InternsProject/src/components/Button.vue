<script setup lang="ts">
defineProps({
  btnStyle: String,
  imgSrc: String,
})
</script>

<template>
  <!-- <button class="image-button"> -->
  <button class="{{ btnStyle }}">
    <!-- <img src="../assets/design/pokeball.png" alt="Button Image"> -->
    <img :src="imgSrc" alt="buang">
    PLAY
  </button>
</template>
<style>
/* Style the image inside the button */
.image-button img {
  width: 100px;
  /* Set the desired width of the image */
  height: 100px;
  /* Set the desired height of the image */
  margin-right: 8px;
  /* Add some spacing between the image and the text */
}
</style>