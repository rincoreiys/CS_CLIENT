<template>
    <!-- {{$store.nodes}} -->

    <div class="d-flex   w-100">
        <!-- {{character}} -->
        <div class="d-flex flex-column" style="flex:1;">
            <div class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none ">
                <router-link to="/character" class="btn  " style="font-weight:bold; height:50px; font-size:22px">
                    <i class="fa-light fa-angle-left me-4"></i>
                </router-link>

                <span class="fs-5 fw-semibold ms-2">Edit Character</span>
               
            </div>
            <div class="d-flex" style="flex:1; overflow:auto">
                <div class="p-5 d-flex flex-column align-items-center" style="flex:2">
                    <div class="rounded-circle d-flex justify-content-center  align-items-center"
                        style="width:120px;height:120px; margin-top:20px; background-color:#eee;  margin-bottom:25px"
                        alt="Avatar">
                        <!-- <i class="fas fa-user-alt"></i> -->
                    </div>
                    <div class="d-flex align-items-center flex-shrink-0  link-dark text-decoration-none ">
                        <div class="mb-4" style="text-align:left">
                            <h4 class="mb-0" style=" font-size: 18px; line-height:1">
                                <span class="badge bg-primary "
                                    style=" background-color:dodgerblue; font-size: 12px;">S{{
                                            character.server_number
                                    }}</span>
                                {{ character['character'] }}
                            </h4>
                            <!-- <small> Online</small> -->

                        </div>
                    </div>
                    <form class="flat my-4" style="flex:1">
                        <div class="mb-4">
                            <label for="exampleInputEmail1" class="form-label">Email </label>
                            <div class="input-group rounded">
                                <span class="input-group-text" id="basic-addon1">@</span>
                                <input type="email" class="form-control  py-2" v-model="character.account">
                            </div>
                        </div>


                        <label for="exampleInputPassword1" class="form-label">Character & Server</label>
                        <div class="input-group mb-4  rounded py-1">
                            <span class="input-group-text pe-0" id="basic-addon1"> S</span>
                            <select class="form-select   " id="inputGroupSelect01" style="max-width:80px; box-shadow:none;"  v-model="character.server_id">
                              
                                <option v-for="(sl, i) in  $store.server_list" :key="i" :value="sl.server_id">{{sl.server_name.match(/\d+/g).join('')}}</option>
                              
                            </select>
                            <input type="email" class="form-control " v-model="character.character">

                        </div>

                        <div class="mb-4">
                            <label for="exampleInputPassword1" class="form-label">Loot Focus</label>
                            <div class="input-group rounded py-1">
                                <span class="input-group-text " id="basic-addon1"> <i
                                        class="fa-light fa-hand"></i></span>
                                <select class="form-select" v-model="config.loot_focus">
                                    <option value="item">Item</option>
                                    <option value="equip">Equip</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <button class="btn  rounded-pill w-100  blue-outline" style="font-weight:500; height:50px">Change  Password</button>
                </div>
                <div class="d-flex flex-column p-5" style="flex:5">

                    <div class="d-flex  mb-5" >
                        <template v-if="search_mode">
                           <div class="input-group rounded flat" >
                                <span class="input-group-text border-0" id="basic-addon1" style="font-size:20px">
                                    <i class="fa-light fa-magnifying-glass"></i>
                                </span>
                               <input type="text" class="form-control border-0 " style="box-shadow: none; font-size:20px"
                                    placeholder="Search Routine" v-model="search">
                            </div>
                        </template>
                        <template v-else>
                             <div class=" px-3 me-auto" style="font-weight:500; font-size: 24px; " colspan="3">   Routine</div>
                              <ul class="nav nav-pills ms-auto dark my-auto" id="routine" role="tablist">
                                <li class="nav-item" v-for="(g, i) in group" :key="i" @click="selected_group = g">
                                    <button class="nav-link outlined" :class="g == selected_group ? 'active' : ''"
                                        data-bs-toggle="pill" type="button" role="tab">{{ g }}</button>
                                </li>
                            </ul>
                        </template>
                       
                      
                        <button class="btn  rounded ms-5 my-auto " @click="search_mode = !search_mode"
                            style="height:42px; font-weight:bold; font-size:20px">
                            <i :class="search_mode ?   'fa-light fa-xmark' : 'fa-light fa-magnifying-glass' "></i>
                        </button>

                    </div>
                    <!-- {{ selected_routine }}
                    {{ config }} -->
                    <div style="overflow:auto; flex:1" class="p-2">
                        <tr v-for="(routine, i ) in routine_list" :key="i"
                            style="border-bottom: 1px solid rgba(0,0,0,0.03) ; display:inline-table;  width:100%"
                            @mouseenter="hover_index = i">
                            <td style="width:50px" class="text-center">
                                <input class="form-check-input fluent-input" type="checkbox" :value="routine.class_name"  v-model="selected_routine" :id="`routine-option-${i}`">
                            </td>

                            <td class="py-3 px-3" style="font:16px Arial; font-weight:500; width:250px ">
                                <label class="form-check-label" :for="`routine-option-${i}`">
                                    {{ routine.class_name }}
                                </label>
                            </td>
                            <td>
                                <button type="button" class="btn" @click="toggle_dk(routine)"
                                    :style="config.routine.require_dk.includes(routine.class_name) ? '' : 'opacity:0.3'"
                                    :class="config.routine.require_dk.includes(routine.class_name) ? 'bg-light btn-sm rounded-pill ' : ''" v-if="(
                                    (selected_routine.includes(routine.class_name) && hover_index == i) || (config.routine.require_dk.includes(routine.class_name) && selected_routine.includes(routine.class_name)))
                                    && routine.routine_type == 'Dungeon'">

                                    <i class=" fa-solid fa-key-skeleton "></i>
                                </button>
                                <button type="button" class="btn" @click="toggle_skip(routine)"
                                    :style="config.routine.skip_enter.includes(routine.class_name) ? '' : 'opacity:0.3'"
                                    :class="config.routine.skip_enter.includes(routine.class_name) ? 'bg-light btn-sm rounded-pill ' : ''" 
                                    v-if="(
                                    (selected_routine.includes(routine.class_name) && hover_index == i) || (config.routine.skip_enter.includes(routine.class_name) && selected_routine.includes(routine.class_name)))
                                    && routine.routine_type == 'Daily'">

                                   <i class="fa-solid fa-forward"></i>
                                </button>
                            </td>
                        </tr>
                    </div>
                    <button type="button" class="btn btn-primary rounded-pill  px-4 mt-4 ms-auto" @click="save"
                        style="font-weight:500; height:50px">Save</button>
                </div>
            </div>

        </div>
        <div class="d-flex flex-column" style=" border-left:1px solid rgba(0,0,0,0.05)">
            <ul class="nav  flex-column  text-center mt-auto pb-5 ">
                <li class="nav-item rounded-3  rounded-pill "  data-bs-toggle="modal" data-bs-target="#disable-account" style=" width: 50px; height: 50px; margin:  15px; margin-top: 10px; padding: 10px;     ">
                    <a href="#" class="nav-link p-0   " style="color:black">
                        <i class="fa-light fa-ban" style="font-size:19px; font-weight:500; vertical-align:sub;"></i>

                    </a>
                </li>
                <li class="nav-item rounded-3 border rounded-pill " data-bs-toggle="modal" data-bs-target="#delete-account"  style="
                        width: 50px;
                     
                        height: 50px;
                        margin: 0 15px;
                        margin-top: 10px;
                        padding: 10px;
                        
                    ">
                    <a href="#" class="nav-link p-0   " style="color:black">
                        <i class="fa-light fa-trash-can"
                            style="font-size:19px; font-weight:500; vertical-align:sub;"></i>

                    </a>
                </li>
            </ul>
        </div>
    </div>
    
