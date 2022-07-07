<template>
    <a class="list-group-item list-group-item-action  py-0 px-2 " :class="selected ? 'selected' : ''"
        aria-current="true">
        <div class="d-flex w-100 align-items-center ">
            <i class=" mx-2 fa fa-diamond" v-if="node == $store.selected_node"></i>
            <strong class=" me-auto ms-2 pr-4 py-3" @click="$emit('select', node )">Node  {{node}}</strong>

            <!-- <div class="form-check form-switch" @click="state_changed">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="state"     @change="on_state_changed">
            </div> -->
        </div>
    </a>
    
</template>

<style>
    .list-group-item.selected {
        background: #ececec;
        border-color: transparent;
    }
    .list-group-item {
           border-color: transparent;
        /* border: 1px solid rgba(0,0,0,.05); */
    }
</style>
<script>
    import {
        accounts
    } from './../stores/local'
    import collect from 'collect.js';
    export default {
        props: {
            data: Object,
            selected: Boolean,
            node: Number

        },
        // computed:{
        //     state:{
        //         get: (v) =>  v.data.hwnd !== 0,
        //         set: (v) => {
        //             this.
        //             console.log(v)
        //         }
        //     }
        // },

        // watch()
        methods: {
            // copy_hwnd(hwnd){
            //     if (navigator.clipboard) {
            //         navigator.clipboard.writeText(hwnd).then(() => {
            //           console.log('Copied to clipboard successfully.', );
            //         }, (err) => {
            //           console.log('Failed to copy the text to clipboard.', err);
            //         });
            //     } else if (window.clipboardData) {
            //         window.clipboardData.setData("Text", hwnd);
            //     }

            // },
            state_changed(event) {
                if (this.state) {
                    if (!confirm("are you sure")) {
                        event.preventDefault()
                        console.log(this.state)
                    }
                }


                // console.log(event)
                // this.state = true
            }
        }
    }
</script>
