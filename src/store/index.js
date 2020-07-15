import Vue        from 'vue';
import Vuex       from 'vuex';
import Axios      from 'axios';
import router     from '../router';
import { apiKey } from '../auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey : apiKey,
    urlBase    : 'https://api.themoviedb.org/3/movie/',
    urlSearch  : 'https://api.themoviedb.org/3/search/movie',
    urlPoster  : 'https://image.tmdb.org/t/p/original',
    movies     : [],
    movie      : {},
    page       : 1,
    sort       : this.sort ? this.sort : 'popular',
    language   : 'en',
    loader     : false,
    modal      : false,
    // keyword    : '',
  },

  getters: {
    // GET_KEYWORD      : (state) => state.keyword,
    GET_MOVIES       : (state) => state.movies,
    GET_MOVIE        : (state) => state.movie,
    GET_MODAL        : (state) => state.modal,
  },

  mutations: {
    SET_LOADER_TOGGLE : (state)              => state.loading = state.loading ? false : true,
    // SET_KEYWORD       : (state, keyword)              => state.keyword = keyword,
    SET_MODAL_CLOSE   : (state)              => state.modal = false,
    SET_MODAL_OPEN    : (state)              => state.modal = true,
    SET_MOVIE         : (state, movie)       => state.movie = movie,
    SET_MOVIES        : (state, movies)      => state.movies = movies,
    SET_MOVIES_MORE   : (state, addedMovies) => state.movies.push(...addedMovies),
    SET_MOVIE_SORT    : (state, sort)        => state.sort = sort,
    SET_PAGE_ADD      : (state)              => state.page += 1,
  },
  
  actions: {
    FETCH_MOVIE_INIT({state}, id){
      return Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${state.apiKey}&language=en-US`)
    },

    FETCH_MOVIE({commit, dispatch}, {id}){
      return dispatch('FETCH_MOVIE_INIT', id)
      .then(res => commit('SET_MOVIE', res.data))
      .then(()  => commit('SET_MODAL_OPEN'))
    },

    FETCH_MOVIES_INIT({state}, sort){
      return Axios.get(`${state.urlBase}${sort ? sort : state.sort}?api_key=${state.apiKey}&language=${state.language}&page=${state.page}`);
    },

    FETCH_MOVIES({commit, dispatch}){
      return dispatch('FETCH_MOVIES_INIT')
      .then(res => commit('SET_MOVIES', res.data.results));
    },

    FETCH_MOVIES_MORE({commit, dispatch}){
      return dispatch('FETCH_MOVIES_INIT', commit('SET_LOADER_TOGGLE'), commit('SET_PAGE_ADD'))
      .then(res => commit('SET_MOVIES_MORE', res.data.results))
      .then(()  => commit('SET_LOADER_TOGGLE'));
    },

    FETCH_MOVIES_SORT({commit, dispatch}, sort){
      return dispatch('FETCH_MOVIES_INIT', commit('SET_MOVIE_SORT', sort))
      .then(res => commit('SET_MOVIES', res.data.results));
    },

    FETCH_SEARCH_API({state}, keyword){
      return Axios.get(`${state.urlSearch}?api_key=${state.apiKey}&language=${state.language}&page=${state.page}&include_adult=false&query=${keyword}`)
    },

    FETCH_SEARCH({state, commit, dispatch}, {keyword}){
      console.log(router.history.current.params.keyword, keyword);
      console.dir(router.history.current);
      router.push({
        path: `/search/movie/:${keyword}`,
        params: {
          keyword: keyword
        }
      })
      return dispatch('FETCH_SEARCH_API', keyword)
      .then(res => commit('SET_MOVIES', res.data.results))
      // .then(() => )
      .catch((err) => console.log(err.message))
    }

  },
});