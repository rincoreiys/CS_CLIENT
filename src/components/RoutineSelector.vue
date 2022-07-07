<template>
   
    <div class="d-flex flex-column p-5" style="flex:1">
       
       
        <div class="d-flex  my-3">
             <div class=" px-3" style="font-weight:500; font-size: 24px; padding-bottom:20px" colspan="3">Routine</div>
            <!-- <div class=" input-group rounded bg-light " style="width:320px;height:40px; border: 1px solid #eee;">
                <div class="input-group autocomplete bg-light">
                    <input type="text" class="form-control border-0 bg-light" style="box-shadow: none;"
                        placeholder="Search Routine" v-model="search">
                </div>
            </div> -->
            <ul class="nav nav-pills ms-auto dark" id="routine" role="tablist">
                <li class="nav-item" v-for="(g, i) in group" :key="i" @click="selected_group = g">
                    <button class="nav-link outlined" :class="g == selected_group ? 'active' : ''"
                        data-bs-toggle="pill" type="button" role="tab">{{ g }}</button>
                </li>
            </ul>
             <i class="fa-light fa-magnifying-glass"></i>
        </div>
        <div style="overflow:auto">
                <tr v-for="(routine, i ) in routine_list" :key="i"
                    style="border-bottom: 1px solid rgba(0,0,0,0.03) ; display:inline-table;  width:100%"
                    @mouseenter="hover_index = i">
                    <td style="width:50px" class="text-center">
                        <input class="form-check-input fluent-input" type="checkbox" :value="routine"
                            v-model="selected_routine" :id="`routine-option-${i}`">
                    </td>

                    <td class="py-3 px-3" style="font:16px Arial; font-weight:500; width:250px ">
                        <label class="form-check-label" :for="`routine-option-${i}`">
                            {{ routine.class_name }}
                        </label>

                    </td>
                    <td>
                        <button type="button" class="btn" @click="toggle_dk(routine)"
                            :style="routine.require_dk ? '' : 'opacity:0.3'"
                            :class="routine.require_dk ? 'bg-light btn-sm rounded-pill ' : ''"
                            v-if="((selected_routine.includes(routine) && hover_index == i) || (routine.require_dk && selected_routine.includes(routine))) && routine.routine_type == 'Dungeon'">

                            <i class=" fa-solid fa-key-skeleton "></i>
                        </button>
                    </td>
                </tr>
        </div>
           <button type="button" class="btn btn-primary rounded-pill  px-4 mt-4 ms-auto" @click="save"
                    style="font-weight:500">Save</button>
    </div>
</template>
<style>
.fluent-input {
    padding: 12px;
    border: 1px solid rgba(0, 0, 0, 0.13)
}

.fluent-input:checked {

    border: none;
}
</style>
<script setup>
import { computed, ref, watch } from 'vue'
const props = defineProps({
    view: {
        type: String,
        default: 'summary'
    },
    tab: {
        type: String,
        default: 'All'
    }

})

const selected_routine = ref(JSON.parse(JSON.stringify(store.accounts[store.selected_character].routines)))
const character = computed(() => store.accounts[store.selected_character])
const search = ref("")
const hover_index = ref(-1)
const selected_group = ref(props.tab)
const group = ["All", "Selected", "Dungeon", "Daily"]
const routine_list = computed(() => {
    if (selected_group.value == "All") return store.routines.filter(
        (r) => {
            return r.class_name.toUpperCase().includes(search.value.toUpperCase())
        })
    if (selected_group.value == "Selected") return store.routines.filter(r => selected_routine.value.includes(r.class_name))
    else {
        return store.routines.filter(r => r.routine_type == selected_group.value)
    }
})

async function save() {
    let account = Object.assign({}, store.accounts[store.selected_character])
    account.routines = selected_routine.value
    store.save_account(account)
}
function toggle_dk(routine) {
    let index = selected_routine.value.indexOf(routine)
    routine.require_dk = !routine.require_dk
    elected_routine.value[index] = routine
}

watch(search, (n, o) => {
    if (n !== "") {
        selected_group.value = "All"
    }
})
</script>
