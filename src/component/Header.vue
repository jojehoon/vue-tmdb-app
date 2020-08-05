<template>
  <header class="header">
    <input class="header__search" type="text" placeholder="search for a movie..." 
      v-model="keyword" 
      @focus="isFocus = true" 
      @blur="isFocus = false" 
      @keyup="FETCH_SUGGETION" 
      @keyup.down="$event.target.nextElementSibling.focus()"
      @keyup.enter="fetchSearch" 
    >
    <ul class="suggetion__list" :class="{'is-active' : isFocus}"  tabindex="0" @focus="isFocus = true" @keyup.capture.down="setFocus($event.target.firstElementChild)">
      <!-- NOTE no-results-found가 항상 먼저 보임 => 비동기로 해결 -->
      <li class="suggetion__item"      v-if="GET_SUGGETION.length == 0 && keyword.length == 0">{{ message }}</li>
      <li class="suggetion__item" v-else-if="GET_SUGGETION.length == 0 && keyword.length >= 1">{{ message }}</li>
      <li class="suggetion__item" 
        tabindex="0" 
        v-for="movie in GET_SUGGETION" 
        :key="movie.id" 
        @keyup.up="setFocus($event.target.previousElementSibling)"
        @keyup.down="setFocus($event.target.nextElementSibling)"
      >
        <a class="suggetion__link" @click="openModal(movie)">
          <figure class="suggetion__info">
            <!-- <img class="suggetion__image" src="../assets/no-image.png" width="50" height="75"> -->
            <img class="suggetion__image" :src="getMovieImageUrl(movie, 220, 330)" width="50" height="75">
            <figcaption class="suggetion__text">
              <strong class="suggetion__title">{{ movie.title }}</strong>
              <span class="suggetion__date">{{ movie.release_date }}</span> 
            </figcaption>
          </figure>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
import { getMovieImageUrl } from '../mixin/index';
import { mapState, mapGetters ,mapMutations, mapActions } from 'vuex';

export default {
  mixins: [getMovieImageUrl],

  data(){
    return {
      isFocus: false,
    }
  },

  methods: {
    ...mapMutations(['SET_KEYWORD', 'SET_SUGGETION']),
    ...mapActions(['FETCH_SUGGETION', 'FETCH_SEARCH', 'FETCH_MOVIE']),
    fetchSearch(){
      this.FETCH_SEARCH();
      this.isFocus = false;
      this.keyword = '';
    },
    setFocus(targetElement){
      if(targetElement) targetElement.focus();
      else {
        return false;
      }
    },
    openModal(movie){
      this.FETCH_MOVIE({id : movie.id})
    },

  },

  computed: {
    ...mapState(['message']),
    ...mapGetters(['GET_SUGGETION']),
    keyword: {
      get(){
        return this.$store.state.keyword;
      },
      set(value){
        this.$store.commit('SET_KEYWORD', value);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../scss/mixin.scss';

  .header {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
    padding: 0 70px;
    background: #fff;
    @media screen and (min-width: 768px){
      position: static;
      height: 75px;
      padding: 0 45px;
    }
    @media screen and (min-width: 1024px){
      padding: 0 55px;
    }
    @media screen and (min-width: 1200px){
      padding: 0 40px;
    }
    &__search {
      display: flex;
      width: 100%;
      height: 100%;
      border: none;
      font-weight: 400;
      font-size: 16px;
      color: #081c24;
      outline: none;
      &::placeholder {
        font-weight: 400;
      }
    }
  }
  
  .suggetion {
    &__list {
      visibility: hidden;
      position: absolute;
      top: 50px;
      right: 55px;
      left: 55px;
      z-index: 100;
      // padding: 20px;
      border: 1px solid #f8f8f8;
      background: #fff;
      box-shadow: 0px 5px 5px -5px rgba(0,0,0,0.2);
      opacity: 0;
      transition: all 0.25s ease;
      @media screen and (min-width: 768px){
        top: 75px;
        right: 0;
        left: 95px;
        // padding: 20px 40px;
      }
    }

    &__list.is-active {
      visibility: visible;
      opacity: 1;
    }
    &__item {
      border-bottom: 1px solid #f8f8f8;
      &:last-of-type {
        border-bottom-width: 0;
      }
    }
    &__link {
      display: block;
      padding: 20px;
      text-decoration: none;
    }
    &__info {
      display: flex;
      align-items: center;
      width: 100%;
    }
    &__image {}
    &__text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      width: 100%;
      padding: 0 20px;
    }
    &__title {
      font-weight: 500;
      font-size: 16px;
      color: #333;
    }
    &__date {
      font-size: 12px;
    }
    &__overview {
      font-size: 12px;
      @include ellipsis;
    }
}
</style>