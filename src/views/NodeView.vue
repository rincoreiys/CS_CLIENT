<template>
    <!-- {{$store.nodes}} -->
    <div class="d-flex  w-100 ">
        <div class="d-flex flex-column w-100 p-5 py-0 " style="flex:1; margin-bottom:20px">
            <ul class="nav nav-pills " id="node-list" role="tablist" style="padding:15px; ">
                <li class="nav-item" role="presentation" v-for="[key, val] in Object.entries($store.nodes)">
                    <button class="nav-link"  style="box-shadow:none; outline:transparent" :class="$store.selected_node == key ? 'active' : ''"
                        data-bs-toggle="tab" type="button" role="tab" @click="$store.selected_node = key">Node {{ key
                        }}</button>
                </li>
            </ul>
            <!-- {{logged_account.routines}} -->
        
            <div class="d-flex flex-column  justify-content-center" style="flex:1; padding:15px; overflow-y:auto">
                <template v-if="$store.nodes[$store.selected_node].hwnd !== 0">
                    <template v-if="logged_account">
                        <RoutineMonitor :routines="routines" v-if="logged_account.routines.length"></RoutineMonitor>
                    </template>
                    <template v-else>
                        <SelectCharacter v-model="changing_character_state"></SelectCharacter>
                    </template>
                </template>
                <template v-else>
                    <div class="m-auto text-center" style="max-width:360px">
                        <img src="../assets/blockchain.svg" style="width:90px; filter: grayscale(90%);" />
                        <div class="mt-4">
                            Node not Active
                        </div>
                    </div>
                </template>
            </div>
            <div class="p-1 px-4 m-2 rounded-pill d-flex bg-light border" style=" font-size:14px;">
                <div class="form-check form-switch me-auto" stlye="flex:auto">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Automate</label>
                </div>
                <button class="btn btn-sm">
                    <i class="fa-regular fa-timer  me-2 my-auto"></i>

                    <span>Logs</span>

                    <i class="fa-light fa-angle-up my-auto ms-4 "></i>
                </button>


            </div>
        </div>
        <div class="d-flex flex-column  " style="padding-left:30px; width: 280px; border-left:1px solid rgba(0,0,0,0.05)" v-if="!!$store.nodes[$store.selected_node].character">
            <template v-if="$store.nodes[$store.selected_node].hwnd !== 0 && !!$store.nodes[$store.selected_node].character">
                <div class="my-auto">
                    <div class="my-4">

                        <div class="rounded-circle  bg-dark d-flex justify-content-center align-items-center ms-4 me-2"
                            style="width:120px;height:120px; margin-top:20px;  margin-bottom:20px" alt="Avatar">
                            <i class="fas fa-user-alt"></i>
                        </div>
                        <div class="d-flex align-items-center flex-shrink-0  ms-4 link-dark text-decoration-none ">
                            <div class="mb-4" style="text-align:left">
                                <h4 class="mb-0" style=" font-size: 18px; line-height:1">
                                    <span class="badge bg-primary "
                                        style=" background-color:dodgerblue; font-size: 12px;">S{{
                                                logged_account.server_number
                                        }}</span>
                                    {{ logged_account['character'] }}
                                </h4>
                                <small> Online</small>
                            </div>
                        </div>
                        <div class="d-inline text-center">
                            <button class="btn btn-light rounded mx-2 px-4 rounded-pill"
                                @click="changing_character_state = true">
                                <i class="fa-light fa-arrows-repeat me-1" style="font-size:18px"></i>


                            </button>
                            <button class="btn btn-light  rounded mx-2 px-4 rounded-pill" style="color:#dc3545"
                                @click="changing_character_state = true">
                                <i class="fa-light fa-power-off" style="font-size:18px; "></i>
                            </button>

                        </div>
                    </div>
                </div>
            </template>
        </div>

    </div>
</template>
<style>

.blue-outline{
    border: 2px solid rgb(194, 219, 254) !important; 

}
#node-list {
    border-color: rgba(0, 0, 0, 0.05)
}

#character-tab .nav-link,
#node-list .nav-link,
#routine .nav-link {
    color: #777;
    font-size: 18px;
    font-weight: 600;
    opacity: 0.5;
    display: inline-block;

}

#routine .nav-link {
    font-size: 16px;

}


#subTab .active {
    background: #333;
    color: white !important;
    border-radius: 20px
}

#character-tab .nav-link.active,
#node-list .nav-link.active,
#routine .nav-link.active {
    background: transparent;
    color: #000;
    opacity: 1;
    display: inline-block;
    position: relative;
    text-align: center;

    /* padding: 20px 10px; */
}

.nav-link.active.outlined {
    border: 1px solid rgb(180, 180, 180);
    outline: none;
    box-shadow: none;
}


#character-tab .nav-link.active,
#node-list .nav-link.active:before {
    transform: translate(-50%, 40%);
    border-radius: 100%;
    position: absolute;
    background: black;
    bottom: 0px;
    height: 6px;
    content: '';
    width: 6px;
    left: 50%;
    /* color: black;
    background-color: transparent;
    border-bottom: 2px solid black;
    border-radius: 0;
    outline-color: transparent; */
}

.dot {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
}

.avatar {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

</style>
<script setup>
import SelectCharacter from './Node/SelectCharacter.vue'
import RoutineSelector from './../components/RoutineSelector.vue'
import RoutineMonitor from './../components/RoutineMonitor.vue'
import { watch, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const tab = ref(0)
const changing_character_state = ref(false)
const router = useRouter()
let node_number = route.params.node_number

if (!!node_number) store.selected_node = parseInt(node_number)
else {
    store.selected_node = 1 // DEFAULT VALUE
    Object.entries(store.nodes).forEach(([i, n])=> {
    
        if (n.hwnd !== 0){
            store.selected_node = parseInt(i)
            return
        }
    })
    router.push("/node/"+store.selected_node)
    
}

store.selected_character = store.nodes[store.selected_node].character
const logged_account = computed(() => store.accounts[store.selected_character])
const routines = logged_account.value.routines.map((lr) => store.routines.find((sr) => sr.class_name == lr))    

</script>
