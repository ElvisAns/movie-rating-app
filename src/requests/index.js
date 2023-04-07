import axios from 'axios'
var _ = require('lodash');

const api_key = import.meta.env.VITE_API_KEY

const movieList = async function(page=1){
    const response  = await axios.get(`http://www.omdbapi.com/?apikey=${api_key}&type=movie&y=2023&s=movie&page=${page}`)
    return _.shuffle(response.search);
}

export {
    movieList
}