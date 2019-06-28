import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LandingPage from './views/landingPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/lobby/:id',
      name: 'lobby',
      component: () => import(/* webpackChunkName: "lobby" */ './views/Lobby.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "room" */ './components/Room.vue')
    }
  ]
})
