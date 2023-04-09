import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useMoviesStore = defineStore({
  id: 'moviesStore',
  state: () => ({
    movies: useLocalStorage("movies",[]),
  }),
  mutations: {
    addRating(state, id,rating) {
      state.movies[id]["user_rating"] = rating 
    },
  },
  actions: {
    udapteMovieList(list) {
      this.movies = list;
    },
  },
});
