<script setup>
import { useRoute,RouterLink } from 'vue-router'

const route = useRoute()
const id = route.params.imdbID

</script>
<template>
    <div>Single movie view, <RouterLink to="/">Go home</RouterLink> card, will show up with the movie data by querying the api with the ImdbID {{ id }} then will display 5most rated movies down the list</div>
</template>