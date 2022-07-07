<template>
    <div class=" input-group rounded mx-auto " style="width:320px;height:40px; border: 1px solid #eee;" :class="inputFocus?   'shadow-sm': ''">
        <div class="input-group autocomplete" id="autocomplete-wrapper" @click="inputFocus = true">
            <div class="d-flex" v-if="search && !inputFocus && $store.selected_character">
                <h5 class="my-auto ms-1 me-1"><span class="badge bg-light " style="color:black">S{{
                        $store.selected_character.server_number
                }}</span></h5>
            </div>
            <input type="text" class="form-control border-0" style="box-shadow: none;" placeholder="Type a character"     v-model="search">
            <button type="button" v-if="$store.selected_character" class="btn btn-sm bg-transparent" style="margin-right: 5px; z-index: 100;" @click="reset">
                <i class="fa fa-times"></i>
            </button>
            <button type="button" class="btn  dropdown-toggle dropdown-toggle-split" v-if="!$store.selected_character"
                style="width:38px; outline-color:none; box-shadow:none">
            </button>
        </div>
        <div id="autocomplete-list" class="autocomplete-items text-start" v-if="inputFocus">
            <div v-for="(item, index) in filtered" :key="index" @click="select(item)"
                v-html="textFormatter(item['character'])" :class="index == currentFocus ? 'autocomplete-active' : ''">
            </div>
        </div>

    </div>

</template>
<style >

.autocomplete {
    font: 16px Arial;
}

.autocomplete-items {
    position: absolute;
    border-radius: 10px;
    border: 1px solid #f8f8f8;
    /* background-color: 1px solid #f8f8f8; */
    /* border-bottom: none; */
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 110%;
    overflow-y: auto;
    max-height: 150px;
    padding-top: 8px;
    left: 0;
    right: 0;
}

.autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #f9f9f9;
}

.autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #f7f7f7;
}

.autocomplete-active {
    /*when navigating through the items using the arrow keys:*/
    background-color: DodgerBlue !important;
    color: #ffffff;
}
</style>

<script setup>
import { onMounted, computed, ref, watch } from 'vue'
const inputFocus = ref(false)
const search = ref("")

const textFormatter = (text) => {
    let val = search.value
    if (val.length == 0 || typeof val === "undefined") return text
    else {
        return "<strong>" + text.substr(0, search.value.length) + "</strong>" + text.substr(search.value.length)
    }
}
function reset() {
    store.selected_character = null;
    search.value = ''
}

const filtered = computed(() => {
    let val = search.value
    if (val.length == 0) return Object.values(store.accounts)
    let keywords = ["character"]
    let result = Object.values(store.accounts).filter((item, index) => {
        let ret = false
        keywords.forEach((k) => {
            if (item[k]) {
                ret = item[k].substr(0, val.length).toUpperCase() == val.toUpperCase()
            }
        })
        // console.log("ret", ret)
        return ret
    })
    // console.log("result", result)
    return result
})


function select(item) {
    store.selected_character = item
    search.value = item["character"]
    document.getElementById("autocomplete-wrapper").blur()
    inputFocus.value = false
}

onMounted(() => {
    document.addEventListener('click', function (event) {
        var isClickInside = document.getElementById("autocomplete-wrapper").contains(event.target)
        if (!isClickInside) {
            inputFocus.value = false
            //the click was outside the specifiedElement, do something
            if (typeof Object.values(store.accounts).find((account) => {
                let search_param = (!!search.value ? search.value : "").toUpperCase()
                let account_param = (!!account["character"] ? account["character"] : "").toUpperCase()
                return account_param == search_param
            }) === "undefined") {
                console.log("NOT VALID")
                if (store.selected_character !== null) { search.value = store.selected_character["character"] }
                else { search.value = "" }

            }
        }
    })
})
</script>
