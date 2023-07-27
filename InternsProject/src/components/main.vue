<script setup lang="ts">
    import { ref } from 'vue'
    const imageClass = ref('image-container')
</script>

<template>
    <slot></slot>
    
    <img :class='imageClass' src="../assets/design/stage.png"/>

</template>
<style>
.image-container {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set the container height to the full viewport height */
}
.image-container img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
}
</style>