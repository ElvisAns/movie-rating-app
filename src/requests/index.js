import axios from 'axios'
import _ from 'lodash'

const api_key = import.meta.env.VITE_API_KEY

const movieList = async function (page = 1) {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${api_key}&type=movie&y=2023&s=movie&page=${page}&plot=full`
    )
    const { data } = response
    const { Search } = data
    return _.shuffle(Search)
  } catch (error) {
    throw new Error(error)
  }
}

const searchMovie = async function (page = 1, title = 'a', year = '') {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${api_key}&type=movie&s=${
        title.length == 0 ? 'a' : title
      }&page=${page}&y=${year}&plot=full`
    )
    const { data } = response
    if (data.Response == 'False') {
      throw new Error(data.Error)
    }
    const { Search } = data
    return Search
  } catch (error) {
    throw new Error(error)
  }
}

export { movieList, searchMovie }
