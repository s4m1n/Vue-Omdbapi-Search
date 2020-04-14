import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

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
        state.movieDetails = null;
      }
      if (payload.Response == 'False') {
        if (payload.Error == 'Something went wrong.') {
          state.movieList = null;
        }
        state.error = payload.Error;
        setTimeout(function() {
          state.error = '';
          state.movieList = [];
        }, 2000);
      }
    },
    emptyList: state => {
      state.movieList = [];
    },
    fetchMovieDetails: (state, payload) => {
      state.movieDetails = payload;
      router.push({ path: 'details' });
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
    emptyList({ commit }) {
      commit('emptyList');
    },
    fetchMovieDetails({ commit }, payload) {
      axios
        .get(`https://www.omdbapi.com/?t=${payload}&plot=full&apikey=thewdb`)
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
