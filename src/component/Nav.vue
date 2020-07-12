<template>
  <nav class="nav">
    <a class="logo__link" href="#none" title="The Movie DB"><img class="logo__image" src="../assets/logo.svg"></a>
    <ul class="nav__list">
      <li class="nav__item" v-for="(category, index) in categories" v-bind:key="index">
        <button class="nav__link" type="button" @click="fetchMoviesSort(category)">{{ category | toUpperCase }}</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { toUpperCase } from '../filter/index.js';
import { mapActions } from 'vuex';

export default {
  filters: {
    toUpperCase,
  },

  data: function(){
    return {
      // TODO state로 이동
      categories : {
        popular   : 'popular',
        now       : 'now_playing',
        top       : 'top_rated',
        upcoming  : 'upcoming',
      },
    }
  },

  methods: {
    ...mapActions([
      'FETCH_MOVIES_SORT'
    ]),

    fetchMoviesSort(category){
      return this.FETCH_MOVIES_SORT(category);
    },

  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 95px;
  height: 100%;
  background: #fff;

  &__item {
  border-bottom: 1px solid #f8f8f8;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95px;
    height: 95px;
    font-weight: 300;
    font-size: 9px;
    color: #869094;
    cursor: pointer;
  }
}

.logo {
  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95px;
    height: 75px;
    border-bottom: 1px solid #2d2d2d;
    background: #081c24;
  }
  &__image {
    width: 60%;
  }
}
</style>