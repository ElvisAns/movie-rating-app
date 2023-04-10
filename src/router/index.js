import { createRouter, createWebHashHistory } from 'vue-router'
import MovieSampleView from '../views/MovieSampleView.vue'
import SingleMovieView from '../views/SingeMovieView.vue'

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
      component: () => import('../views/AboutView.vue')
    },
    {
      path : '/single-movie/:imdbID',
      name : 'single-movie',
      component : () => SingleMovieView
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
