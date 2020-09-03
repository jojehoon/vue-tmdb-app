import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Axios from 'axios';
import router from '../router';
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
    results    : 0,
    scrollY    : false,
    sort       : [
                // {
                //   default : 'created_at.desc',
                // },
                  {
                    name: 'popularity.asc',
                    desc: '인기도 오름차순',
                  },
                  {
                    name: 'popularity.desc',
                    desc: '인기도 내림차순',
                  },
                  {
                    name: 'release_date.asc',
                    desc: '상영일 오름차순',
                  },
                  {
                    name: 'release_date.desc',
                    desc: '상영일 내림차순',
                  },
                  {
                    name: 'original_title.asc',
                    desc: '제목 오름차순',
                  },
                  {
                    name: 'original_title.desc',
                    desc: '제목 내림차순',
                  },
                  {
                    name: 'vote_average.asc',
                    desc: '평점 오름차순',
                  },
                  {
                    name: 'vote_average.desc',
                    desc: '평점 내림차순',
                  },
    ],
    scrollSettings : {
                      wheelSpeed: 1,
                      wheelPropagation: true,
                      minScrollbarLength: 200,
                      suppressScrollY: false,
    },
    filter : {
              adult                        : false,
              air_date_gte                 : '',
              air_date_lte                 : '2021-03-31',
              certification                : '',
              certification_country        : 'KR',
              debug                        : '',
              first_air_date_gte           : '',
              first_air_date_lte           : '',
              language                     : 'ko-KR',
              ott_region                   : 'KR',
              page                         : '1',
              primary_release_date_gte     : '',
              primary_release_date_lte     : '',
              region                       : 'KR',
              release_date_gte             : '2020-09-01',
              release_date_lte             : '2021-03-31',
              show_me                      : '0',
              sort_by                      : 'popularity.desc',
              vote_average_gte             : '1',
              vote_average_lte             : '',
              vote_count_gte               : '',
              with_genres                  : '',
              with_keywords                : '',
              with_networks                : '',
              with_origin_country          : '',
              with_original_language       : '',
              with_ott_monetization_types  : '',
              with_ott_providers           : '',
              with_release_type            : '2|3',
              with_runtime_gte             : '0',
              with_runtime_lte             : '400'
    },
    suggetion: [],
    url: {
          base     : 'https://api.themoviedb.org/3/movie/',
          discover : 'https://api.themoviedb.org/3/discover/movie',
          search   : 'https://api.themoviedb.org/3/search/movie',
          poster   : 'https://image.tmdb.org/t/p/original',
          },
  },

  getters: {
    GET_LOADER   : (state) => state.loader,
    GET_KEYWORD  : (state) => state.keyword,
    GET_MOVIES   : (state) => state.movies,
    GET_MOVIE    : (state) => state.movie,
    GET_MODAL    : (state) => state.modal,
    GET_SUGGETION: (state) => state.suggetion,
    GET_SCROLLY  : (state) => state.scrollY,
  },

  mutations: {
    SET_CATEGORY   : (state, value) => state.category = value,
    SET_LOADER     : (state, value) => state.loader = state.loader ? false : true,
    SET_KEYWORD    : (state, value) => state.keyword = value,
    SET_MESSAGE    : (state, value) => state.message = value,
    SET_MODAL      : (state)        => state.modal = state.modal ? false : true,
    SET_MOVIE      : (state, value) => state.movie = value,
    SET_MOVIES     : (state, value) => state.movies = value,
    SET_MORE       : (state, addedMovies) => state.movies = [...state.movies, ...addedMovies],
    SET_PAGE_ADD   : (state)        => state.filter.page += 1,
    SET_RESULT     : (state, value) => state.results = value,
    SET_RESET_PAGE : (state)        => state.filter.page = 1,
    SET_RESET_STATE: (state)        => {
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
    SET_SCROLLSETTINGS: (state, value)  => Object.assign(state.scrollSettings, value),
    SET_SUGGETION     : (state, suggestedMovies) => state.suggetion = suggestedMovies,
  },
  
  actions: {
    FETCH_API_MOVIE({state}, id){
      return Axios.get(`${state.url.base}${id}?api_key=${state.apiKey}&language=${state.filter.language}`)
    },

    FETCH_API_MOVIES({state}, category){
      return Axios.get(`${state.url.base}${state.category}?api_key=${state.apiKey}&language=${state.filter.language}&region=${state.filter.region}&sort_by=${state.sort ? state.sort : 'created_at.desc'}&page=${state.filter.page}&include_adult=${state.filter.adult}`);
    },

    FETCH_API_SEARCH({state}){
      return Axios.get(`${state.url.search}?api_key=${state.apiKey}&language=${state.filter.language}&region=${state.filter.region}&include_adult=${state.filter.adult}&query=${state.keyword}`);
    },

    FETCH_API_DISCOVER({state}, sort){
      return Axios.get(`${state.url.discover}?api_key=${state.apiKey}&language=${state.filter.language}&region=${state.filter.region}&include_adult=${state.filter.adult}&sort_by=${sort}&page=${state.filter.page}&release_date.lte=${state.filter.release_date_lte}&vote_average.gte=${state.filter.vote_average_gte}&with_release_type=${state.filter.vote_average_gte}`);
    },

    FETCH_MOVIE({commit, dispatch}, {id}){
      return dispatch('FETCH_API_MOVIE', id)
      .then(res => commit('SET_MOVIE', res.data))
      .then(()  => commit('SET_MODAL'))
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
      commit('SET_LOADER');
      return dispatch(api, commit('SET_PAGE_ADD'))
      .then(res => commit('SET_MORE', res.data.results))
      .then(commit('SET_LOADER'))
    },

    FETCH_CATEGORY({commit, dispatch}, category){
      commit('SET_RESET_PAGE');
      return dispatch('FETCH_API_MOVIES', commit('SET_CATEGORY', category))
      .then((res) => {
        commit('SET_MOVIES', res.data.results)
        commit('SET_RESULT', res.data.total_results) 
      })
    },

    FETCH_SEARCH({state, commit, dispatch}){
      router.push({
        path: `/search/:${state.keyword}`,
        params: state.keyword
      })
      return dispatch('FETCH_API_SEARCH', commit('SET_KEYWORD', state.keyword))
      .then(res => commit('SET_MOVIES', res.data.results))
      .then(() => commit('SET_SUGGETION', []))
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

    FETCH_FILTER({state, commit, dispatch}, sort){
      dispatch('FETCH_API_DISCOVER', sort)
      .then(res => commit('SET_MOVIES', res.data.results))
    }
  },
});