import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import {registerSocket} from './router/socket'
import router from './router'
import { useStore } from './stores/default'
// import jquery from 'jquery'
declare global {
    interface Window {
      store: any;  // this will be your variable name
      socket: any;  // this will be your variable name
      $: any,
      val: any,
      get: any,
      post: any,
      patch:any,
      clone:any

    }
  }


const app = createApp(App)
app.use(createPinia())
app.use(router)
const store = useStore()
const socket = registerSocket(store)

app.config.globalProperties.$store = store
app.config.globalProperties.$socket = socket

// app.config.globalProperties.$ = jquery


window.store =  store
// window.$ =  jquery
window.socket =socket
window.clone = (e:any) => JSON.parse(JSON.stringify(e))
// app.provide('$socket', app.config.globalProperties.$socket )
// app.provide('$store', app.config.globalProperties.$store  )
app.mount('#app')
