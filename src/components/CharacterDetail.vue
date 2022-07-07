<template>
<div class="fs-5 fw-semibold  p-3 link-dark text-decoration-none border-bottom">Character Detail</div>
<div class="list-group list-group-flush">
    <div class="list-group-item list-group-item-action d-flex  py-3" aria-current="true">
        <img src="https://github.com/twbs.png" alt="twbs" width="48" height="48" class="rounded-circle ms-2 flex-shrink-0">
        <div class="d-flex  w-100 justify-content-between">
            <div>
                <h6 class="mb-0">List group item heading</h6>
                <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
            </div>
            <small class="opacity-50 text-nowrap">now</small>
        </div>
    </div>
</div>
<nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
        <div class="h6">Routine</div>
        <form class="d-flex">

            <button class="btn btn-light" type="submit">Add</button>
        </form>
    </div>
</nav>
<div class="container w-100">

    <div class="h6">
        {{characters[selected_character].character}}
    </div>

    <a href="#" class="btn btn-primary " role="button">Primary link</a>

</div>

{{characters[selected_character]}}
<ul class="list-group list-group-flush">
    <li class="list-group-item">An item</li>
    <li class="list-group-item">A second item</li>
    <li class="list-group-item">A third item</li>
    <li class="list-group-item">A fourth item</li>
    <li class="list-group-item">And a fifth one</li>
</ul>
</template>

<script setup>


</script>
