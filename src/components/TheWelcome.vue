<script setup>
import { onBeforeMount, ref } from 'vue'
import { movieList } from '../requests'

const movies = ref([])
let error_message = ref('')

onBeforeMount(async () => {
  try {
    movies.value = await movieList(1)
  } catch (error) {
    error_message.value = 'error fetching data'
    console.log(error)
  }
})
</script>
<template>
  <div>
    {{ movies }}
    {{ error_message }}
  </div>
</template>
