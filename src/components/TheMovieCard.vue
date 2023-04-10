<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  imdbId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="card mb-3" style="max-width: 340px">
    <div class="row g-0 cc" style="min-height: 200px">
      <div class="col-md-4">
        <div class="img-container">
          <img
            :src="
              poster === 'N/A'
                ? 'https://resourcecentre.savethechildren.net/static/video_placeholder-74d554a5f2855a914ee3879bd04c55c3.png'
                : poster
            "
            class="img-fluid rounded-start"
            style="object-fit: cover; height: 100%; width: 100%"
            alt="..."
          />
        </div>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h6 class="card-title">{{ title }}</h6>
          <p class="card-text pt-3">
            <i class="bi bi-info-circle-fill"></i> IMDBID : <strong>{{ imdbId }}</strong>
          </p>
          <RouterLink :to="`/single-movie/${imdbId}`" class="single-movie__view-button"
            ><i class="bi bi-box-arrow-up-right"></i
          ></RouterLink>
          <slot></slot>
          <p class="card-text end">
            <small><i class="bi bi-calendar"></i> {{ year }}</small>
            <small><i class="bi bi-tag"></i>{{ type }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #a81188;
  position: relative;
  background-color: bisque;
  min-width: 300px;
}

@-webkit-keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }
  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
/*
.card:hover {
  -webkit-animation-name: pulse;
  animation-name: pulse;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.4s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
*/
.card-text small {
  background-color: #a81188;
  padding: 5px 10px;
  color: aqua !important;
  border-radius: 10px;
  margin-right: 2px;
  font-weight: bolder;
}
.end {
  position: absolute;
  bottom: 20px;
}
.img-container {
  height: 100%;
  width: 100%;
}
@media screen and (max-width: 780px) {
  .end {
    position: static !important;
    margin-top: 30px;
  }
}
.single-movie__view-button {
  position: absolute;
  top: -40px;
  right: -10px;
  font-size: 30px;
  background-color: black;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 100%;
  color: #a81188;
}
</style>
