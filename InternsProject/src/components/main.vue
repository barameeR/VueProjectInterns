<script setup lang="ts">
    import { ref } from 'vue'
    const imageClass = 'image'
</script>

<template>
    <img :class='imageClass' src="../assets/design/stage.png"/>
</template>
<style>
.image{
    width: 75%;
}
</style>