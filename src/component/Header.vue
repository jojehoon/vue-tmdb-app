<template>
  <header class="header">
    <input class="header__search" type="text" placeholder="search for a movie..." v-model="keyword" @keyup.enter="FETCH_SEARCH" @keyup="fetchSuggetion" @focus="isActive = true" @blur="isActive = false" @keyup.down="focusSuggetion">
    <ul class="suggetion__list" :class="{'is-active' : isActive}">
      <!-- FIXME no-results-found가 항상 먼저 보임 -->
      <li class="suggetion__item is-no-suggetion"      v-if="GET_SUGGETION.length == 0 && keyword.length == 0"></li>
      <li class="suggetion__item is-no-suggetion" v-else-if="GET_SUGGETION.length == 0 && keyword.length >= 1">no results found</li>
      <li class="suggetion__item" v-for="movie in GET_SUGGETION" :key="movie.id">{{ movie.title }}</li>
    </ul>
  </header>
</template>

<script>
import { mapGetters ,mapMutations, mapActions } from 'vuex';
export default {
  data(){
    return {
      isActive: false,
      isFocus : false,
    }
  },

  methods: {
    ...mapMutations(['SET_KEYWORD']),
    ...mapActions(['FETCH_SUGGETION', 'FETCH_SEARCH']),
    fetchSuggetion(){
      this.FETCH_SUGGETION();
    },
  },

  computed: {
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
  .header {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    padding: 0 70px;
    @media screen and (min-width: 768px){
      position: static;
      height: 75px;
      padding: 0 45px;
    }
    @media screen and (min-width: 1024px){
      padding: 0 55px;
    }
    @media screen and (min-width: 1200px){
      padding: 0 60px;
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
      padding: 20px;
      border: 1px solid #f8f8f8;
      background: #fff;
      box-shadow: 0px 5px 5px -5px rgba(0,0,0,0.2);
      opacity: 0;
      transition: all 0.25s ease;
    }

    &__list.is-active {
      visibility: visible;
      opacity: 1;
    }
  }
</style>