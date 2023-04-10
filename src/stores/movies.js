import { defineStore } from 'pinia'

const local_movies_list = () => {
  const saved_movies = JSON.parse(localStorage.getItem('movies')) ?? {}
  return Object.values(saved_movies)
}

const get_initial_state = () => {
  return {
    movies: local_movies_list(),
    local_movies_list: JSON.parse(localStorage.getItem('movies')) ?? {}
  }
}

export const useMoviesStore = defineStore({
  id: 'moviesStore',
  state: get_initial_state,
  actions: {
    udapteMovieList(list, update_with_fulldb = false) {
      const to_save = JSON.parse(localStorage.getItem('movies')) ?? {}
      for (let i = 0; i < list.length; i++) {
        const existing = list[i]
        if(to_save[list[i]['imdbID']]){
          if ('user_rating' in to_save[list[i]['imdbID']]) {
          //preserve the user rating
          existing['user_rating'] = to_save[list[i]['imdbID']]['user_rating']
          }
        }
        to_save[list[i]['imdbID']] = existing
      }
      localStorage.setItem('movies', JSON.stringify(to_save))
      this.local_movies_list = to_save //update the local state
      if (update_with_fulldb) {
        this.movies = local_movies_list()
        return
      }
      this.movies = list
    },
    rateMovie(imdbID, rating,index) {
      this.local_movies_list[imdbID]['user_rating'] = rating
      localStorage.setItem('movies', JSON.stringify(this.local_movies_list))
      this.movies[index].user_rating = rating
    }
  }
})
