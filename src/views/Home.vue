<template>
  <div>
    <header>
      <h1>Movie Database</h1>
    </header>
    <main>
      <Movie />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Movie from "@/components/Movie.vue";

export default {
  name: "Home",
  components: {
    Movie
  }
};
</script>
