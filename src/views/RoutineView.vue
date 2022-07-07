<template>

<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
     style="width: 300px; border-right:1px solid rgba(0,0,0,0.05)">
    <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <svg class="bi me-2" width="30" height="24">
            <use xlink:href="#bootstrap"></use>
        </svg>
        <span class="fs-5 fw-semibold">Routine</span>
    </a>
    <div class="list-group list-group-flush border-bottom scrollarea">
        <template v-for="(character, index) in routine" :key="index"  >

            <Character :data="character"   :active="selected_character == index"  @click="selected_character = index"/>
        </template>
    </div>
</div>
<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-red" style="flex:1">
   History
</div>
<div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-red" style="width: 300px; border-left:1px solid rgba(0,0,0,0.05)">
      
     
</div>

</template>

<script setup>
import Character from './../components/CharacterItem.vue'
import io from 'socket.io-client'
import { reactive, ref } from 'vue'
import {
    onMounted
} from 'vue'
const socket = io('http://127.0.0.1:3000')
const selected_charac = ref(0)
const routine_category = ref([])


// socket.on("position", data => {
//         console.log(data)
// })

socket.on("load_character_response", (data) => {
    characters.value = data
})

onMounted(() => {
    socket.emit('load_character_request')
})
</script>
