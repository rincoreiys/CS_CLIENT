<template>
<!-- {{keyword}} -->
    <!-- {{selected}} -->
    <!-- {{search}} -->
    <div class=" input-group shadow-sm rounded mx-auto" style="width:360px" >
         <div class="input-group autocomplete" id="autocomplete-wrapper">
            <div class="d-flex" >
                <slot name="prepend"></slot>
            </div>
          
            <input type="text"    class="form-control border-0"  style="box-shadow: none;"
            placeholder="Type a character"
            @input="onInput" @keydown="onKeyDown" v-model="search" >
              <button type="button" v-if="selected" class="btn btn-sm bg-transparent" style="margin-right: 5px; z-index: 100;" @click="selected = null; search = ''">
                <i class="fa fa-times"></i>
                </button>
            <button type="button" class="btn  dropdown-toggle dropdown-toggle-split"  @focus="inputFocus = true" style="width:38px">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
           
        </div>
        <div id="autocomplete-list" class="autocomplete-items text-start" v-if="inputFocus">
            <div v-for="(item, index) in filtered" :key="index" @click="select(item)" v-html="textFormatter(item[text]) ">   </div>
        </div>    
        
    </div>
        
</template>
<style >
* { box-sizing: border-box; }
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
import { onMounted, computed, ref, watch} from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  items: Array,
  text: String,
  keyword: Array,
  modelValue: Object,
  alternativeText: String
})

const selected = computed({ 
    get: () => props.modelValue, 
    set: (value) => emit('update:modelValue', value) 
}) 

const currentFocus = ref(-1);
const inputFocus = ref(false)

const search = ref("") 

const textFormatter = (text) => {
    let val = search.value
    if(val.length == 0 || typeof val === "undefined")  return text
    else{
        return  "<strong>" + text.substr(0, search.value.length) + "</strong>"  + text.substr( search.value.length)
     }
}


const filtered = computed(() =>{
        let val = search.value
        if(val.length == 0 || typeof val === "undefined") return props.items
        let result =   props.items.filter( (item, index) => {
            let ret = false
            if (typeof item === 'string' || typeof item === 'number' || item instanceof String){
                if (item.substr(0, val.length).toUpperCase() == val.toUpperCase()) ret =  true
            }

            if (typeof item === 'object' || item instanceof Object){
               
                props.keyword.forEach((k) => {
                    if(item[k]){
                       
                        if ( item[k].substr(0, val.length).toUpperCase() == val.toUpperCase() ) {
                            console.log("item[k", item[k])
                            ret = true
                        }
                        
                    }
                })
                console.log("ret", ret)
            }
            return ret
        })

        console.log("result", result)
        return result 
})
 

function onKeyDown(){
    
    // var x = document.getElementById("autocomplete-list");
    // if (x) x = x.getElementsByTagName("div");
    // if (e.keyCode == 40) {
    //     /*If the arrow DOWN key is pressed,
    //     increase the currentFocus variable:*/
        
    //     if (!currentFocus.value)  currentFocus = 0
    //     currentFocus++;
    //     /*and and make the current item more visible:*/
    //     addActive(x);
    // } else if (e.keyCode == 38) { //up
    //     /*If the arrow UP key is pressed,
    //     decrease the currentFocus variable:*/
    //     currentFocus--;
        
    //     /*and and make the current item more visible:*/
    //     addActive(x);
    // } else if (e.keyCode == 13) {
    //     /*If the ENTER key is pressed, prevent the form from being submitted,*/
    //     e.preventDefault();
    //     if (currentFocus > -1) {
    //         /*and simulate a click on the "active" item:*/
    //         if (x) x[currentFocus].click();
    //     }
    // }
    if (filtered.value.length) inputFocus.value =true
}

function select(item){
    selected.value = item
    search.value = item[props.text]
    document.getElementById("autocomplete-wrapper").blur()
    inputFocus.value = false

}

onMounted(() => {
    document.addEventListener('click', function(event) {

        var isClickInside = document.getElementById("autocomplete-wrapper").contains(event.target)

         if (!isClickInside) {
                inputFocus.value = false
                //the click was outside the specifiedElement, do something
                if ( typeof props.items === "undefined") return false
                if ( typeof props.items.find((item) => { 
                    let search_param = (!!search.value ? search.value : "").toUpperCase()
                    let item_param = (!!item[props.text] ?  item[props.text] : "") .toUpperCase()
                    return item_param == search_param
                }) === "undefined"){
                    // alert("NOT VALID")
                    
                    if (selected.value !== null ) {search.value = selected.value[props.text]}
                    else { search.value = ""}
                    
                }

                // if (!props.items.find((item) =>  == search.value.toUpperCase() )) {
                //     alert("ID NOT FOUND")
                //     
                // }
        
        }
    })
})
</script>
