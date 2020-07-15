<template>
  <nav class="nav">
    <router-link  class="logo__link" to="/" title="The Movie DB"><img class="logo__image" src="../assets/logo.svg"></router-link>
    <ul class="nav__list">
      <li class="nav__item" v-for="(category, index) in categories" v-bind:key="index">
        <router-link class="nav__link" :to="{name: 'Movie', params: {sort: category}}">{{ category | toUpperCase }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { toUpperCase } from '../filter/index.js';

export default {
  filters: {
    toUpperCase,
  },

  data: function(){
    return {
      // FIXME state로 이동
      categories : {
        popular   : 'popular',
        now       : 'now_playing',
        top       : 'top_rated',
        upcoming  : 'upcoming',
      },
    }
  },
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