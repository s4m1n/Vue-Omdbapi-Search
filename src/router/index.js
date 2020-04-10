import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MovieDetails from '../components/MovieDetails';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details',
    name: 'MovieDetails',
    component: MovieDetails
  }
];

const router = new VueRouter({
  routes
});

export default router;
