import { createRouter, createWebHistory } from 'vue-router'
const view = (viewComponent: string) => () => import(`../views/${viewComponent}View.vue`)

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
    }
  ]
})

export default router
