<template>
    <table  v-if="routines" style="width:100%">
        <thead style="font-size:24px; font-weight:500">
            <tr>
                <td style="width:300px; text-align:right;padding-right:50px; padding-bottom:20px">
                    Routine</td>
                <td style="opacity:0.5; padding-bottom:20px"></td>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td style="width:250px; text-align:right;padding-right:50px">
                    <div class="nav flex-column nav-pills" id="routine" role="tablist" aria-orientation="vertical">
                        
                        <button class="nav-link rounded-pill" 
                       
                            :class="activeRoutine == r.class_name ? 'active blue-outline': ''" data-bs-toggle="pill" type="button" role="tab"
                            v-for="(r, i) in routines" style=" text-align:right; box-shadow:none; outline:transparent; border:transparent">{{ r.class_name}}
                            <i class="fa-thin fa-circle-check" v-if="r.done"></i>
                        </button>
                    </div>

                </td>
                <td style="height:400px; overflow:auto; display:block">
                    
                    <!-- Fetching Subroutine -->
                    <div class="list-group list-group-flush" id="subroutine" v-if="subroutine">
                        <div class="list-group-item list-group-item-action " :style="activeIndex == index ? '':  activeIndex > index ? 'opacity:0.8' : 'opacity:0.3'"  v-for="([index, sub], i) in subroutine"  :key="i">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1" style="font-weight:600; font-size:18px">
                                    {{sub.title}}
                                </div>
                               
                                <small>
                                     <i v-if="active_subroutine > index " class="fa-light fa-circle-check"></i>
                                     <div v-if="active_subroutine == index " class="spinner-border spinner-border-sm  "
                                     role="status"> </div>
                                    <!-- {{active_subroutine == index ? 'Running' :    active_subroutine > index  ? '': '' }} -->
                                    </small>
                            </div>
                            <small class="mb-1">   {{sub.desc}}</small>
                        </div>
                      
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import {computed, ref} from 'vue'
const props = defineProps({
    
    routines: {
        type: Array,
        default: []
    },
    activeIndex: {
        type: Number,
        default: 0
    },
    activeRoutine: {
        type: String
    }
})



const subroutine = computed(() => {
    let routine = props.routines.find(r => r.class_name == props.activeRoutine)
    
    return !!routine ?  Object.entries(routine.subroutine) : null
})
</script>