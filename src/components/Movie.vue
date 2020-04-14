<template>
  <div>
    <section class="searchbox-wrap">
      <input
        type="text"
        placeholder="Search for a movie..."
        class="searchbox"
        v-model="searchTerm"
        @keypress.enter="getMovieList"
      />
      <input
        type="submit"
        placeholder="Submit"
        class="submit"
        @click="getMovieList"
      />
      <button
        v-if="movieList !== null && movieList.length > 0"
        class="clear"
        @click="clearMovieList"
      >
        Clear
      </button>
    </section>
    <div v-if="movieList == null" class="error">
      <p>Please enter a movie name</p>
    </div>
    <div v-else-if="error == 'Too many results.'" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="error == 'Movie not found!'" class="error">
      <p>{{ error }}</p>
    </div>
    <section v-else class="results">
      <div
        v-for="movie in movieList"
        :key="movie.imdbID"
        class="result"
        @click="getMovieDetails(movie.Title)"
      >
        <div v-if="movie.Poster == 'N/A'">
          <img src="@/assets/images/no-image.jpg" />
          <h3>{{ movie.Title }}</h3>
        </div>
        <div v-else>
          <img :src="movie.Poster" />
          <h3>{{ movie.Title }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    searchTerm: '',
    loading: false
  }),
  methods: {
    getMovieList: function() {
      this.$store.dispatch('fetchMovies', this.searchTerm);
    },
    getMovieDetails: function(title) {
      this.$store.dispatch('fetchMovieDetails', title);
    },
    clearMovieList: function() {
      this.searchTerm = '';
      this.$store.dispatch('emptyList');
    }
  },
  computed: {
    movieList: function() {
      return this.$store.getters.movieList;
    },
    error: function() {
      return this.$store.getters.error;
    }
  }
};
</script>

<style></style>
