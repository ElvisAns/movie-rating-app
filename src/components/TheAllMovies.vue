<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { movieList, searchMovie } from '../requests'
import TheLoadingIcon from './TheLoadingIcon.vue'
import TheMovieCard from './TheMovieCard.vue'
import _ from 'lodash'

const movies = ref([])
let error_message = ref('')
let loading = ref(false)
let search_title = ref('')
let search_year = ref('')
let sort_logic = ref([true, true]) //title , year , true => asc and false => desc

onBeforeMount(async () => {
  loading.value = true
  try {
    movies.value = await movieList(1)
    setTimeout(() => (loading.value = false), 2000)
    error_message.value
  } catch (error) {
    error_message.value = 'error fetching data'
    console.log(error)
    loading.value = false
  }
})

const submitSearch = async function () {
  if (loading.value == true) return //dont fetch data when still loading
  loading.value = true
  try {
    movies.value = await searchMovie(1, search_title.value, search_year.value)
    setTimeout(() => (loading.value = false), 1000)
    error_message.value = ''
  } catch (error) {
    console.log('error!', error)
    error_message.value = error.message
    loading.value = false
  }
}

const resort_logic = (key, value) => {
  sort_logic.value[key] = value
  movies.value = _.orderBy(
    movies.value,
    ['Title', 'Year'],
    [sort_logic.value[0] ? 'asc' : 'desc', sort_logic.value[1] ? 'asc' : 'desc']
  )
}
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col cards-container">
        <TheLoadingIcon v-show="loading" />
        <div v-show="!loading" class="mt-5 container__search-bar">
          <label for="inputPassword5" class="form-label">Search...</label>
          <div class="input-group">
            <input
              type="search"
              class="form-control"
              aria-describedby="searchBox"
              placeholder="Enter the title here...."
              v-model="search_title"
              :disabled="loading ? true : false"
            />
            <input
              type="search"
              aria-label="Last name"
              placeholder="The release year here"
              class="form-control"
              v-model="search_year"
            />
            <button class="btn btn-outline-primary" type="button" @click="submitSearch">
              <i class="bi bi-search"></i>Search
            </button>
          </div>
          <div id="searchBox" class="form-text">
            This searchbar allow you to search movies by title and/or by release year depending on
            your specific need
          </div>
        </div>
        <div v-show="!loading" class="mt-5 container__search-bar">
          <div>
            Sort by title
            <i
              :class="{ 'text-primary': !sort_logic[0] }"
              @click="() => resort_logic(0, false)"
              class="bi bi-arrow-up-circle-fill"
            ></i>
            <i
              @click="() => resort_logic(0, true)"
              :class="{ 'text-primary': sort_logic[0] }"
              class="bi bi-arrow-down-circle-fill"
            ></i>
          </div>
          <div>
            Sort by release year
            <i
              @click="() => resort_logic(1, false)"
              :class="{ 'text-primary': !sort_logic[1] }"
              class="bi bi-arrow-up-circle-fill"
            ></i>
            <i
              @click="() => resort_logic(1, true)"
              :class="{ 'text-primary': sort_logic[1] }"
              class="bi bi-arrow-down-circle-fill"
            ></i>
          </div>
        </div>
        <div class="mt-4 mb-2" v-show="error_message.length > 0">
          <div class="alert alert-danger d-flex align-items-start" role="alert">
            <i class="bi bi-exclamation-diamond"></i> <span>{{ error_message }}</span>
          </div>
        </div>
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
.container__search-bar {
  width: 40%;
}
@media screen and (max-width: 770px) {
  .movie-single-card {
    display: flex;
    justify-content: center;
  }
  .container__search-bar {
    width: 80%;
  }
}
</style>
