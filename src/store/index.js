import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList: [],
    movieDetails: null,
    error: ''
  },
  getters: {
    movieList: state => state.movieList,
    movieDetails: state => state.movieDetails,
    error: state => state.error
  },
  mutations: {
    fetchMovies: (state, payload) => {
      if (payload.Response == 'True') {
        state.movieList = payload.Search;
      } else {
        state.error = payload.Error;
        setTimeout(function() {
          state.error = '';
        }, 2000);
      }
    },
    fetchMovieDetails: (state, payload) => {
      state.movieDetails = payload;
    },
    closeMovie: state => {
      state.movieDetails = null;
    }
  },
  actions: {
    fetchMovies({ commit }, payload) {
      axios
        .get(`https://www.omdbapi.com/?s=${payload}&apikey=thewdb`)
        .then(res => {
          commit('fetchMovies', res.data);
        });
    },
    fetchMovieDetails({ commit }, payload) {
      axios
        .get(`https://www.omdbapi.com/?t=${payload}&apikey=thewdb`)
        .then(res => {
          commit('fetchMovieDetails', res.data);
        });
    },
    closeMovie({ commit }) {
      commit('closeMovie');
    }
  },
  modules: {}
});
