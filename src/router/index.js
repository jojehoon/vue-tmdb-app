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
  },
  {
    path: '/search/:keyword',
    name: 'Search',
    components: {
      default: SearchList
    },
  },
];

const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}

    if (to.hash) {
      position.selector = to.hash

      if (to.hash === '#anchor2') {
        position.offset = { y: 100 }
      }

      if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
        return position
      }

      return false
    }

    return new Promise(resolve => {
      if (to.matched.some(m => m.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
      }

      this.app.$root.$once('triggerScroll', () => {
        resolve(position)
      })
    })
  }
}

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior,
});

export default router;