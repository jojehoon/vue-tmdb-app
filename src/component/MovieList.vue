<template>
  <section class="movies">
    <!-- <Loader v-show="loader"></Loader> -->
    <div class="filters">
      <button class="button__sort" type="button" data-sort="original_title.asc"  @click="sortMovies">제목 오름차순</button>
      <button class="button__sort" type="button" data-sort="original_title.desc" @click="sortMovies">제목 내림차순</button>
      <button class="button__sort" type="button" data-sort="release_date.asc"    @click="sortMovies">상영일 오름차순</button>
      <button class="button__sort" type="button" data-sort="release_date.desc"   @click="sortMovies">상영일 내림차순</button>
      <button class="button__sort" type="button" data-sort="popularity.asc"      @click="sortMovies">인기도 오름차순</button>
      <button class="button__sort" type="button" data-sort="popularity.desc"     @click="sortMovies">인기도 내림차순</button>
    </div>
    <h2 class="movies__category">{{ category | toCapitalize(' Movies')}} <span class="movies__results">{{ results | toNumberFormat }} results</span></h2>
    <ul class="movies__list">
      <li class="movies__item" v-for="movie in movies" :key="movie.id">
            <!-- <img class="movies__image" src="../assets/no-image.png" :title="movie.title"> -->
        <a class="movies__link" v-if="movie.poster_path" @click="openModal(movie)">
          <figure class="movies__poster">
            <img v-lazyload class="movies__image" :data-src="getMovieImageUrl(movie, 370, 556)" :title="movie.title">
          </figure>
          <p class="movies__title">{{ movie.title }}</p>
        </a>
        <!-- <div class="skeleton">
          <div class="skeleton__empty"></div>
        </div> -->
      </li>
    </ul>
    <button class="button__more" @click.stop="FETCH_MORE">Load More</button>
    <!-- <a class="movies__link" @click="openModal(movie)">Load More</a> -->

  </section>
</template>

<script>
import Loader       from './Loader';
import { getMovieImageUrl } from '../mixin/index';
import { toCapitalize, toNumberFormat } from '../filter/index';
import { mapState, mapMutations, mapActions } from 'vuex';
import store from '../store/index';
import router from '../router/index';
import { lazyLoad }                    from '../directive/index';

export default {
  mixins: [getMovieImageUrl],

  directives: {
    'lazyload': lazyLoad,
  },
  
  components: {
    Loader,
  },

  filters: {
    toCapitalize,
    toNumberFormat,
  },

  computed: {
    ...mapState(['category', 'loader', 'movies', 'results']),
  },

  mounted(){
    // document.querySelector
  },

  methods: {
    ...mapMutations(['SET_LOADER', 'SET_RESET_STATE']),
    ...mapActions(['FETCH_CATEGORY', 'FETCH_FILTER', 'FETCH_MORE', 'FETCH_MOVIE', 'FETCH_MOVIES']),

    openModal(movie){
      this.FETCH_MOVIE({id : movie.id})
    },

    sortMovies(e){
      const sortBy = e.target.dataset.sort;
      // console.log(e.target.dataset.sort);
      // console.log(sortBy);
      this.FETCH_FILTER(sortBy);
    },
  },



  updated(){
    // console.log('updated');
    // setTimeout(() => {
    //   store.commit('SET_LOADER', false);
    // }, 3000)
  },

  beforeRouteEnter(to, from, next){
    store.dispatch('FETCH_CATEGORY', to.params.category);
    // store.commit('SET_LOADER', true);

    next();
  },

  beforeRouteUpdate(to, from, next){
    this.FETCH_CATEGORY(to.params.category);
    // console.log('beforeRouteUpdate');

    next();
  },

  beforeRouteLeave(to, from, next){
    this.SET_RESET_STATE();
    // console.log('beforeRouteLeave');

    next();
  },

}
</script>

<style lang="scss" scoped>
  @import '../scss/mixin.scss';

  @keyframes placeHolderShimmer{
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }

  .movies {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__category {
      display: flex;
      align-items: baseline;
      align-self: stretch;
      justify-content: space-between;
      padding: 30px 10px 15px;
      font-size: 18px;
      font-weight: 300;
      color: #081c24;
      @media screen and (min-width: 768px){
        padding: 30px 15px 15px;
      }
      @media screen and (min-width: 1024px){
        padding: 30px 25px 5px;
      }
      @media screen and (min-width: 1200px){
        padding: 30px 30px 0px;
      }
    }
    &__results {
      font-size: 12px;
      font-weight: 300;
      color: #808a8e;
      letter-spacing: 0.5px;
    }
    &__list {
      display: flex;
      flex-flow: wrap;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
    }
    &__item {
      width: 50%;
      padding: 15px 10px;
      @media screen and (min-width: 768px){
        padding: 15px;
      }
      @media screen and (min-width: 1024px){
        width: 25%;
        padding: 25px;
      }
      @media screen and (min-width: 1200px){
        width: 20%;
        padding: 30px;
      }
    }
    &__link {
      cursor: pointer;
    }
    &__link:hover {
      & .movies__poster {
        transform: scale(1.03);
        box-shadow: 0 0 10px rgba(8, 28, 36, 0.1);
      }
      & .movies__title {
        color: #081c24;
      }
    }
    &__poster {
      position: relative;
      background: #ddd;
      box-shadow: 0 0 10px rgba(8, 28, 36, 0);
      font-size: 0px;
      transition: all .5s ease;
      &:before {
        content: '';
        display: block;
        padding-top: 150.4%;
      }
    }
    &__image {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 100%;
      height: auto;
      animation: loadImage 0.5s ease;
    }
    &__title {
      width: 100%;
      padding-top: 15px;
      font-weight: 300;
      font-size: 14px;
      color: #959da0;
      letter-spacing: 0.5px;
      text-align: center;
      transition: color .5s ease;
      @include ellipsis;
    }
  }

  @keyframes loadImage {
    from {
      opacity: 0;
      transform: scale(0.97) translateZ(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>