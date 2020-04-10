import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movieList: [],
    movieDetails: null
  },
  getters: {
    movieList: state => state.movieList,
    movieDetails: state => state.movieDetails
  },
  mutations: {
    fetchMovies: (state, payload) => {
      state.movieList = payload.Search
    },
    fetchMovieDetails: (state, payload) => {
      state.movieDetails = payload
    },
    closeMovie: state => {
      state.movieDetails = null
    }
  },
  actions: {
    fetchMovies({ commit }, payload) {
      axios.get(`http://www.omdbapi.com/?s=${payload}&apikey=thewdb`).then(res => {
        commit('fetchMovies', res.data);
      });
    },
    fetchMovieDetails({commit}, payload) {
      axios.get(`http://www.omdbapi.com/?t=${payload}&apikey=thewdb`).then(res => {
        commit('fetchMovieDetails', res.data);
      });
    },
    closeMovie({commit}) {
      commit('closeMovie');
    }
  },
  modules: {
  }
})
