<template>
    <a href="#" class="list-group-item list-group-item-action  py-3 lh-tight" :class="{active}" aria-current="true">
        <!-- {{data}}
        {{active}} -->
        <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{data.character}}</strong>
            <small>On</small>
        </div>
        <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
    </a>
</template>

<script setup>
defineProps({
    data: Object,
    active: Boolean
})

</script>