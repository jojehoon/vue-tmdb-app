import Vue       from 'vue';
import VueRouter from 'vue-router';
import Home      from '../views/Home.vue';
// import Search    from '../views/Search.vue';
import MovieList from '../component/MovieList.vue';
import SearchList from '../component/SearchList.vue';
import store from '../store/index';

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
    path: '/movie/:category',
    name: 'Movie',
    components: {
      default: MovieList
    },
    // beforeEnter(to, from, next){
    //   console.log('beforeEnter');
    //   store.dispatch('FETCH_MOVIES_SORT', to.params.sort);
    //   next();
    // }
  },
  {
    path: '/search/:keyword',
    name: 'Search',
    components: {
      default: SearchList
    },
    children: [
      {
        path: '',
        name: 'Search',
        component: SearchList
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;