<template>
    <div class="d-flex w-100">
        <div class=" d-flex flex-column" style="flex:1">
            <div class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none ">
               
                <template v-if="search_mode">
                    <div class="input-group rounded flat">
                        <span class="input-group-text border-0" id="basic-addon1" style="font-size:20px">
                            <i class="fa-light fa-magnifying-glass"></i>
                        </span>
                        <input type="text" class="form-control border-0 " style="box-shadow: none; font-size:20px"
                            placeholder="Search Character" v-model="search">
                    </div>
                </template>
                <template v-else>
                     <div class="fs-5 fw-semibold ms-2 me-auto">Character List</div>
                </template>
                <button class="btn  rounded ms-3 my-auto " @click="search_mode = !search_mode"
                    style="height:42px; font-weight:bold; font-size:20px">
                    <i :class="search_mode ?   'fa-light fa-xmark' : 'fa-light fa-magnifying-glass' "></i>
                </button>
                <button class="btn rounded ms-3 my-auto rounded-pill border px-3 d-flex" @click="search_mode = !search_mode"
                    style="height:50px; width:120px; font-weight:bold;">
                     <i class="fa-solid my-auto fa-plus-large me-4 text-primary" ></i>
                     <span>New</span>
                </button>
              
            </div>
            <table class=" d-flex flex-column" style="flex:1; overflow-y:auto">
                <thead style="" class="border-bottom py-3"> 
                    <tr style="font-size: 16px; font-weight:600 ">
                        <td style="width:60px"></td>
                        <td style=" width:240px " class=" px-3">
                            Character Name
                        </td>
                         <td class="text-center" style="width:120px " >
                            Focus
                         </td>
                        <td style="width:500px" class="px-4">
                            Routines
                        </td>
                        <td>
                            Needs
                        </td>
                    </tr>
                </thead>
                <draggable tag="tbody" :disabled="!draggable_state" :list="populated_routine_character" :item-key="'priority'" @end="on_ordering"
                    style="flex:1; overflow-y:auto; " handle=".handle">
                    <template #item="{ element, index }">
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.05  ) ;" class="d-block" @click="$router.push(`/character/${element._id}`)">
                         
                            <td class="handle px-4" style="width:60px">
                                <i class="fa-solid fa-grip-dots-vertical" ></i>
                            </td>
                            
                            <td class="py-3 px-3" style="font:16px Arial; font-weight:500;width:240px ">
                                <label class="form-check-label" >
                                    {{ element.character }}
                                </label>
                            </td>
                            <td  class="text-center" style="width:120px " >
                                <i :class="element.config.loot_focus  == 'equip'?  'fa-solid fa-helmet-battle' :'fa-solid fa-boxes-stacked'"></i>
                            </td>
                            <td class="p-4 " style="width:500px ">
                                <button type="button" class="btn  shadow btn-sm rounded-pill px-3 py-1 m-2 position-relative"
                                    v-for="(routine, i) in element.routines " :key="i"
                                    :class="routine.routine_type == 'Dungeon' ? 'bg-dark text-white' : routine.routine_type == 'Corruption' ?  'bg-secondary text-white' : 'bg-light'"
                                    >
                                    <div>{{ routine.class_name }} </div>
                                    <span v-if=" element.config.routine.require_dk.includes(routine.class_name ) && routine.routine_type == 'Dungeon'" class="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-primary border border-light ">
                                         <i class=" fa-solid fa-key-skeleton "></i>
                                    </span>
                                    <span v-if=" element.config.routine.skip_enter.includes(routine.class_name ) && routine.routine_type == 'Daily'" class="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-secondary border border-light  p-1">
                                         <i class="fa-solid fa-forward"></i>
                                    </span>
                                    <span v-if=" routine.routine_type == 'Corruption'" class="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-danger  border border-light p-1">
                                         {{element.config.corruption_limit}}
                                    </span>
                                    <!-- <span v-if=" element.config.routine.require_dk.includes(routine.class_name ) && routine.routine_type == 'Dungeon'" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                        <span class="visually-hidden">New alerts</span>
                                    </span> -->
                                </button>
                            </td>
                         
                            <td >
                                <template v-for="(n,i) in element.needs" :key="i" >
                                    <div  class=" rounded-pill me-2 " style="height:35px; width:35px; background-color:rgb(255,235,100); display:inline-grid; vertical-align: middle;" v-if="n == 'Gold'" > 
                                        <i class="fa-solid fa-circle-dollar  m-auto " style=" font-size:25px; color:rgb(225,155,0); " ></i>
                                    </div>
                                   <div  class="rounded-pill me-2 " style="height:35px; width:35px; color:rgb(225,185,0); background-color:rgb(240,240,240);     vertical-align: middle; display:inline-grid" v-if="n == 'DK'">
                                         <i class="fa-solid fa-key-skeleton  m-auto " style="color:#333; font-size:18px" ></i>
                                    </div>
                                  
                                </template>
                            </td>
                        </tr>
                    </template>
                </draggable>
                <tfoot class="py-2 border-top text-muted">
                    <tr style="font-size: 16px;  ">
                        <td style="width:60px"></td>
                        <td style=" width:240px " class=" px-3">
                            {{populated_routine_character.length}} Character
                        </td>
                    </tr>
                </tfoot>


            </table>

        </div>
        <div class="d-flex flex-column" style=" border-left:1px solid rgba(0,0,0,0.05)">
            <ul class="nav  flex-column  text-center  " style="padding-top:141px">
               
                <!-- <li class="nav-item rounded-3  rounded-pill " 
                    @click="arrange_mode = true"
                    style="  width: 50px;
                        height: 50px;
                        margin: 0 15px;
                        margin-top: 10px;
                        padding: 10px;
                        
                    ">
                    <a href="#" class="nav-link p-0   " style="color:black">
                        <i class="fa-solid fa-arrow-down-short-wide"
                            style="font-size:19px; font-weight:500; vertical-align:sub;"></i>

                    </a>
                </li> -->
            </ul>
        </div>
    </div>
</template>
<script setup>

import { computed, ref, watch } from 'vue'
import draggable from 'vuedraggable'
const hover_index = ref(-1)
const selected_group = ref("All")
const search_mode = ref(false)
const arrange_mode = ref(false)
const draggable_state = ref(true)
const character_list = ref(store.accounts.sort((a, b) => a.priority - b.priority))
// const group = ["All", "Selected", "Dungeon", "Daily"]
// const routine_list = computed(() => {
//     if (selected_group.value == "All") return store.routines
//     else {
//         return store.routines.filter(r => r.routine_type == selected_group.value)
//     }
// })

console.log(character_list.value)
const populated_routine_character = ref(
    clone( character_list.value).map(cl => {
        console.log(cl.character, cl.routines)
        cl.routines =  cl.routines.map(r => store.routines.find(cn => cn.class_name == r)  )
        return cl
    })
)

async function on_ordering(){
    draggable_state.value = false
    console.log("DRAG END")
    let simplified_payload = populated_routine_character.value.map(c => ({_id : c._id, character: c.character}))
    console.log(simplified_payload)
    await store.save_account_priority(simplified_payload)
    draggable_state.value = true
   

}


</script>