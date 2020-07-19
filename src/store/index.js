import Vue        from 'vue';
import Vuex, { Store }       from 'vuex';
import Axios      from 'axios';
import router     from '../router';
import { apiKey } from '../auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey     : apiKey,
    category   : '',
    categories : {
                  now       : 'now_playing',
                  popular   : 'popular',
                  top       : 'top_rated',
                  upcoming  : 'upcoming',
                  },
    language   : 'en',
    loader     : false,
    keyword    : '',
    modal      : false,
    movie      : {},
    movies     : [],
    page       : 1,
    search     : [],
    url        : {
                  base  : 'https://api.themoviedb.org/3/movie/',
                  search: 'https://api.themoviedb.org/3/search/movie',
                  poster: 'https://image.tmdb.org/t/p/original',
                  },
  },

  getters: {
    GET_KEYWORD : (state) => state.keyword,
    GET_MOVIES  : (state) => state.movies,
    GET_MOVIE   : (state) => state.movie,
    GET_MODAL   : (state) => state.modal,
    GET_SEARCH  : (state) => state.search,
  },

  mutations: {
    SET_CATEGORY      : (state, value) => state.category = value,
    SET_LOADER_TOGGLE : (state)        => state.loading = state.loading ? false : true,
    SET_KEYWORD       : (state, value) => state.keyword = value,
    SET_MODAL         : (state)        => state.modal = state.modal ? false : true,
    SET_MOVIE         : (state, value) => state.movie = value,
    SET_MOVIES        : (state, value) => state.movies = value,
    SET_MORE          : (state, {addedMovies, name}) => state[name].push(...addedMovies),
    SET_PAGE_ADD      : (state)        => state.page += 1,
    SET_RESET_PAGE    : (state)        => state.page = 1,
    SET_RESET_STATE   : (state)        => {
                                            switch (router.history.current.name) {
                                              case 'Movie':
                                                state.movies   = [];
                                                state.category = '';
                                                state.page     = 1;
                                                break;
                                              case 'Search':
                                                state.search  = [];
                                                state.keyword = '';
                                                state.page     = 1;
                                                break;
                                            }
                                          },
    SET_SEARCH        : (state, value) => state.search = value,
  },
  
  actions: {
    FETCH_API_MOVIE({state}, id){
      return Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${state.apiKey}&language=en-US`)
    },

    FETCH_API_MOVIES({state}, category){
      return Axios.get(`${state.url.base}${state.category}?api_key=${state.apiKey}&language=${state.language}&page=${state.page}`);
    },

    FETCH_API_SEARCH({state}){
      return Axios.get(`${state.url.search}?api_key=${state.apiKey}&language=${state.language}&page=${state.page}&include_adult=false&query=${state.keyword}`)
    },

    FETCH_MOVIE({commit, dispatch}, {id}){
      return dispatch('FETCH_API_MOVIE', id)
      .then(res => commit('SET_MOVIE', res.data))
      .then(()  => commit('SET_MODAL'))
    },
    
    FETCH_MOVIES({commit, dispatch}){
      return dispatch('FETCH_API_MOVIES')
      .then(res => commit('SET_MOVIES', res.data.results));
    },
    
    // FIXME 간헐적으로 중복 영화가 api에 포함됨, api 호출 방법이 잘 못된 건지 확인해 볼 것(중복 아이디 때문에 콘솔에 워닝이 표시됨)
    FETCH_MORE({commit, dispatch}){
      let api  = null;
      let stateName = null;
      let routeName = router.history.current.name;

      if(routeName === 'Movie'){
        api = 'FETCH_API_MOVIES';
        stateName = 'movies'
      } else if(routeName === 'Search'){
        api = 'FETCH_API_SEARCH';
        stateName = 'search';
      }
      return dispatch(api, commit('SET_PAGE_ADD'))
      .then(res => commit('SET_MORE', {
        addedMovies :res.data.results, 
        name        : stateName
      }))
    },

    FETCH_CATEGORY({commit, dispatch}, category){
      commit('SET_RESET_PAGE');
      return dispatch('FETCH_API_MOVIES', commit('SET_CATEGORY', category))
      .then((res) => commit('SET_MOVIES', res.data.results));
    },

    FETCH_SEARCH({state, commit, dispatch}){
      router.push({
        path: `/search/:${state.keyword}`,
        params: state.keyword
      })
      return dispatch('FETCH_API_SEARCH', commit('SET_KEYWORD', state.keyword))
      .then(res => commit('SET_SEARCH', res.data.results))
      .catch((err) => console.log(err.message))
    }

  },
});