import Vue       from 'vue';
import VueRouter from 'vue-router';
import Home      from '../views/Home.vue';
import Search    from '../views/Search.vue';
import MovieList from '../component/MovieList.vue';

Vue.use(VueRouter);

const routes = [
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
    },
    beforeEnter(to, from, next){
      console.log('beforeRouteEnter')
      next();
    },
  },
  {
    path: '/search/:keyword',
    name: 'Search',
    components: {
      default: MovieList
    },
    children: [
      {
        path: '',
        component: MovieList
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;