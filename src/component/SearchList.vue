<template>
  <section class="search">
    <h3 class="search__category">{{ 'Search'  | toCapitalize(' Movies')}}</h3>
    <!-- <h3 class="search__keword">{{ keyword }} 검색결과</h3> -->
    <ul class="search__list">
      <li class="search__item" v-for="movie in movies" :key="movie.id">
        <a class="search__link" @click="openModal(movie)">
          <figure class="search__poster">
            <!-- <img class="search__image" :src="getMovieImageUrl(movie, 370, 556)" :title="movie.title"> -->
            <img class="search__image" src="../assets/no-image.png">
          </figure>
          <p class="search__title">{{ movie.title }}</p>
        </a>
      </li>
    </ul>
    <button class="button__more" @click="FETCH_MORE">Load More</button>
  </section>
</template>

<script>
import { getMovieImageUrl } from '../mixin/index';
import { toCapitalize } from '../filter/index';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  mixins: [getMovieImageUrl],

  filters: {
    toCapitalize,
  },

  computed: {
    ...mapState(['keyword', 'movies']),
  },

  methods: {
    ...mapMutations(['SET_CATEGORY', 'SET_RESET_STATE']),
    ...mapActions(['FETCH_MOVIE', 'FETCH_MORE']),
    openModal(movie){
      this.FETCH_MOVIE({id : movie.id});
    },
  },

  beforeRouteLeave(to, from, next){
    this.SET_RESET_STATE();
    next();
  }
}
</script>

<style lang="scss" scoped>
  @import '../scss/mixin.scss';

  .search {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__category {
      display: flex;
      align-self: stretch;
      justify-content: flex-start;
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
      & .search__poster {
        transform: scale(1.03);
        box-shadow: 0 0 10px rgba(8, 28, 36, 0.1);
      }
      & .search__title {
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