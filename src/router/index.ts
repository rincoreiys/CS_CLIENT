import { createRouter, createWebHistory } from 'vue-router'
const view = (viewComponent: string) => () => import(`../views/${viewComponent}View.vue`)
const component = (viewComponent: string) => () => import(`../components/${viewComponent}.vue`)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/node',
    },
    {
      path: "/character",
      name: "character",
      children:[
        {
          path : "", 
          component: view('Character/CharacterList')
         },
        {
          path : ":id", 
          component: view('Character/CharacterDetail')
         }
      ],
      component: view('Character')
    },
    {
      path: "/node/:node_number?",
      name: "node",
      component: view('Node')
    },
    {
      path: "/shop",
      name: "shop",
      component: view('Shop')
    },
    {
      path: "/shop/:product_id",
      name: "Item Detail",
      component: view('Shop/DetailProduct'),
      beforeEnter(to, from) {
        let products = store.products.find((p) => p._id == $route.params.product_id)
        // See if that query exists in your data...
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: component("NotFound"),
    }
  ]
})

export default router
