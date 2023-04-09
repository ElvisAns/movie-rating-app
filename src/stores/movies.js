import { defineStore } from 'pinia'


const local_movies_list = () => {
    const saved_movies = JSON.parse(localStorage.getItem('movies')) ?? []
    return Object.values(saved_movies)
}

const get_initial_state = ()=>{
    return {
        movies : local_movies_list()
    }
}
  

export const useMoviesStore = defineStore({
  id: 'moviesStore',
  state: get_initial_state,
  mutations: {
    addRating(state, imdb, id, rating) {
      state.movies[id]['user_rating'] = rating
      const saved_movies = JSON.parse(localStorage.getItem('movies'))
      saved_movies[imdb]['user_rating'] = rating
      localStorage.setItem('movies', JSON.stringify(saved_movies))
    }
  },
  actions: {
    udapteMovieList(list,returnfulldb=false) {
      const to_save = JSON.parse(localStorage.getItem('movies')) ?? {}
      for (let i = 0; i < list.length; i++) {
        to_save[list[i]['imdbID']] = list[i]
      }
      localStorage.setItem('movies', JSON.stringify(to_save))

      if(returnfulldb){
        this.movies = local_movies_list()
        return;
      }
      this.movies = list
    }
  }
})
