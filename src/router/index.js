import Vue       from 'vue';
import VueRouter from 'vue-router';
import MovieList from '../component/MovieList.vue';
import Search    from '../views/Search.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      name: 'Main',
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