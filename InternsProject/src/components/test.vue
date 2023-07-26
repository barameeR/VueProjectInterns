<script setup>
import {ref} from 'vue'

const count = ref(0)
</script>
<template>
    <div class="container">
        <div class="number">
            {{ count }}
        </div>
        <button @click = "count++">+</button>
        <button @click = "count--">-</button>
    </div>

</template>

<style>
button{
    width: 2rem;
    align-items: ;
}
.container{
    background: red;
    width: 100%;
    height: 5rem;
    justify-content: center;
}
</style>