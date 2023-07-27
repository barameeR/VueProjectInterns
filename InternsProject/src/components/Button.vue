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
    <img :src="imgSrc" alt="Button Image">
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

.image-button {
  background-color: #3aa112;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 250px;
  font-size: 25pt;
  border: 5px solid #046000;
  border-radius: 100px;
  font-weight: 900;
  color: black;
}
</style>