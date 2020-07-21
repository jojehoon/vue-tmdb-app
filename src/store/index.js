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
    loader     : false,
    keyword    : '',
    message    : '',
    modal      : false,
    movie      : {},
    movies     : [],
    page       : 1,
    results    : 0,
    suggetion  : [],
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
    GET_SUGGETION : (state) => state.suggetion,
  },

  mutations: {
    SET_CATEGORY      : (state, value) => state.category = value,
    SET_LOADER_TOGGLE : (state)        => state.loading = state.loading ? false : true,
    SET_KEYWORD       : (state, value) => state.keyword = value,
    SET_MESSAGE       : (state, value) => state.message = value,
    SET_MODAL         : (state)        => state.modal = state.modal ? false : true,
    SET_MOVIE         : (state, value) => state.movie = value,
    SET_MOVIES        : (state, value) => state.movies = value,
    SET_MORE          : (state, addedMovies) => state.movies = [...state.movies, ...addedMovies],
    SET_PAGE_ADD      : (state)        => state.page += 1,
    SET_RESULT        : (state, value) => state.results = value,
    SET_RESET_PAGE    : (state)        => state.page = 1,
    SET_RESET_STATE   : (state)        => {
                                            state.movies = [];
                                            state.page   = 1;
                                            switch (router.history.current.name) {
                                              case 'Movie':
                                                state.category = '';
                                                break;
                                              case 'Search':
                                                state.keyword = '';
                                                break;
                                            }
                                          },
    SET_SUGGETION     : (state, suggestedMovies) => state.suggetion = suggestedMovies,
  },
  
  actions: {
    FETCH_API_MOVIE({state}, id){
      return Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${state.apiKey}&language=en-US`)
    },

    FETCH_API_MOVIES({state}, category){
      return Axios.get(`${state.url.base}${state.category}?api_key=${state.apiKey}&language=en-US&sort_by=created_at.desc&page=${state.page}`);
    },

    FETCH_API_SEARCH({state}){
      return Axios.get(`${state.url.search}?api_key=${state.apiKey}&language=en-US&page=${state.page}&include_adult=false&query=${state.keyword}`)
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
    
    // NOTE sort_by=created_at.desc 쿼리 삽입으로 중복 영화 해결
    FETCH_MORE({commit, dispatch}){
      let api  = null;
      switch (router.history.current.name) {
        case 'Movie':
          api = 'FETCH_API_MOVIES';
          break;
        case 'Search':
          api = 'FETCH_API_SEARCH';
          break;
      }
      return dispatch(api, commit('SET_PAGE_ADD'))
      .then(res => commit('SET_MORE', res.data.results))
    },

    FETCH_CATEGORY({commit, dispatch}, category){
      commit('SET_RESET_PAGE');
      return dispatch('FETCH_API_MOVIES', commit('SET_CATEGORY', category))
      .then((res) => {
        commit('SET_MOVIES', res.data.results)
        commit('SET_RESULT', res.data.total_results) 
      });
    },

    FETCH_SEARCH({state, commit, dispatch}){
      router.push({
        path: `/search/:${state.keyword}`,
        params: state.keyword
      })
      return dispatch('FETCH_API_SEARCH', commit('SET_KEYWORD', state.keyword))
      .then(res => commit('SET_MOVIES', res.data.results))
      .catch((err) => console.log(err.message))
    },

    FETCH_SUGGETION_RESULT({commit}, results){
      if(results.length >= 1) commit('SET_SUGGETION', results)
      commit('SET_MESSAGE', 'No Results Found');
    },

    FETCH_SUGGETION({state, commit, dispatch}){
      if(state.keyword === ''){
        commit('SET_SUGGETION', []);
        commit('SET_MESSAGE', '');
      }
      else if(!state.keyword.replace(/\s/g, '').length){
        commit('SET_SUGGETION', [])
        commit('SET_MESSAGE', 'No Results Found');
      }
      else {
        dispatch('FETCH_API_SEARCH', commit('SET_KEYWORD', state.keyword))
        .then(res => dispatch('FETCH_SUGGETION_RESULT', res.data.results.slice(0, 5)))
        .catch(err => alert(err.message));
      }
    },
  },
});