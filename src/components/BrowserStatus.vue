<template>
     <div class=" px-2 py-1" 
            style="background:rgba(0,0,0,0.03) ; border-bottom:1px solid rgba(0,0,0,0.05);
            display: flex;
            align-items: center;">
                <div style="display: flex;
                align-items: center;" class="me-auto">
                    <span class="dot me-2" style="background-color: #479f76"></span>
                    Listener On {{ $store.browser_session }}
                </div>
                <div>
                    <template v-if="macro.state">

                        <i class="fa fa-stop" style="color:red"></i>
                    </template>

                    <img src="../assets/tech.svg" style="width:19px; filter: grayscale(90%);" />
                    Off

                </div>
            </div>
</template>

