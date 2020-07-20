<template>
  <section class="movies">
    <h2 class="movies__category">{{ category | toCapitalize(' Movies')}} <span class="movies__results">{{ results | toNumberFormat }} results</span></h2>
    <Loader v-show="loader"></Loader>
    <ul class="movies__list">
      <li class="movies__item" v-for="movie in movies" :key="movie.id">
        <a class="movies__link" @click="openModal(movie)">
          <figure class="movies__poster">
            <!-- <img class="movies__image" :src="getMovieImageUrl(movie)" :title="movie.title"> -->
            <img class="movies__image" src="../assets/no-image.png" :title="movie.title">
          </figure>
          <p class="movies__title">{{ movie.title }}</p>
        </a>
      </li>
    </ul>
    <button class="button__more" @click="FETCH_MORE">Load More</button>
  </section>
</template>

<script>
import Loader       from './Loader';
import { getMovieImageUrl } from '../mixin/index';
import { toCapitalize, toNumberFormat } from '../filter/index';
import { mapState, mapMutations, mapActions } from 'vuex';
import store from '../store/index';
import router from '../router/index';

export default {
  mixins: [getMovieImageUrl],
  
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

  methods: {
    ...mapMutations(['SET_RESET_STATE']),
    ...mapActions(['FETCH_MORE', 'FETCH_CATEGORY', 'FETCH_MOVIE', 'FETCH_MOVIES']),

    openModal(movie){
      this.FETCH_MOVIE({id : movie.id})
    },
  },

  beforeRouteEnter(to, from, next){
    store.dispatch('FETCH_CATEGORY', to.params.category);
    next();
  },

  beforeRouteUpdate(to, from, next){
    this.FETCH_CATEGORY(to.params.category);
    next();
  },

  beforeRouteLeave(to, from, next){
      this.SET_RESET_STATE();
      next();
  },

}
</script>

<style lang="scss" scoped>
  @import '../scss/mixin.scss';

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
      background: #fff;
      box-shadow: 0 0 10px rgba(8, 28, 36, 0);
      font-size: 0px;
      transition: all .5s ease;
    }
    &__image {
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