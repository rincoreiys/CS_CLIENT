<template>
    <div>ASAD</div>
</template>
<script>
import { io } from "socket.io-client";
export default {
    data: () => ({

    }),
    mounted(){
        document.title = "Browser "+this.$route.params["profile_number"]
    }
}
</script>