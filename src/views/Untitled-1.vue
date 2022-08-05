 <div class="d-flex flex-column mt-4" style="flex:1;  overflow-y:auto">
                <template v-if="tab == 'routine'">

                    <template v-if="node.state && logged_account">
                       
                        <div class="d-flex p-4  border-bottom  ">
                            <div class="rounded-circle border  bg-light d-flex justify-content-center align-items-center ms-4 me-2"
                                style="width:80px;height:80px;" alt="Avatar">
                            </div>
                            <div class="d-flex align-items-center flex-shrink-0  ms-4 link-dark text-decoration-none ">
                                <div style="text-align:left">
                                    <h3 style=" line-height:1; font-weight: 400">

                                        {{ logged_account.character }}
                                    </h3>
                                    <span class="badge bg-primary "
                                        style=" background-color:dodgerblue; font-size: 12px;">S{{
                                                logged_account.server_number
                                        }}</span>

                                </div>
                            </div>
                            <div class="ms-auto my-auto">
                                <button class="btn  rounded mx-2 px-4 rounded-pill"
                                    @click="changing_character_state = true">
                                    <i class="fa-light fa-arrows-repeat me-1" style="font-size:18px"></i>


                                </button>
                                <button class="btn   rounded mx-2 px-4 rounded-pill" style="color:#dc3545"
                                    @click="changing_character_state = true">
                                    <i class="fa-light fa-power-off" style="font-size:18px; "></i>
                                </button>

                            </div>
                        </div>
                        <div class="p-5">
                            
                        </div>
                    </template>
                    <template v-else>
                        <!-- <div class="m-auto text-center" style="max-width:360px">
                            <img src="../assets/blockchain.svg" style="width:90px; filter: opacity(0.6)" />
                            <div class="mt-4">
                                Node not Active
                            </div>
                        </div> -->
                    </template>
                </template>
                <div v-if="tab == 'bucket'" id="json-editor" class="d-flex flex-column" style="flex:1">
                    <JsonEditorVue v-model="$store.bucket" />


                </div>
                <template v-if="tab == 'log'"></template>
            </div>
