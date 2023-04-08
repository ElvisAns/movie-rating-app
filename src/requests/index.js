import axios from 'axios'
import _ from 'lodash'

const api_key = import.meta.env.VITE_API_KEY

const movieList = async function (page = 1) {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${api_key}&type=movie&y=2023&s=movie&page=${page}`
    )
    const { data } = response
    const { Search } = data
    return _.shuffle(Search)
  } catch (error) {
    throw new Error(error)
  }
}

export { movieList }
