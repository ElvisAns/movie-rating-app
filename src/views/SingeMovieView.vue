<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { singleMovie } from '../requests/'
import { useRoute, RouterLink } from 'vue-router'
import TheLoadingIcon from '../components/TheLoadingIcon.vue'
const route = useRoute()
const id = route.params.imdbID
const thisMovie = ref({})
const loading = ref(false)
const error = ref(false)
const message = ref('')

onBeforeMount(async () => {
  loading.value = true
  try {
    const res = await singleMovie(id)
    thisMovie.value = res
  } catch (e) {
    error.value = true
    message.value = e.message
  }
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

const getBackground = computed(() => {
  return thisMovie.value.Poster === 'N/A'
    ? 'https://png.pngtree.com/element_our/png/20181227/movie-icon-which-is-designed-for-all-application-purpose-new-png_287896.jpg'
    : thisMovie.value.Poster
})
</script>
<template>
  <div class="single__movie bg-dark text-white">
    <TheLoadingIcon v-show="loading" />
    <div class="mt-4 mb-2" v-show="error">
      <div class="alert alert-danger d-flex align-items-start" role="alert">
        <i class="bi bi-exclamation-diamond"></i>&nbsp;<span>{{ message }}</span>
      </div>
    </div>
    <div v-if="!loading & !error" class="single__card">
      <div
        class="movie__background"
        :style="{ 'background-image': 'url(' + getBackground + ')' }"
      ></div>
      <div class="row px-3 movie__data">
        <div class="col-md-4 d-none d-md-block mx-auto">
          <div 
          style="
            display: flex;
            flex-direction: column;
            align-content: space-around;
            justify-content: space-evenly;
          "><img :src="getBackground" style="width: 100%;border-radius: 15px;" /></div>
        </div>
        <div
          class="col-md-8"
          style="
            display: flex;
            flex-direction: column;
            align-content: space-around;
            justify-content: space-evenly;
          "
        >
          <div><strong>Title :</strong> {{ thisMovie.Title }}</div>
          <div><strong>Country : </strong>{{ thisMovie.Country }}</div>
          <div><strong>Director : </strong>{{ thisMovie.Director }}</div>
          <div><strong>Genre : </strong>{{ thisMovie.Genre }}</div>
          <div><strong>Language : </strong>{{ thisMovie.Language }}</div>
          <p><strong>Plot : </strong>{{ thisMovie.Plot }}</p>
          <div><strong>Released : </strong>{{ thisMovie.Released }}</div>
          <div><strong>imdbRating : </strong>{{ thisMovie.imdbRating }}</div>
          <div><strong>Type : </strong> {{ thisMovie.Type }}</div>
          <div><strong>Writer : </strong>{{ thisMovie.Writer }}</div>
          <div><strong>Actors :</strong> {{ thisMovie.Actors }}</div>
        </div>
      </div>
      <RouterLink to="/">Go home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
strong{
  color: #dcd427;
}
.single__movie {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
.single__card {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
  width: 75vw;
}

.movie__background {
  width: 100%;
  background-color: rgba(255, 255, 255);
  position: sticky;
  height: 50vh;
  object-fit: contain;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50px 50px 0px 0px;
}
.movie__data{
  position: relative;
  background-color: #212228;
  top : -40px;
  border-radius: 30px;
  padding : 30px 0px;
  width: 70vw;
  margin: auto;
}

@media screen and (width < 600px) {
  .single__card {
    width: 90vw;
  }
  .movie__background {
    height: 40vh;
  }
}
</style>
