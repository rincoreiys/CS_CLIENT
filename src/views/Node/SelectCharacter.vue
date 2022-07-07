<template>
    <div class="h-100" style="display: flex;  justify-content: center; flex: 1; align-items: center;">
        <div class="text-center" style="max-width:360px">
            <!-- <img src="../assets/persona.svg" style="width:90px; opacity:0.3" /> -->

            <template v-if="logged_account">
                <button type="button" @click="changing_state = false" class="btn btn-white me-4 text-muted">Cancel
                </button>

            </template>
            <!-- <div class=" text-center" style="max-width:360px; margin-bottom:100px">
                <img src="../../assets/find-user.svg" style="width:80px; opacity:0.2" />
                <div style="margin-bottom: 50px; margin-top: 30px">
                   <h5 style=" opacity:0.5 "> Character not Bound</h5>
                </div>
                  

            </div> -->
            <h2> Select Character</h2>
            to Continue


            <div class="d-flex" style="margin-top:40px" >
                <CharacterPicker :items="$store.characters" :keyword="['character']" :text="'character'"
                    :alternative-text="'account'"></CharacterPicker>
                <!-- <button type="button" @click="open" class="btn btn-white me-4 text-muted">Auto Pick </button> -->
                <button type="button"  v-if=" $store.selected_character"
                    @click="$socket.emit('bind_character', $store.selected_node, $store.selected_character); "
                    class="btn btn-rounded btn-dark btn-round  ms-2 "
                    style="border-radius:10px; padding:8px 15px 8px 15px;"> 
                    <i class="fa-regular fa-angle-right"></i>
                    </button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import CharacterPicker from './../../components/CharacterPicker.vue'
// const logged_account = computed(() => store.nodes[store.selected_node].character  )
const emit = defineEmits(['update:modelValue'])
defineProps({
    modelValue: Object,
})

const changing_state = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

</script>