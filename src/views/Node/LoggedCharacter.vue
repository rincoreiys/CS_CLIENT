<template>


</template>
<script setup>
const logged_account = computed(() => val(store.nodes[store.selected_node].character))
async function delegate_routine() {
    await socket.emit("delegate_routine", store.selected_node , logged_account.routine)
}
</script>