<template>
    <!-- {{$store.nodes}} -->
    <div class="d-flex  w-100 ">
        <div class="d-flex flex-column w-100 " style=" transition: cubic-bezier(0.075, 0.82, 0.165, 1); background-color: #fefefe;">
            <template v-if="tab == 'routine'">
                <div class="d-flex" style="flex:1; overflow: auto;" v-if="exist_node">
                    <div style="width:360px; overflow-y:auto;" class="border-end d-flex flex-column">
                        <div
                            class="d-flex align-items-center border-bottom flex-shrink-0 p-3 link-dark text-decoration-none ">
                            <div class="fs-5 fw-semibold ms-2 me-auto">Node List</div>
                        </div>
                        <div id="node-list" role="tablist" style="flex:1;  overflow: auto; ">
                            <div class="d-flex border-bottom px-1" :class="val.state? ' p-3' : ''"
                                style="" v-for="[key, val] in Object.entries($store.nodes)">
                                <div class=" d-flex">
                                    <div class="d-flex justify-content-center align-items-center me-2 fw-light fs-6 text-secondary"
                                        style="width:45px;height:45px;" alt="Avatar">
                                        #{{ key }}
                                    </div>

                                </div>
                                <template v-if="val.state">
                                  <table class="w-100" v-if="val.account">
                                        <tr>
                                            <td rowspan="3" style="width:40px; vertical-align: top;">
                                                <div class="rounded  d-flex justify-content-center align-items-center me-3 fw-bold"
                                                    :class="'bg-light'" style="width:40px;height:40px;" alt="Avatar">

                                                </div>
                                            </td>
                                            <td colspan="2">
                                                <div style="align-self: center;" class=" fw-bold fs-6 ">
                                                    <span class="badge  "
                                                        style=" background-color:dodgerblue; font-size: 12px;">S{{val.account.server_number}}</span>
                                                    {{val.account.character}}
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 pb-3">
                                                <div class="spinner-border spinner-border-sm" role="status" v-if="val.active_routine">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <small class="ms-2 text-secondary">{{val.active_routine ||'Fetching routine....'}}</small>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="progress me-4" style="height: 2px;">
                                                    <div class="progress-bar " :style="`width:${(val.account.done.length / val.account.routines.length) *100 }%`" role="progressbar" aria-valuenow="52"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </td>
                                            <td>
                                                <small class="text-secondary">{{val.account.done.length}}/ {{val.account.routines.length}}</small>
                                            </td>
                                        </tr>
                                    </table>
                                </template>
                                <template v-else >
                                         <small class="text-secondary ms-2" style="align-self: center;flex:1">Node is Offline</small>

                                </template>
                            </div>
                        </div>
                    </div>
                    <div style="flex:1; background-color: #fefefe;" class="d-flex flex-column">
                         <template v-if="node">
                           <div class=" align-items-center  flex-shrink-0 p-3 link-dark text-decoration-none ">
                                <div class="fs-5 fw-semibold ms-2 me-auto">Routines</div>
                                  </div>
                        </template>
                      
                           
                        <template v-else>
                            <div class="m-auto text-center " style="max-width:360px">
                                <img src="../assets/blockchain.svg" style="width:90px; filter: opacity(0.5)" />
                                <div class="mt-4">
                                    There's no active Node
                                </div>
                            </div>
                        </template>
                  
                    </div>
                </div>
                <template v-else>
                   <div class="m-auto text-center " style="max-width:360px">
                        <img src="../assets/blockchain.svg" style="width:90px; filter: opacity(0.5)" />
                        <div class="mt-4">
                             There's no active Node
                        </div>
                    </div>
                </template>
            </template>
            <div v-if="tab == 'bucket'" id="json-editor"  style="flex:1">
                <div
                    class="d-flex align-items-center border-bottom flex-shrink-0 p-3 link-dark text-decoration-none ">
                    <div class="fs-5 fw-semibold ms-2 me-auto">Server Bucket</div>
                </div>
                <JsonEditorVue v-model="$store.bucket"  style="flex:1"/>


            </div>


        </div>
        <div class="d-flex flex-column  border-start" style="width: 80px;">
            <ul class="nav  my-auto text-center ">
                <li class="nav-item rounded-3 " @click="tab = 'routine'"
                    style="   width: 50px;    height: 50px;    margin: 15px;  margin-top: 10px;      padding: 10px;   ">
                    <a class="nav-link p-0 ">
                        <i class=" fa-calendar-circle-user" :class="tab == 'routine' ? 'fa-solid' : 'fa-light'"
                            style="font-size:19px;  color:#333; ; vertical-align:sub"></i>
                    </a>
                </li>
                <li class="nav-item rounded-3 "
                    style="   width: 50px;    height: 50px;    margin: 15px;   margin-top: 10px;   padding: 10px; "
                    @click="tab = 'bucket'">
                    <a class="nav-link p-0">
                        <i class="fa-light fa-database" :class="tab == 'bucket' ? 'fa-solid' : 'fa-light'"
                            style="font-size:19px; color:#333;  vertical-align:sub"></i>
                    </a>
                </li>

            </ul>
        </div>
    </div>
</template>
<style>
.blue-outline {
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

import JsonEditorVue from 'json-editor-vue'
import { watch, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const changing_character_state = ref(false)
const tab = ref('routine')
const router = useRouter()
const node_number = computed(() => {
    return !!route.params.node_number ? parseInt(route.params.node_number) : 1
})

watch(() => store.selected_node, (n, o) => {
    tab.value = 'routine'
})

if (typeof node_number.value == "undefined") router.push("/node/1")



const logged_account = computed(() => {
    let account = Object.assign({}, store.nodes[node_number.value].account)
    if (account) {
        //POPULATED ROUTINES
        account.routines = account.routines.map(ar => {
            let routine = store.routines.find(r => r.class_name == ar)
            if (routine) {
                routine.done = account.done.includes(routine['class_name'])
            }
            return routine
        }).filter(ar => !!ar)
    }
    return account
})

const exist_node = computed(() => Object.values(store.nodes).find(n => n.state) )
const node = computed(() => store.nodes[node_number.value])



</script>
