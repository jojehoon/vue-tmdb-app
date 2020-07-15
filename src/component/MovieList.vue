<template>
  <section class="movies">
    <h2 class="movies__category">{{ categoryTitle | toCapitalize(' Movies')}}</h2>
    <Loader v-show="loader"></Loader>
    <ul class="movies__list">
      <li class="movies__item"
        v-for="movie in movies" 
        :key="movie.id"
      >
        <a class="movies__link" @click="openModal(movie)">
          <figure class="movies__poster">
            <!-- <img class="movies__image" :src="movieImageUrl(movie)" :title="movie.title"> -->
            <img class="movies__image" src="../assets/no-image.png" :title="movie.title">
          </figure>
          <p class="movies__title">{{ movie.title }}</p>
        </a>
      </li>
    </ul>
    <button class="button" @click="FETCH_MOVIES_MORE">Load More</button>

    <transition name="fade">
      <MovieModal v-show="GET_MODAL"></MovieModal>
    </transition>
  </section>
</template>

<script>
import MovieModal   from './MovieModal';
import Loader       from './Loader';
import { toCapitalize } from '../filter/index';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MovieModal,
    Loader,
  },

  props: {
    categoryTitle: {
      type: String,
      default: this.sort,
    },
  },

  filters: {
    toCapitalize,
  },

  computed: {
    ...mapState([
      'loader', 
      'movies', 
      'sort',
    ]),

    ...mapGetters([
      'GET_MODAL'
    ]),
  },

  methods: {
    ...mapActions([
      'FETCH_MOVIES_MORE',
      'FETCH_MOVIES_SORT',
      'FETCH_MOVIE',
    ]),

    openModal(movie){
      this.FETCH_MOVIE({id : movie.id})
    },

    movieImageUrl(movie){
      if(movie.poster_path){
        return `https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}`;
      } else {
        return '../../src/assets/no-image.png';
      }
    },
  },

  // TODO 재검색시 아래 때문에 에러발생
  beforeRouteUpdate(to, from, next){
    this.FETCH_MOVIES_SORT(to.params.sort);
    next();
  },

  created: function(){
    // console.log(this.$route.params.sort);
    // this.FETCH_MOVIES_SORT(this.$route.params.sort);
  },

}
</script>

<style lang="scss" scoped>
  @import '../scss/mixin.scss';

  .movies {
    &__category {
      padding: 30px 30px 0;
      font-size: 18px;
      font-weight: 300;
      color: #081c24;
    }
    &__list {
      display: flex;
      flex-flow: wrap;
      flex-direction: row;
      justify-content: space-around;
    }
    &__item {
      width: 20%;
      padding: 30px;
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
      width: 100%;
      animation: loadImage 1s ease;
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