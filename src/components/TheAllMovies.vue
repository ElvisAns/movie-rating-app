<script setup>
import { onBeforeMount, ref } from 'vue'
import { movieList } from '../requests'
import TheLoadingIcon from './TheLoadingIcon.vue'
import TheMovieCard from './TheMovieCard.vue'

const movies = ref([])
let error_message = ref('')
let loading = ref(false)

onBeforeMount(async () => {
  loading.value = true
  try {
    movies.value = await movieList(1)
    setTimeout(() => (loading.value = false), 2000)
  } catch (error) {
    error_message.value = 'error fetching data'
    console.log(error)
    loading.value = false
  }
})
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col cards-container">
        <TheLoadingIcon v-show="loading" />
        <div
          v-show="!loading"
          class="mt-5 row row-cols-1 row-cols-md-2 row-cols-lg-3 cols-xl-4 g-5"
        >
          <div v-for="(movie, index) in movies" :key="index" class="col movie-single-card mx-auto">
            <TheMovieCard
              :title="movie.Title"
              :year="movie.Year"
              :imdbId="movie.imdbID"
              :poster="movie.Poster"
              :type="movie.Type"
            />
          </div>
          {{ error_message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  max-width: 100vw;
  word-wrap: break-word;
  overflow-x: hidden;
}
@media screen and (max-width: 770px) {
  .movie-single-card {
    display: flex;
    justify-content: center;
  }
}
</style>
