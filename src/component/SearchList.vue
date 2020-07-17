<template>
  <section class="search">
    <h3 class="search__category">{{ 'Search'  | toCapitalize(' Movies')}}</h3>
    <!-- <h3 class="search__keword">{{ keyword }} 검색결과</h3> -->
    <ul class="search__list">
      <li class="search__item" v-for="movie in search" :key="movie.id">
        <a class="search__link" @click="openModal(movie)">
          <figure class="search__poster">
            <img class="search__image"  src="../assets/no-image.png">
          </figure>
          <p class="search__title">{{ movie.title }}</p>
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
import { toCapitalize } from '../filter/index';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    MovieModal,
  },

  filters: {
    toCapitalize,
  },

  computed: {
    ...mapState(['keyword', 'search']),
    ...mapGetters(['GET_MODAL']),
  },

  methods: {
    ...mapMutations(['SET_KEYWORD']),
    ...mapActions(['FETCH_SEARCH', 'FETCH_MOVIE', 'FETCH_MOVIES_MORE']),
    openModal(movie){
      this.FETCH_MOVIE({id : movie.id});
    },
    resetKeyword(){
      this.SET_KEYWORD('');
    },
  },

  beforeRouteLeave(to, from, next){
    this.resetKeyword();
    next();
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/mixin.scss';

  .search {
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