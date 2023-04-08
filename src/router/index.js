import { createRouter, createWebHashHistory } from 'vue-router'
import MovieSampleView from '../views/MovieSampleView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/all-movies-sample',
      name: 'moviesample',
      component: MovieSampleView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ el: '#main', behavior: 'smooth' })
      }, 1000)
    })
  }
})

export default router
