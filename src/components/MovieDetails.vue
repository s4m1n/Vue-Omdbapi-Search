<template>
  <section v-if="movie" class="movie">
    <div class="content">
      <h1>
        {{ movie.Title }}
        <span>({{ movie.Year }})</span>
      </h1>
      <h3>Genre: {{movie.Genre}}</h3>
      <p class="rating">Imdb Rating: {{movie.imdbRating}}</p>
      <div class="plot" v-if="movie.Poster == 'N/A'">
        <img src="@/assets/images/no-image.jpg" />
        <p>Plot: {{movie.Plot}}</p>
      </div>
      <div class="plot" v-else>
        <img :src="movie.Poster" />
        <p>{{movie.Plot}}</p>
      </div>
      <button class="close" @click="close">Close</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close: function() {
      this.$store.dispatch("closeMovie").then(this.$router.push({ path: "/" }));
    }
  },
  computed: {
    movie: function() {
      return this.$store.getters.movieDetails;
    }
  }
};
</script>

<style >
</style>