<!-- Modal -->
<div class="modal fade  " id="delete-account" tabindex="-1"  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:360px">
   <div class="modal-content rounded-3 shadow">
      <div class="modal-body p-4 ">
        <h5>Delete {{character.character}} ? </h5>
        <p class="mb-0">Be carefull, this action cant be undo</p>
      </div>
      <div class="modal-footer flex-nowrap p-0">
        <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-end text-danger" @click="delete_character"><strong>Delete</strong></button>
        <button type="button" class="btn btn-lg  fs-6 text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade  " id="disable-account" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="max-width:360px">
   <div class="modal-content rounded-3 shadow">
      <div class="modal-body p-4 ">
        <h5>Disable {{character.character}} ? </h5>
        <p class="mb-0">When character disabled, character won't be loaded to macro instance</p>
      </div>
      <div class="modal-footer flex-nowrap p-0">
        <button type="button" class="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-end" @click="set_character_state(!character.config)" ><strong>Disable</strong></button>
        <button type="button" class="btn btn-lg  fs-6 text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>


<script setup>
import RoutineSelector from './../../components/RoutineSelector.vue'
import { watch, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const search_mode = ref(false)
store.selected_character = route.params.id
const character = ref(Object.assign({}, store.accounts[store.selected_character]))
console.log(character.value)

const selected_routine = ref(JSON.parse(JSON.stringify(store.accounts[store.selected_character].routines)))
const config = ref(JSON.parse(JSON.stringify(store.accounts[store.selected_character].config)))
const search = ref("")
const hover_index = ref(-1)
const selected_group = ref("Selected")
const character_config = ref({
    require_dk: []
})
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
    let account = character.value
    account.config = config.value
    account.routines = selected_routine.value
    store.save_character(account)
}
function delete_character() {
    store.delete_character(character.value)
}
function set_character_state(state) {
    let account = character.value
    account.config = config.value
    account.config.disable = state
    account.routines = selected_routine.value
    store.save_character(account)
}

function toggle_dk(routine) {
    let require_dk_config = (config.value).routine.require_dk
    let index = require_dk_config.indexOf(routine.class_name)
    index == -1 ? require_dk_config.push(routine.class_name) : require_dk_config.splice(index, 1)
}
function toggle_skip(routine) {
    let skip_enter_config = (config.value).routine.skip_enter
    let index = skip_enter_config.indexOf(routine.class_name)
    index == -1 ? skip_enter_config.push(routine.class_name) : skip_enter_config.splice(index, 1)
}

watch(search, (n, o) => {
    if (n !== "") {
        selected_group.value = "All"
    }
})

watch(selected_routine, (n, o) => {
    let require_dk_config = (config.value).routine.require_dk
    config.value.routine.require_dk = require_dk_config.filter(rdc => {
        console.log(rdc, n)
        return n.includes(rdc)
    })
    // console.log(require_dk_config)
})
</script>
