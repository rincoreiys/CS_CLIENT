<template>
  <div class="d-flex flex-column flex-shrink-0" style="width: 80px; border-right:1px solid rgba(0,0,0,0.05)"
    id="main-menu">

    <a href="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip"
      data-bs-placement="right" data-bs-original-title="Icon-only">
      <img src="../assets/icon.png" style="width:30px" />
      <span class="visually-hidden">Icon-only</span>
    </a>
    <ul class="nav  flex-column mt-4 mb-auto text-center">
      <li class="nav-item" v-for="menu in $store.menus" style="
            width: 50px;
            height: 50px;
            margin: 15px;
            margin-top: 10px;
            padding: 10px;
        ">
        <router-link :to="menu.path" class="nav-link p-0 " active-class="active">
          <i :class="menu.icon" style="font-size:19px"></i>

        </router-link>
      </li>

    </ul>
    <ul class="nav  flex-column  text-center ">
      <li class="nav-item rounded-3 " style="
            width: 50px;
            height: 50px;
            margin: 15px;
            margin-top: 10px;
            padding: 10px;
        ">
        <a class="nav-link p-0   " active-class="active">
          <i class="fa-light fa-sun-bright" style="font-size:19px; font-weight:500; vertical-align:sub"></i>

        </a>
      </li>
    </ul>
    <div class="rounded-circle  d-flex justify-content-center align-items-center mx-auto blue-outline "
      style="width:50px;height:50px; margin-top:20px;  margin-bottom:20px; font-weight:bold; font-size:18px" alt="Avatar">
     A
    </div>

  </div>
</template>

<style>
#main-menu .nav /deep/ .nav-link {
  color: inherit
}

#main-menu .nav /deep/ .nav-link.active {
  color: #0d6efd
}
</style>