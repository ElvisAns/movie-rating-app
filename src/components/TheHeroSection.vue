<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <section class="hero bg-primary text-white justify-content-center d-flex">
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row align-items-center g-5 py-5 h-100">
        <div class="col-lg-6 shake">
          <h1 class="display-5 fw-bold lh-1 mb-3">Welcome to our movie rating website,</h1>
          <p class="lead">
            the ultimate destination for movie lovers! Discover new releases, explore your favorite
            genres, and rate your favorite movies. With a vast collection of titles, you're sure to
            find something that suits your taste.
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <RouterLink
              type="button"
              class="btn btn-dark btn-lg px-4 me-md-2"
              to="/all-movies-sample"
            >
              Start exploring
            </RouterLink>
            <RouterLink type="button" class="btn btn-dark btn-lg px-4 me-md-2" to="/saved-list">
              View my saved lists
            </RouterLink>
          </div>
        </div>
        <div class="col-10 col-sm-8 col-lg-6 mx-auto" style="perspective: 108px">
          <img
            src="https://lumiere-a.akamaihd.net/v1/images/p_aladdin2019_17638_d53b09e6.jpeg"
            class="d-block mx-auto img-fluid hero__image"
            alt="movie caption"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>
