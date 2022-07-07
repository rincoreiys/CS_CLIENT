<template>
  <div style="display: flex;
                justify-content: center;
                flex: 1;
                align-items: center;">
                    <div class="text-center" style="max-width:360px">
                        <img src="../../assets/offline-internet.svg" style="width:90px; filter: grayscale(90%);" />
                        <div class="mt-4">
                            Browser is turned off
                        </div>
                        <div class="mt-4">
                            <button type="button" @click="open" class="btn btn-primary">Turn On</button>
                        </div>
                    </div>
                </div>

</template>
<script setup>
function open() {
    //console.log(this.$store.nodes, this.selected_node)
    socket.emit("open_browser", store.selected_node)
}


</script>