import { defineStore } from 'pinia'
import useLocalStorageEngine from '../composables/useLocalStorageEngine';

const { update_local_store, get_movies_meta, get_full_movies_list, add_to_local_movies_list } = useLocalStorageEngine('movies', {});

const get_initial_state = () => {
  return {
    movies: get_movies_meta(),
    local_movies_list: get_full_movies_list()
  }
}

export const useMoviesStore = defineStore({
  id: 'moviesStore',
  state: get_initial_state,
  actions: {
    udapteMovieList(list, update_with_fulldb = false) {
      const to_save = add_to_local_movies_list(list)
      update_local_store(to_save)
      this.local_movies_list = to_save //update the local state
      if (update_with_fulldb) {
        this.movies = get_movies_meta()
        return
      }
      this.movies = list
    },
    rateMovie(imdbID, rating, index) {
      this.local_movies_list[imdbID]['user_rating'] = rating
      update_local_store(this.local_movies_list)
      this.movies[index].user_rating = rating
    },
    reviewMovie(imdbID, user_review, index) {
      this.local_movies_list[imdbID]['user_review'] = user_review
      update_local_store(this.local_movies_list)
      this.movies[index].user_review = user_review
    }
  }
})
