import Vue       from 'vue';
import VueRouter from 'vue-router';
import Home      from '../views/Home.vue';
import Search    from '../views/Search.vue';
import MovieList from '../component/MovieList.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      name: 'Main',
      components: {
        default: Home
      }
    },
    {
      path: '/movie/:sort',
      name: 'Movie',
      components: {
        default: MovieList
      }
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      components: {
        default: Search
      }
    }
  ]
});


export default router;