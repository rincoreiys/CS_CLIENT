<template>
    <div class="d-flex" style="flex:1">
        <div class="d-flex flex-column" style="flex:1">
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
                    <div class="fs-5 fw-semibold ms-2 me-auto">Products</div>
                </template>
                <button class="btn  rounded ms-3 my-auto " @click="search_mode = !search_mode"
                    style="height:42px; font-weight:bold; font-size:20px">
                    <i :class="search_mode ? 'fa-light fa-xmark' : 'fa-light fa-magnifying-glass'"></i>
                </button>
                <button class="btn rounded ms-3 my-auto rounded-pill border px-3 d-flex"
                    @click="search_mode = !search_mode" style="height:50px; width:120px; font-weight:bold;">
                    <i class="fa-solid my-auto fa-plus-large me-4 text-primary"></i>
                    <span>New</span>
                </button>

            </div>
             <table class=" d-flex flex-column" style="flex:1; overflow-y:auto">
                <thead style="" class="border-bottom py-3"> 
                    <tr style="font-size: 16px; font-weight:600 ">
                        <td style="width:60px"></td>
                        <td style="width:180px"  class=" px-3">Icon </td>
                        <td style=" width:240px " class=" px-3">
                            Product Name
                        </td>
                         <td class="text-start" style="width:120px " >
                            Price
                         </td>
                        <td class="px-4" style="width:150px ">
                            Stock
                        </td>
                        <td>
                            Category
                        </td>
                    </tr>
                </thead>
                <tbody style="flex:1; overflow:auto">
                    <tr style="border-bottom: 1px solid rgba(0,0,0,0.05  ) ;" class="d-block" @click="$router.push(`/shop/${element._id}`)"  v-for="(product, i) in categorized" :key="i">
                        <td class="handle px-4" style="width:60px">
                            <!-- <i class="fa-solid fa-grip-dots-vertical" ></i> -->
                        </td>
                         <td style="width:180px">
                            <div class="bg-light  m-3 rounded-3 shadow-sm"  style="width:120px; height:120px; padding:20px">
                                 <img :src="product.icon" style="width:80px; height:80px">
                            </div>
                           
                         </td>
                        
                        <td class="py-3 px-3" style="font:16px Arial; font-weight:500;width:240px ">
                            <h6 style="font-weight:600">{{ product.name }}</h6>
                            <small>{{product.code}}</small>
                        </td>
                        <td  class="text-start" style="width:120px " >
                            Rp.{{product.price}}
                            <!-- <i :class="element.config.loot_focus  == 'equip'?  'fa-solid fa-helmet-battle' :'fa-solid fa-boxes-stacked'"></i> -->
                        </td>
                        <td class="p-4 " style="width:150px ">
                            {{product.stock}}
                            <!-- <button type="button" class="btn  shadow btn-sm rounded-pill px-3 m-1 "
                                v-for="(routine, i) in element.routines " :key="i"
                                :class="routine.routine_type == 'Dungeon' ? 'bg-dark text-white' : 'bg-light'"
                                >
                                <div>{{ routine.class_name }} </div>
                                <span class="badge badge-light"></span>
                            </button> -->
                        </td>
                        
                        <td style="text-transform: capitalize;">
                            {{product.category}}
                            <!-- <template v-for="(n,i) in element.needs" :key="i" >
                                <div  class=" rounded-pill me-2 " style="height:35px; width:35px; background-color:rgb(255,235,100); display:inline-grid; vertical-align: middle;" v-if="n == 'Gold'" > 
                                    <i class="fa-solid fa-circle-dollar  m-auto " style=" font-size:25px; color:rgb(225,155,0); " ></i>
                                </div>
                                <div  class="rounded-pill me-2 " style="height:35px; width:35px; color:rgb(225,185,0); background-color:rgb(240,240,240);     vertical-align: middle; display:inline-grid" v-if="n == 'DK'">
                                        <i class="fa-solid fa-key-skeleton  m-auto " style="color:#333; font-size:18px" ></i>
                                </div>
                                
                            </template> -->
                        </td>
                    </tr>
                </tbody>
                <!-- <tfoot class="py-2 border-top text-muted">
                    <tr style="font-size: 16px;  ">
                        <td style="width:60px"></td>
                        <td style=" width:240px " class=" px-3">
                            {{populated_routine_character.length}} Character
                        </td>
                    </tr>
                </tfoot> -->


            </table>
            <!-- <div class="container">
                <div class="row mx-auto">
                    <div v-for="(product, i) in $store.products" :key="i"
                        class="col-6 col-md-auto m-2 border  rounded-3" style="width:200px; height:200px">
                        {{ product.name }}
                    </div>
                </div>
            </div> -->
        </div>

        <div class="d-flex flex-column  border-start p-4" style="width: 240px;">
             <div class="fs-5 fw-semibold mb-4 me-auto">Category</div>
             <div class="mt-4" id="category-choice">
                 <div class="mb-2  py-1 pointer" style="font-size:18px; opacity:0.4; " :class="active_category.index == 0 ? 'active-category' : ''" @click="active_category = {index: 0 , name: ''}">All</div>
                <div v-for="([name, items], i) in Object.entries(categories)" class="mb-2 py-1 pointer" style="text-transform:capitalize; font-size:18px; opacity:0.4; "  @click="active_category = {index: i+1 , name}"  :class="active_category.index == i+1? 'active-category' : ''">
                    {{ name }} <span :class="active_category.index == i+1 ? 'bg-secondary text-white' : ''" class="px-3 py-1 rounded-pill ms-2" style="font-size:14px">{{ items.items.length }} </span>
                </div>
             </div>
        </div>
    </div>



</template>
<style>
#category-choice .active-category{
    opacity: 1 !important;
    font-weight: 600;
}
</style>
<script setup>
import { computed, ref, reactive } from 'vue'
import collect from 'collect.js'
const active_category = ref({
    index: 0,
    name: '',
})
const categories = computed(() => {
    return collect(store.products).groupBy('category').all();
})

const categorized = computed(() => {
    return store.products.filter((p) => { 
        if (active_category.value.index == 0) return true
        else return p.category == active_category.value.name
    })
})

</script>